import { useState } from "react";
import { useAuth } from "../config/authcontext";
import {
  getServiceAWelcome,
  getServiceBWelcome,
  getServiceADataFromB,
  getServiceBDataFromA,
} from "../service/apiService";
import ServiceCard from "./ServiceCard";
import { Grid, Alert, Paper, Typography, Box, Button } from "@mui/material";

const ServiceCommunication = () => {
  const { logout } = useAuth();
  const [results, setResults] = useState({
    aWelcome: null,
    bWelcome: null,
    aFromB: null,
    bFromA: null,
  });
  const [loading, setLoading] = useState({
    aWelcome: false,
    bWelcome: false,
    aFromB: false,
    bFromA: false,
  });
  const [error, setError] = useState(null);

  const handleApiCall = async (apiCall, resultKey) => {
    setLoading((prev) => ({ ...prev, [resultKey]: true }));
    setError(null);
    try {
      const data = await apiCall();
      setResults((prev) => ({ ...prev, [resultKey]: data }));
    } catch (err) {
      setError(err.message);
      if (err.message.includes("Session expired")) {
        logout();
      }
    } finally {
      setLoading((prev) => ({ ...prev, [resultKey]: false }));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ServiceCard
            title="Service A Welcome"
            description="Get welcome message from Service A"
            buttonText="Call Service A"
            loading={loading.aWelcome}
            onButtonClick={() => handleApiCall(getServiceAWelcome, "aWelcome")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ServiceCard
            title="Service B Welcome"
            description="Get welcome message from Service B"
            buttonText="Call Service B"
            loading={loading.bWelcome}
            onButtonClick={() => handleApiCall(getServiceBWelcome, "bWelcome")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ServiceCard
            title="Service A → Service B"
            description="Get data from Service B through Service A"
            buttonText="Call A→B"
            loading={loading.aFromB}
            onButtonClick={() => handleApiCall(getServiceADataFromB, "aFromB")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ServiceCard
            title="Service B → Service A"
            description="Get data from Service A through Service B"
            buttonText="Call B→A"
            loading={loading.bFromA}
            onButtonClick={() => handleApiCall(getServiceBDataFromA, "bFromA")}
          />
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
          {error.includes("Session expired") && (
            <Button
              onClick={() => window.location.reload()}
              color="inherit"
              size="small"
              sx={{ ml: 1 }}
            >
              Login Again
            </Button>
          )}
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          API Responses
        </Typography>
        <Box sx={{ "& > *": { mb: 2 } }}>
          {results.aWelcome && (
            <Box>
              <Typography variant="subtitle1">Service A Welcome:</Typography>
              <Paper variant="outlined" sx={{ p: 2, overflowX: "auto" }}>
                <pre style={{ margin: 0 }}>
                  {JSON.stringify(results.aWelcome, null, 2)}
                </pre>
              </Paper>
            </Box>
          )}
          {results.bWelcome && (
            <Box>
              <Typography variant="subtitle1">Service B Welcome:</Typography>
              <Paper variant="outlined" sx={{ p: 2, overflowX: "auto" }}>
                <pre style={{ margin: 0 }}>
                  {JSON.stringify(results.bWelcome, null, 2)}
                </pre>
              </Paper>
            </Box>
          )}
          {results.aFromB && (
            <Box>
              <Typography variant="subtitle1">
                Service A → Service B:
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, overflowX: "auto" }}>
                <pre style={{ margin: 0 }}>
                  {JSON.stringify(results.aFromB, null, 2)}
                </pre>
              </Paper>
            </Box>
          )}
          {results.bFromA && (
            <Box>
              <Typography variant="subtitle1">
                Service B → Service A:
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, overflowX: "auto" }}>
                <pre style={{ margin: 0 }}>
                  {JSON.stringify(results.bFromA, null, 2)}
                </pre>
              </Paper>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ServiceCommunication;
