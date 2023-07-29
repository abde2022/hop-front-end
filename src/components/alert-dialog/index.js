// @mui-components
import { Dialog, DialogContent, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
// @components
import AlertDialogTitle from "./compoents/alert-dialog-title";
import NewContactOrganisation from "layouts/contact-organisation/new-contact-organisation";
import EditContactOrganisation from "layouts/contact-organisation/edit-contact-organisation";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    background: "#fff",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    background: "#fff",
  },
  "& #customized-dialog-title": {
    background: "#fff",
  },
}));

export default function AlertDialog(props) {
  const { title, type, open, id } = props;

  const handleClose = () => {
    props.close(false);
  };

  const handleChangeRowsPerPage = (newValue) => {
    props.onRowsPerPageChange(newValue);
  };

  return (
    <Box>
      <BootstrapDialog
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <AlertDialogTitle title={title} id="customized-dialog-title" />
        <DialogContent dividers>
          {type === "add" ? (
            <NewContactOrganisation
              onRowsPerPageChange={handleChangeRowsPerPage}
              close={handleClose}
            />
          ) : type === "edit" ? (
            <EditContactOrganisation
              id={id}
              close={handleClose}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          ) : (
            <h1>view</h1>
          )}
        </DialogContent>
      </BootstrapDialog>
    </Box>
  );
}
