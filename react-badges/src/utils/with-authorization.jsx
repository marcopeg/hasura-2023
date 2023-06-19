import { createContext, useContext, useEffect, useState } from "react";
import { useEmitter } from "./with-emitter";

const AuthContext = createContext();

const jwtDecode = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    throw new Error("JWT seems malformed");
  }
};

const withAuthorization = (Component) => (props) => {
  const emitter = useEmitter();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [hasura, setHasura] = useState([]);
  const [role, setRole] = useState(null);
  const [roles, setRoles] = useState(null);

  const applyToken = (_token) => {
    // Read the token:
    const _payload = jwtDecode(_token);
    const _hasura = _payload["https://hasura.io/jwt/claims"];
    const _roles = _hasura["x-hasura-allowed-roles"];
    setHasura(_hasura);
    setRoles(_roles);

    // Apply the role from localStorage with a default on the JWT contents:
    const _role = localStorage.getItem("hasura-role");
    setRole(_roles.includes(_role) ? _role : _hasura["x-hasura-default-role"]);

    setToken(_token);
  };

  useEffect(() => {
    try {
      // Fetch the token:
      const _token = localStorage.getItem("hasura-token");
      if (!_token) return;

      // Implement the token:
      applyToken(_token);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (_token) => {
    try {
      applyToken(_token);
      localStorage.setItem("hasura-token", _token);
    } catch (err) {
      setError(err);
    }
  };

  const logout = () => {
    setToken(null);
    setHasura(null);
    setError(null);
    setRole(null);
    setRoles(null);
    localStorage.removeItem("hasura-token");
    localStorage.removeItem("hasura-role");
  };

  const switchRole = (to) => {
    if (!roles.includes(to)) {
      throw new Error("role not allowed!");
    }

    emitter.pub("loadable::show");
    setRole(to);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        token,
        hasura,
        error,
        role,
        roles,
        login,
        logout,
        switchRole
      }}
    >
      <Component {...props} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const data = useContext(AuthContext);

  return {
    ...data,
    isLoading: data.loading,
    hasError: data.error !== null,
    needLogin: data.token === null
  };
};

export default withAuthorization;
