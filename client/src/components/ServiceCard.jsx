import {
  Card,
  CardContent,
  Button,
  Typography,
  LinearProgress,
} from "@mui/material";

const ServiceCard = ({
  title,
  description,
  buttonText,
  onButtonClick,
  loading,
}) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Button
        size="small"
        onClick={onButtonClick}
        disabled={loading}
        sx={{ m: 2 }}
        variant="contained"
      >
        {loading ? "Loading..." : buttonText}
      </Button>
      {loading && <LinearProgress />}
    </Card>
  );
};

export default ServiceCard;
