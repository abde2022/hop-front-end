/* eslint-disable react-hooks/exhaustive-deps */

// @react
import { useState } from "react";
// @mui-components
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Stack,
  PaginationItem,
  Paper,
} from "@mui/material";
// @mui-icons
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
function Paginations(props) {
  const { counterPages } = props;
  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCurrentPageChange = (event, value) => {
    props.onPageChange(value);
    setCurrentPage(value);
  };

  const handleItemPerPageChange = (value) => {
    props.onRowsPerPageChange(value);
    setItemPerPage(value);
    setCurrentPage(1);
  };

  return (
    <Paper
      sx={{
        background: "#fff",
        width: "95%",
        display: "flex",
        justifyContent: {
          xs: "center",
          sm: "space-between",
          md: "space-between",
          lg: "space-between",
        },
        flexDirection: {
          xs: "column",
          sm: "row",
          md: "row",
          lg: "row",
        },
        alignItems: "center",
        pb: 2,
        pt: 2,
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Items per page</InputLabel>
        <Select
          sx={{ background: "#fff" }}
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={itemPerPage}
          defaultValue={itemPerPage}
          label="Items per page"
          onChange={(e) => handleItemPerPageChange(e.target.value)}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
      <Stack
        spacing={2}
        sx={{
          pb: { xs: 2, sm: 2, md: 0 },
          pt: { xs: 2, sm: 2, md: 0 },
          pr: 1,
        }}
      >
        <Pagination
          sx={{ display: "flex", justifyContent: "center" }}
          page={currentPage}
          onChange={handleCurrentPageChange}
          count={counterPages}
          variant="outlined"
          size="small"
          renderItem={(item) => (
            <PaginationItem
              components={{
                previous: ArrowLeftIcon,
                next: ArrowRightIcon,
              }}
              {...item}
            />
          )}
        />
      </Stack>
    </Paper>
  );
}

export default Paginations;
