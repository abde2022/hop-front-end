// @mui-components
import { Typography, Toolbar, Box, TextField } from "@mui/material";
// @mui-icons
import AddIcon from "@mui/icons-material/Add";
// @components
import Button from "components/button-temp";

export default function TableToolbar(props) {
  const handleClick = () => {
    props.click("add", null);
  };

  const handleSearchChange = (value) => {
    props.searchChange(value);
  };

  return (
    <Toolbar
      sx={{
        m: 3,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        justifyContent: "space-between",
        flexDirection: { xs: "column-reverse", sm: "row" },
      }}
    >
      <Box sx={{ flexDirection: "column" }}>
        <Typography
          sx={{ flex: "1 1 100%", mb: 1, mt: 1 }}
          variant="h6"
          id="tableTitle"
          component="div"
          color="gray"
        >
          List des contacts
        </Typography>
        <TextField
          onChange={(e) => handleSearchChange(e.target.value)}
          type="text"
          label="Rechercher..."
          id="filled-size-small"
          variant="outlined"
          size="small"
        />
      </Box>
      <Button
        label="Ajouter"
        Icon={AddIcon}
        withIcon={true}
        inStart={true}
        clicked={handleClick}
      />
    </Toolbar>
  );
}
