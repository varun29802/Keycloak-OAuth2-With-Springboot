import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: "http://keycloak:8080/",
  realm: "Micro-Service",
  clientId: "springboot-app",
  pkceMethod: "S256",
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
};

const keycloak = new Keycloak(keycloakConfig);

// Disable automatic token refresh - we handle it manually
keycloak.onTokenExpired = () => {
  console.log('Token expired - handled by auth context');
};

// Enable token refresh before expiration
keycloak.onAuthRefreshSuccess = () => {
  console.log('Token refreshed successfully');
};

keycloak.onAuthRefreshError = () => {
  console.log('Token refresh failed');
};

export default keycloak;