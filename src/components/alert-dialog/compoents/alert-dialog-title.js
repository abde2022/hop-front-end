// @react
import React from "react";
// @prop-types
import PropTypes from "prop-types";
// @mui-components
import { DialogTitle } from "@mui/material";

function AlertDialogTitle(props) {
  const { title } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, background: "#fff" }}>{title}</DialogTitle>
  );
}

export default AlertDialogTitle;

AlertDialogTitle.propTypes = {
  children: PropTypes.node,
};
