/* eslint-disable no-unused-vars */

// @yup
import * as Yup from "yup";
// @form
import checkout from "./form";

const {
  formField: {
    nom,
    prenom,
    e_mail,
    entreprise,
    adresse,
    code_postal,
    ville,
    statut,
  },
} = checkout;

const validations = [
  Yup.object().shape({
    // validation-contact
    [nom.name]: Yup.string().required(nom.errorMsg),
    [prenom.name]: Yup.string().required(nom.errorMsg),
    [e_mail.name]: Yup.string()
      .required(e_mail.errorMsg)
      .email(e_mail.invalidMsg),
    // validation-organisation
    [entreprise.name]: Yup.string().required(entreprise.errorMsg),
    [adresse.name]: Yup.string().required(adresse.errorMsg),
    [code_postal.name]: Yup.number().required(code_postal.errorMsg),
    [ville.name]: Yup.string().required(ville.errorMsg),
    [statut.name]: Yup.string().required(statut.errorMsg),
  }),
];

export default validations;
