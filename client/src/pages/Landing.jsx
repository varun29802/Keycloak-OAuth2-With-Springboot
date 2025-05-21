import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  CssBaseline,
} from "@mui/material";
import { useAuth } from "../config/authcontext";

const Landing = () => {
  const { login } = useAuth();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Box
        component="main"
        sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
      >
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 6, textAlign: "center" }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Microservices Communication Demo
            </Typography>
            <Typography
              variant="h5"
              component="p"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Explore how Service A and Service B communicate with each other in
              a secure microservices architecture.
            </Typography>
            <Button
              onClick={login}
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 1.5,
                fontSize: "1.1rem",
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "transform 0.3s",
                },
              }}
            >
              Login to Get Started
            </Button>
          </Paper>
        </Container>
      </Box>
      <Box component="footer" sx={{ py: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Microservices Demo Application
        </Typography>
      </Box>
    </Box>
  );
};

export default Landing;
