import { Container, Typography, Box } from "@mui/material";
import ServiceCommunication from "../components/ServiceCommunication";
import { useAuth } from "../config/authcontext";

const Dashboard = () => {
  const { userProfile } = useAuth();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Service Communication Dashboard
          </Typography>
          {userProfile && (
            <Typography variant="subtitle1" color="text.secondary">
              Logged in as: {userProfile.username || userProfile.email}
            </Typography>
          )}
        </Box>
        <ServiceCommunication />
      </Container>
    </Box>
  );
};

export default Dashboard;
