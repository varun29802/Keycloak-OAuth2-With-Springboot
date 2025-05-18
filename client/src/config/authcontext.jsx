import toast from "react-hot-toast";
import keycloak from "./keycloak";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [keyCloakObject, setkeyCloakObject] = useState(null);

  useEffect(() => {
    keycloak
      .init({
        // onLoad: "login-required",
        onLoad: "check-sso",
      })
      .then((authenticated) => {
        console.log(authenticated);
        setIsAuthenticated(authenticated);
        setkeyCloakObject(keycloak);
        console.log(keycloak?.token);
        if (authenticated) {
          toast.success("Loggin Success");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login Failed");
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        keycloak: keycloak,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
