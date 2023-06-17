import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const jwtDecode = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    throw new Error("JWT seems malformed");
  }
};

const withAuthorization = (Component) => (props) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [hasura, setHasura] = useState([]);

  useEffect(() => {
    try {
      // Fetch the token:
      const _token = localStorage.getItem("hasura-token");
      if (!_token) return;
      setToken(_token);

      // Read the token:
      const _payload = jwtDecode(_token);
      setHasura(_payload["https://hasura.io/jwt/claims"]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (_token) => {
    try {
      const _payload = jwtDecode(_token);
      setHasura(_payload["https://hasura.io/jwt/claims"]);
      setToken(_token);
      localStorage.setItem("hasura-token", _token);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <AuthContext.Provider value={{ loading, token, hasura, error, login }}>
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
