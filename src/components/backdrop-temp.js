//@MUI
import Backdrop from "@mui/material/Backdrop";

function BackdropTemp({ isOpen }) {
  return <Backdrop sx={{ color: "#fff", zIndex: 9 }} open={isOpen}></Backdrop>;
}

export default BackdropTemp;
