// @mui-components
import { Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Chips({ label }) {
  const theme = useTheme();

  return (
    <>
      {label === "Lead" ? (
        <Chip
          size="small"
          sx={{
            color: theme.palette.chips.lead.color,
            background: theme.palette.chips.lead.background,
            fontSize: "small",
            textTransform: "capitalize",
          }}
          label={label}
        />
      ) : label === "Client" ? (
        <Chip
          size="small"
          sx={{
            color: theme.palette.chips.client.color,
            background: theme.palette.chips.client.background,
            fontSize: "small",
            textTransform: "capitalize",
          }}
          label={label}
        />
      ) : (
        <Chip
          size="small"
          sx={{
            color: theme.palette.chips.prospect.color,
            background: theme.palette.chips.prospect.background,
            fontSize: "small",
            textTransform: "capitalize",
          }}
          label={label}
        />
      )}
    </>
  );
}
