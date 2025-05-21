import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import keycloak from "./keycloak";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [keycloakInstance, setKeycloakInstance] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const clearAuthCookies = () => {
    Cookies.remove("KEYCLOAK_ACCESS");
    Cookies.remove("KEYCLOAK_REFRESH");
    Cookies.remove("KEYCLOAK_ID");
    setIsAuthenticated(false);
    setKeycloakInstance(null);
    setUserProfile(null);
    setToken(null);
  };

  const completeAuthentication = (keycloak) => {
    setIsAuthenticated(true);
    setKeycloakInstance(keycloak);
    setToken(keycloak.token);

    // Store tokens in cookies
    Cookies.set("KEYCLOAK_ACCESS", keycloak.token);
    Cookies.set("KEYCLOAK_REFRESH", keycloak.refreshToken);
    Cookies.set("KEYCLOAK_ID", keycloak.idToken);

    // Load user profile
    keycloak
      .loadUserProfile()
      .then((profile) => setUserProfile(profile))
      .catch((err) => console.error("Failed to load user profile:", err));

    // Set up token expiration check
    const expiresIn = keycloak.tokenParsed.exp * 1000 - Date.now();
    setTimeout(() => {
      handleLogout();
      toast.error("Your session has expired. Please login again.");
    }, expiresIn);
  };

  const handleLogin = () => {
    if (keycloakInstance) {
      keycloakInstance.login();
    } else {
      keycloak.login();
    }
  };

  const handleLogout = () => {
    clearAuthCookies();
    if (keycloakInstance) {
      keycloakInstance.logout();
    } else {
      keycloak.logout();
    }
  };

  useEffect(() => {
    if (initialized) return;

    const initAuth = async () => {
      try {
        const existingToken = Cookies.get("KEYCLOAK_ACCESS");

        if (existingToken) {
          try {
            const tokenPayload = JSON.parse(atob(existingToken.split(".")[1]));
            const isExpired = tokenPayload.exp * 1000 < Date.now();

            if (isExpired) {
              clearAuthCookies();
              setInitialized(true);
              return;
            }

            // Initialize Keycloak with existing token
            const auth = await keycloak.init({
              onLoad: "check-sso",
              token: existingToken,
              refreshToken: Cookies.get("KEYCLOAK_REFRESH"),
              idToken: Cookies.get("KEYCLOAK_ID"),
            });

            if (auth) {
              completeAuthentication(keycloak);
            } else {
              clearAuthCookies();
            }
          } catch (tokenError) {
            clearAuthCookies();
          }
        } else {
          // Initialize Keycloak normally
          const auth = await keycloak.init({
            onLoad: "check-sso",
          });

          if (auth) {
            completeAuthentication(keycloak);
          }
        }
        setInitialized(true);
      } catch (error) {
        console.error("Authentication initialization failed:", error);
        clearAuthCookies();
        setInitialized(true);
      }
    };

    initAuth();

    return () => {
      // Cleanup if needed
    };
  }, [initialized]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        keycloak: keycloakInstance,
        userProfile,
        token,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
