// @rect
import { forwardRef } from "react";
// @mui-components
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  Typography,
} from "@mui/material";
// @mui-icons
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertConfirmation(props) {
  const { isOpen, title, description } = props;

  const handleConfirmation = () => {
    props.confirmation(true);
    handleClose();
  };

  const handleClose = () => {
    props.confirmation(false);
  };

  return (
    <Box>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          sx={{
            background: "#fff",
            display: "flex",
            flexDirection: "row",
            pl: "24px",
            pt: "22px",
          }}
        >
          <Box
            sx={{
              background: "#ffd8d8",
              borderRadius: "50%",
              p: 1,
              display: "flex",
            }}
          >
            <WarningAmberRoundedIcon color="error" />
          </Box>
          <Typography variant="h5" sx={{ ml: 2 }} gutterBottom>
            {title}
          </Typography>
        </Box>
        <DialogContent sx={{ background: "#fff" }}>
          <DialogContentText
            dangerouslySetInnerHTML={{ __html: description }}
            id="alert-dialog-slide-description"
          />
        </DialogContent>
        <DialogActions sx={{ background: "#fff" }}>
          <Button sx={{ ml: 2 }} variant="outlined" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmation}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
