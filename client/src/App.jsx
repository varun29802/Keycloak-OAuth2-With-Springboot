import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "./config/authcontext";
import { useState, useEffect } from "react";
import { loadProducts } from "./service/apiService";

function App() {
  const { isAuthenticated, keycloak } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!isAuthenticated) return;

      setLoading(true);
      setError("");

      try {
        const response = await loadProducts();
        setProducts(response);
      } catch (err) {
        setError("Failed to fetch products");
        toast.error("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isAuthenticated]);

  const handleLogout = () => {
    keycloak.logout();
    toast.success("Logged out successfully");
  };

  const handleLogin = () => {
    keycloak.login();
  };

  return (
    <>
      <Toaster />
      {isAuthenticated ? (
        <div className="container">
          <h1>Welcome to OAuth2 Client</h1>
          <p>You are logged in!</p>
          <h2>Username: {keycloak.tokenParsed?.preferred_username}</h2>
          <button onClick={handleLogout}>Logout</button>

          <h3>Product List</h3>
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : products.length > 0 ? (
            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td>{product.productDescription}</td>
                    <td>{product.productPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No products available</p>
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Login required !!</h1>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </>
  );
}

export default App;
