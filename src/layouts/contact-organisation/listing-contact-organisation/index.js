/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// @mui-components
import { Box } from "@mui/material";
// @API
import { Contact, ContactOrganisation, Organisation } from "utils/fetcher-api";
// @components
import { theme } from "components/theme";
import EnhancedTable from "components/enhanced-table";
import AlertDialog from "components/alert-dialog";
import { handleListingContactOrganisation } from "components/handle-error-response";
import Paginations from "components/pagination";
import AlertConfirmation from "components/alert-confirmation";

function ListingContactOrganisation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(1);
  // alert-dialog
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);
  const [titleAlertDialog, setTitleAlertDialog] = useState("");
  const [actionType, setActionType] = useState("");
  // alert-confirmation
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [titleConfirmation, setTitleConfirmation] = useState(
    "Supprimer le contact"
  );
  const [descriptionConfirmation, setDescriptionConfirmation] = useState(
    `Êtes-vous sûr de vouloir Supprimer le contact ? <br /> Cette opération est irreversible.`
  );
  const [IsDeleted, setIsDeleted] = useState(false);
  //
  const [selectedId, setSelectedId] = useState(null);

  //handle pagination
  const handleChangePage = (newValue) => {
    setPage(newValue);
  };

  const handleChangeRowsPerPage = (newValue) => {
    setRowsPerPage(newValue);
    setPage(1);
  };

  // actions-rows-handle
  const getTitleAlertDialog = (action) => {
    if (action === "view") {
      setTitleAlertDialog("Détail Contact");
    } else if (action === "edit") {
      setTitleAlertDialog("Edit Contact");
    } else if (action === "add") {
      setTitleAlertDialog("Ajouter Contact");
    }
  };
  const handleClick = (action, id) => {
    console.log(action, id);
    setSelectedId(id);
    setActionType(action);
    getTitleAlertDialog(action);
    if (["view", "edit", "add"].includes(action)) {
      setIsOpenAlertDialog(true);
    } else if (action === "delete") {
      setIsOpenConfirmation(true);
    } else {
      setIsOpenAlertDialog(false);
    }
  };
  const handleClose = (newValue) => {
    setIsOpenAlertDialog(newValue);
  };

  // delete-contact-organisation
  const deleteContact = async () => {
    try {
      const response = await Contact.delete(selectedId[0]);
      await sleep(100);
      if (response.status && response.code === 200) {
        return true;
      }
      return false;
    } catch (error) {
      console.log("error");
      return false;
    }
  };
  const deleteOrganisation = async () => {
    try {
      const response = await Organisation.delete(selectedId[1]);
      await sleep(1000);
      if (response.status && response.code === 200) {
        return true;
      }
      return false;
    } catch (error) {
      console.log("error");
      return false;
    }
  };
  const deleteContactOrganisation = async () => {
    try {
      const organisation = await deleteOrganisation();
      const contact = await deleteContact();
      console.log(contact, organisation);

      setIsDeleted(true);
      await sleep(3000);
      setIsDeleted(false);
    } catch (error) {
      console.log("error");
    }
  };

  const handleConfirmationChange = async (value) => {
    if (value) {
      await deleteContactOrganisation();
    }

    setIsOpenConfirmation(false);
  };

  // Sleeper
  const sleep = (ms) => {
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  useEffect(() => {
    getContactOrganisation();
  }, [page, rowsPerPage]);

  // get-contact-organisation
  const getContactOrganisation = async () => {
    setIsSubmitting(true);
    const form = {
      currentPage: page,
      itemPerPage: rowsPerPage,
    };
    try {
      const response = await ContactOrganisation.list(form);
      await sleep(1000);
      if (await handleListingContactOrganisation(response)) {
        console.log(response.data.data);
        setCount(response.data.last_page);
        setRows(Object.values(response.data.data));
      }

      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  // get-content-alert
  const getContentAlert = () => {
    return actionType === "add"
      ? "add"
      : actionType === "edit"
      ? "edit"
      : "view";
  };

  return (
    <>
      <Box
        sx={{
          background: theme.palette.background,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          pb: 5,
          height: "max-content",
        }}
      >
        <AlertConfirmation
          title={titleConfirmation}
          description={descriptionConfirmation}
          confirmation={handleConfirmationChange}
          isOpen={isOpenConfirmation}
        />

        <AlertDialog
          close={handleClose}
          title={titleAlertDialog}
          open={isOpenAlertDialog}
          type={getContentAlert()}
          id={selectedId}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <EnhancedTable
          click={handleClick}
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          isSubmitting={isSubmitting}
          IsDeleted={IsDeleted}
        />

        <Paginations
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          counterPages={count}
          rowsPerPage={rowsPerPage}
          page={page}
        />
      </Box>
    </>
  );
}

export default ListingContactOrganisation;
