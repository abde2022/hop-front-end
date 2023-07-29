// @mui-components
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
function ButtonTemp(props) {
  const { label, withIcon, inStart, Icon } = props;
  const theme = useTheme();

  const handleClick = () => {
    props.clicked();
  };
  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          background: theme.palette.button.background,
          color: theme.palette.button.color,
          border: `2px solid ${theme.palette.button.border}`,
          ":hover": {
            color: theme.palette.button.border,
          },
        }}
        startIcon={withIcon && inStart ? <Icon /> : null}
        endIcon={withIcon && !inStart ? <Icon /> : null}
      >
        {label}
      </Button>
    </>
  );
}

export default ButtonTemp;
