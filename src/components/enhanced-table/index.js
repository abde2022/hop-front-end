/* eslint-disable react-hooks/exhaustive-deps */

// @react
import { useEffect, useState } from "react";
// @mui-components
import { Box, Table, TableContainer, Paper } from "@mui/material";
// @components
import TableHeader from "./components/table-header";
import TableToolbar from "./components/table-toolbar";
import { GetComparator } from "./components/get-comparator";
import { StableSort } from "./components/stable-sort";
import Submitting from "components/submitting";
// @options
import { headCells } from "utils/options";
// @prop-types
import PropTypes from "prop-types";
// @mui-components
import TableBodys from "./components/table-bodys";
// @mui-icons
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

function EnhancedTable(props) {
  const { rows, rowsPerPage, page, isSubmitting, IsDeleted } = props;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("statut");
  const [isSearching, setIsSearching] = useState(false);
  const [searchedRows, setSearchedRows] = useState([]);
  const [sortededRows, setSortededRows] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // searching
  const handleSearchChange = (value) => {
    if (value) {
      setSearchedRows(SearchingRows(value));
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  const SearchingRows = (value) => {
    const filtration = rows.filter(
      (row) =>
        row.nom.toLowerCase().includes(value.toLowerCase()) ||
        row.prenom.toLowerCase().includes(value.toLowerCase()) ||
        row.organisation.nom.toLowerCase().includes(value.toLowerCase())
    );

    return filtration;
  };

  //  sorting
  useEffect(() => {
    setSortededRows(StableSort(rows, GetComparator(order, orderBy)));
  }, [order, orderBy, rowsPerPage, page]);

  const visibleRows = isSearching ? searchedRows : sortededRows;

  // actions-rows-handle
  const handleClick = (action, id) => {
    props.click(action, id);
  };

  return (
    <Box sx={{ width: "95%" }}>
      <Paper sx={{ width: "100%", background: "#fff" }}>
        <TableToolbar click={handleClick} searchChange={handleSearchChange} />

        <TableContainer>
          {isSubmitting ? (
            <Submitting
              msg="Submitting..."
              Icon={CheckCircleRoundedIcon}
              color="info"
            />
          ) : IsDeleted ? (
            <Submitting
              msg="contact supprimer avec succès !"
              Icon={AutorenewIcon}
              color="success"
            />
          ) : (
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <TableHeader
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                headCells={headCells}
              />
              <TableBodys click={handleClick} visibleRows={visibleRows} />
            </Table>
          )}
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default EnhancedTable;
EnhancedTable.propTypes = {
  rows: PropTypes.arrayOf(Object).isRequired,
};
