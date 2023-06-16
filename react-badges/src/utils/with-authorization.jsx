import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const withAuthorization = (Component) => (props) => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    try {
      const _token = localStorage.getItem("hasura-token");
      if (!_token) return;

      // Reading the token
      const _tokens = _token.split(".");
      if (_tokens.length != 3) {
        throw new Error("Not a jwt");
      }
      const _roles = JSON.parse(atob(_tokens[1]))[
        "https://hasura.io/jwt/claims"
      ]["x-hasura-allowed-roles"];

      setToken(_token);
      setRoles(_roles);
    } catch (err) {
      setError(err);
    }
  }, []);

  // While loading the token:
  if (!token && !error) return "...";

  return (
    <AuthContext.Provider value={{ token, roles, error }}>
      <Component {...props} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const data = useContext(AuthContext);

  return {
    ...data,
    hasError: data.error !== null,
    needLogin: data.token === null
  };
};

export default withAuthorization;
