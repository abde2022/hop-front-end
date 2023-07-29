// @mui-components
import { Box, Typography } from "@mui/material";

function Submitting(props) {
  const { msg, Icon, color } = props;
  return (
    <Box
      sx={{
        width: "100%",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Icon sx={{ fontSize: "xx-large" }} color={color} />
      <Typography variant="h5" gutterBottom>
        {msg}
      </Typography>
    </Box>
  );
}

export default Submitting;
