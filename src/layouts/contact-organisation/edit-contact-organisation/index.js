/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable import/order */
/* eslint-disable object-shorthand */
/* eslint-disable no-console */

// @react
import { useState, useEffect } from "react";
// @formik
import { Form, Formik } from "formik";
// @mui
import { Grid, Card, Box, Button, Typography } from "@mui/material";
// @formik-components
import NewContactOrganisationForm from "./components/edit-contact-organisation-form";
import form from "./components/shemas/form";
import validations from "./components/shemas/validations";
import getInitialValues from "./components/shemas/getInitialValues";
// @components
import { getCurrentDateTime } from "components/get-current-date-time";
import { handleNewContactOrganisation } from "components/handle-error-response";
import { generateUniqueKey } from "components/generate-unique-key";
import AlertConfirmation from "components/alert-confirmation";
import Submitting from "components/submitting";
// @mui-icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
// @API
import { Contact, ContactOrganisation, Organisation } from "utils/fetcher-api";
// @options
import { statuts } from "utils/options";
import { theme } from "components/theme";

function EditContactOrganisation(props) {
  const { id } = props;
  // Sleeper
  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  // use @Formik For New User
  const { formId, formField } = form;
  const currentValidation = validations[0];
  const [IsSubmitting, setIsSubmitting] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isError, setIsError] = useState(false);
  // alert-confirmation
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [titleConfirmation, setTitleConfirmation] = useState("Doublon");
  const [descriptionConfirmation, setDescriptionConfirmation] = useState(
    `Contact exist déjà avec le même prénom et le même nom. <br /> Êtes-vous sûr de vouloir ajouter ce contact ?`
  );
  // data
  const [contactToEdit, setContactToEdit] = useState(null);
  const [organisationToEdit, setOrganisationToEdit] = useState(null);
  const [contactorganisationToEdit, setContactOrganisationToEdit] = useState(
    []
  );
  const [contactSelectedId, setContactSelectedId] = useState(null);
  const [organisationSelectedId, setOrganisationSelectedId] = useState(null);

  const handleChangeRowsPerPage = (newValue) => {
    props.onRowsPerPageChange(newValue);
  };

  const handleConfirmationChange = async (value) => {
    if (value) {
      editContactOrganisation(contactToEdit, organisationToEdit);
    }

    setIsOpenConfirmation(false);
  };

  const isContactDuplicated = async (nom, prenom) => {
    try {
      const form = {
        nom: nom,
        prenom: prenom,
      };
      const response = await Contact.isAlreadyExist(form);
      if (response.status && response.code === 200 && response.data)
        return true;
      setIsSubmitting(false);
      return false;
    } catch (error) {
      setIsSubmitting(false);
      return false;
    }
  };
  const submitEditOrganisation = async (form) => {
    try {
      const response = await Organisation.update(organisationSelectedId, form);
      if (response.status && response.code === 200) {
        return response;
      } else {
        setIsSubmitting(false);
      }

      return false;
    } catch (error) {
      console.log("error");
      setIsSubmitting(false);
      return false;
    }
  };
  const submitEditContact = async (form) => {
    try {
      const response = await Contact.update(contactSelectedId, form);
      await sleep(1000);
      if (response.status && response.code === 200) {
        return true;
      }
      setIsSubmitting(false);
      return false;
    } catch (error) {
      console.log("error");
      setIsSubmitting(false);
      return false;
    }
  };
  const editContactOrganisation = async (contact, organisation) => {
    const editOrganisation = await submitEditOrganisation(organisation);
    if (editOrganisation) {
      const editContact = await submitEditContact(contact);
      if (editContact) {
        setIsCreated(true);
        await sleep(3000);
        setIsCreated(false);
        handleChangeRowsPerPage(10);
      }
    } else {
      setIsError(true);
      await sleep(3000);
      setIsError(false);
    }
    setIsSubmitting(false);
  };

  const submitEditContactOrganisation = async (values, actions) => {
    actions.setSubmitting(true);
    setIsSubmitting(true);
    await sleep(1000);

    try {
      const currentDateTime = await getCurrentDateTime();
      const generateKey = await generateUniqueKey();

      const {
        nom,
        prenom,
        e_mail,
        entreprise,
        adresse,
        code_postal,
        ville,
        statut,
      } = values;

      const ContactToEdit = {
        cle: generateKey,
        nom: nom,
        prenom: prenom,
        e_mail: e_mail,
        updated_at: currentDateTime,
      };
      const OrganisationToEdit = {
        cle: generateKey,
        nom: entreprise,
        adresse: adresse,
        code_postal: code_postal,
        ville: ville,
        statut: statut,
        updated_at: currentDateTime,
      };

      setOrganisationToEdit(OrganisationToEdit);
      setContactToEdit(ContactToEdit);

      const isContactExist = await isContactDuplicated(nom, prenom);
      if (!isContactExist) {
        await editContactOrganisation(ContactToEdit, OrganisationToEdit);
      } else {
        setIsOpenConfirmation(true);
      }

      actions.setSubmitting(false);
    } catch (error) {
      console.log("error");
      actions.setSubmitting(false);
    }
  };
  const handleSubmit = (values, actions) => {
    setIsSubmitting(true);
    submitEditContactOrganisation(values, actions);
    actions.setTouched({});
    actions.setSubmitting(false);
  };

  const getContactOrganisation = async (id) => {
    try {
      const response = await ContactOrganisation.show(id);
      if (response.status && response.code === 200) {
        console.log(response);
        setContactOrganisationToEdit(getInitialValues(response.data[0]));
        setContactSelectedId(response.data[0]?.id);
        setOrganisationSelectedId(response.data[0]?.organisation?.id);
      } else {
        setIsError(true);
        await sleep(3000);
        setIsError(false);
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getContactOrganisation(id);
  }, [id]);

  const closeAlertDialog = () => {
    props.close(false);
  };
  return (
    <>
      <Box>
        <AlertConfirmation
          title={titleConfirmation}
          description={descriptionConfirmation}
          confirmation={handleConfirmationChange}
          isOpen={isOpenConfirmation}
        />
        <Formik
          enableReinitialize={true}
          initialValues={contactorganisationToEdit}
          validationSchema={currentValidation}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            resetForm,
          }) =>
            isCreated ? (
              <Submitting
                msg="Contact Modifier avec succès !"
                Icon={CheckCircleIcon}
                color="success"
              />
            ) : isError ? (
              <Submitting
                msg="Erreur, essayez à nouveau !"
                Icon={WarningAmberRoundedIcon}
                color="error"
              />
            ) : (
              <Form
                id={formId}
                autoComplete="off"
                style={{
                  pointerEvents: IsSubmitting ? "none" : "painted",
                  opacity: IsSubmitting ? 0.4 : 1,
                }}
              >
                <Box p={2}>
                  <NewContactOrganisationForm
                    formData={{
                      values,
                      touched,
                      formField,
                      errors,
                      handleChange,
                      handleBlur,
                      statuts,
                    }}
                  />
                  <Box
                    sx={{
                      pt: 2,
                      pb: 3,
                      justifyContent: { xs: "center", sm: "flex-end" },
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                    mt={2}
                    width="100%"
                    display="flex"
                  >
                    <Button
                      sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }}
                      onClick={() => closeAlertDialog()}
                      disabled={IsSubmitting}
                      variant="outlined"
                      color="info"
                    >
                      Annuler
                    </Button>
                    <Button
                      sx={{ bgcolor: "#1ca4c7" }}
                      disabled={IsSubmitting}
                      type="submit"
                      variant="contained"
                    >
                      {IsSubmitting ? "Modification..." : "Modifier"}
                    </Button>
                  </Box>
                </Box>
              </Form>
            )
          }
        </Formik>
      </Box>
    </>
  );
}

export default EditContactOrganisation;
