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
import NewContactOrganisationForm from "./components/new-contact-organisation-form";
import form from "./components/shemas/form";
import validations from "./components/shemas/validations";
import initialValues from "./components/shemas/initial-values";
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
import { Contact, Organisation } from "utils/fetcher-api";
// @options
import { statuts } from "utils/options";
import { theme } from "components/theme";

function NewContactOrganisation(props) {
  // Sleeper
  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  // use @Formik For New contact
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
  const [contactToAdd, setContactToAdd] = useState(null);
  const [organisationToAdd, setOrganisationToAdd] = useState(null);

  const handleChangeRowsPerPage = (newValue) => {
    props.onRowsPerPageChange(newValue);
  };

  const handleConfirmationChange = async (value) => {
    if (value) {
      newContactOrganisation(contactToAdd, organisationToAdd);
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
  const submitNewOrganisation = async (form) => {
    try {
      const response = await Organisation.create(form);
      if (response[0].status && response[0].code === 201) {
        return [true, response[1]];
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
  const submitNewContact = async (form, Id) => {
    try {
      form.organisation_id = Id;
      const response = await Contact.create(form);
      await sleep(1000);
      if (response.status && response.code === 201) {
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
  const newContactOrganisation = async (contact, organisation) => {
    const addOrganisation = await submitNewOrganisation(organisation);
    if (addOrganisation[0]) {
      const addContact = await submitNewContact(contact, addOrganisation[1]);
      if (addContact) {
        setIsCreated(true);
        await sleep(3000);
        setIsCreated(false);
        handleChangeRowsPerPage(10);
        console.log("contact & organisation created");
      }
    } else {
      setIsError(true);
      await sleep(3000);
      setIsError(false);
    }
    setIsSubmitting(false);
  };
  const submitNewContactOrganisation = async (values, actions) => {
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

      const ContactToAdd = {
        cle: generateKey,
        organisation_id: null,
        nom: nom,
        prenom: prenom,
        e_mail: e_mail,
        created_at: currentDateTime,
        updated_at: currentDateTime,
      };
      const OrganisationToAdd = {
        cle: generateKey,
        nom: entreprise,
        adresse: adresse,
        code_postal: code_postal,
        ville: ville,
        statut: statut,
        created_at: currentDateTime,
        updated_at: currentDateTime,
      };

      setOrganisationToAdd(OrganisationToAdd);
      setContactToAdd(ContactToAdd);

      const isContactExist = await isContactDuplicated(nom, prenom);
      if (!isContactExist) {
        await newContactOrganisation(ContactToAdd, OrganisationToAdd);
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
    submitNewContactOrganisation(values, actions);
    actions.setTouched({});
    actions.setSubmitting(false);
  };

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
          initialValues={initialValues}
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
                msg="Contact créé avec succès !"
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
                      {IsSubmitting ? "Ajoutant..." : "Ajouter"}
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

export default NewContactOrganisation;
