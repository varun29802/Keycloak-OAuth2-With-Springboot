import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: "http://keycloak:8080/",
  realm: "Micro-Service",
  clientId: "springboot-app",
  pkceMethod: "S256",
});

// Disable automatic token refresh
keycloak.onTokenExpired = () => {
  console.log('Token expired - handled by auth context');
};

export default keycloak;