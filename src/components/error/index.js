import "./index.css";
// @mui-components
import { Box, Typography, Button } from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <WarningAmberRoundedIcon sx={{ fontSize: 100 }} color="error" />
      <Typography align="center" variant="h3" gutterBottom>
        Page non trouvée.
      </Typography>
      <Button onClick={() => navigate("/")}>Page d'acceuil</Button>
    </Box>
  );
}

export default Error;
