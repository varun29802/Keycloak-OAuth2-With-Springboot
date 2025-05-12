import Keycloak from 'keycloak-js';
const keycloak = new Keycloak({
    url:"http://localhost:8080/",
    realm:"Micro-Service",
    clientId:"springboot-app",
    pkceMethod:"S256",
});

export default keycloak;