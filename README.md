# 🔐 Spring Boot OAuth2 Integration with Keycloak & React Frontend

This project demonstrates a full-stack application using **Spring Boot** and **React**, secured with **Keycloak (OAuth2)**. The setup utilizes Docker to containerize Keycloak and PostgreSQL, with the backend acting as an OAuth2 resource server and the frontend integrating with Keycloak for login/logout.

---

## 🚀 Stack Overview

- **Spring Boot** (OAuth2 Resource Server)
- **Keycloak** (Authorization Server)
- **PostgreSQL** (Database for Keycloak)
- **React** (Frontend with Keycloak JS adapter)
- **Docker Compose** (Container orchestration)

---

## 🧩 Application Structure

### Backend (Spring Boot)

- **SecurityConfig.java**: Configures Spring Security to act as an OAuth2 resource server, validating JWT tokens issued by Keycloak.
- **application.properties**: Contains configurations for the resource server, including issuer URI and JWK set URI for JWT validation.

### Frontend (React)

- **keycloak.js**: Initializes the Keycloak instance with the realm and client configurations.
- **authcontext.js**: Provides authentication context to the application, managing login state and token handling.
- **apiService.js**: Contains functions to interact with the backend API, attaching the JWT token to requests for authentication.
- **App.js**: Main application component that renders UI based on authentication state and fetches data from the backend.

### Docker Setup

- **docker-compose.yml**: Defines services for PostgreSQL and Keycloak, setting up the necessary environment variables and volumes for persistent storage.

---

## 🖼️ Architectural Diagram

```mermaid
    A[User] -->|Login| B[React App]
    B -->|Redirect to| C[Keycloak]
    C -->|Return Token| B
    B -->|Attach Token| D[Spring Boot Backend]
    D -->|Validate Token| C
    D -->|Fetch Data| E[PostgreSQL]
    E -->|Return Data| D
    D -->|Return Data| B
    B -->|Display Data| A
```

---

## 🔁 Authentication Flow

1. **User Login**: The user accesses the React application and is redirected to Keycloak for authentication.
2. **Token Retrieval**: Upon successful login, Keycloak redirects back to the React app with an access token.
3. **Token Storage**: The React app stores the access token and includes it in the Authorization header for subsequent API requests.
4. **Backend Validation**: The Spring Boot backend validates the JWT token with Keycloak's public keys.
5. **Data Fetching**: Upon successful validation, the backend fetches data from PostgreSQL and returns it to the React app.
6. **Data Display**: The React app displays the fetched data to the user.

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/varun29802/Keycloak-OAuth2-With-Springboot.git
cd Keycloak-OAuth2-With-Springboot
```

### 2. Start Docker Containers

```bash
docker-compose up -d
```

This command will start PostgreSQL and Keycloak containers in detached mode.

### 3. Configure Keycloak

- Access Keycloak at [http://localhost:8080](http://localhost:8080).
- Create a new realm named `Micro-Service`.
- Create a new client named `springboot-app` with the appropriate settings (e.g., public client, valid redirect URIs).
- Define roles and users as needed.

### 4. Configure Spring Boot Backend

- Update the `application.properties` file with the correct issuer URI and JWK set URI from your Keycloak setup.

### 5. Configure React Frontend

- Update the `keycloak.js` file with the correct Keycloak server URL, realm, and client ID.

### 6. Run the Applications

- Start the Spring Boot backend:

  ```bash
  ./mvnw spring-boot:run
  ```

- Start the React frontend:

  ```bash
  npm start
  ```

Access the frontend at [http://localhost:5173](http://localhost:5173).

---

## 📚 Additional Resources

- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Spring Security OAuth2 Resource Server](https://docs.spring.io/spring-security/site/docs/current/reference/html5/#oauth2resourceserver)
- [React Keycloak JS Adapter](https://www.npmjs.com/package/keycloak-js)

---
