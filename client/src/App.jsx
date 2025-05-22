import { CssBaseline, LinearProgress } from "@mui/material";
import { useAuth } from "./config/authcontext";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ width: "100%" }}>
        <LinearProgress />
      </div>
    );
  }

  return (
    <>
      <CssBaseline />
      {isAuthenticated && <Header />}
      <main>{isAuthenticated ? <Dashboard /> : <Landing />}</main>
    </>
  );
}

export default App;
