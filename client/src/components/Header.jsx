import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../config/authcontext";
import { Toaster } from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, userProfile, logout } = useAuth();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Microservices Dashboard
          </Typography>
          {isAuthenticated && userProfile && (
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="subtitle1">
                Welcome, {userProfile.username || userProfile.email}
              </Typography>
              <Button
                color="inherit"
                variant="outlined"
                onClick={logout}
                sx={{ color: "white", borderColor: "white" }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toaster position="top-right" />
    </>
  );
};

export default Header;
