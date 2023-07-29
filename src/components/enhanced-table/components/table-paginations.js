// @mui-components
import { TablePagination } from "@mui/material";

function TablePaginations(props) {
  const { count, page, rowsPerPage } = props;

  const handleChangePage = (event, newPage) => {
    props.onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newValue = parseInt(event.target.value, 10);
    props.onRowsPerPageChange(newValue);
  };

  return (
    <TablePagination
      sx={{ mt: 2 }}
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}

export default TablePaginations;
