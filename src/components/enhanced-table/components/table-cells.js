import React from "react";
// @mui-components
import { TableCell } from "@mui/material";

function TableCells(props) {
  const { data } = props;

  return <TableCell align="center">{data}</TableCell>;
}

export default TableCells;
