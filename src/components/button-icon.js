import React from "react";
// @mui-components
import { IconButton, Tooltip } from "@mui/material";

function ButtonIcon(props) {
  const { title, Icon, color, action, id } = props;

  const handleClick = () => {
    props.click(action, id);
  };
  return (
    <Tooltip title={title}>
      <IconButton onClick={() => handleClick()}>
        <Icon
          sx={{
            color: color,
          }}
        />
      </IconButton>
    </Tooltip>
  );
}

export default ButtonIcon;
