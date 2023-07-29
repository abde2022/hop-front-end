//@Form
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

const initialValues = {
  [nom.name]: "",
  [prenom.name]: "",
  [e_mail.name]: "",
  [entreprise.name]: "",
  [adresse.name]: "",
  [code_postal.name]: "",
  [ville.name]: "",
  [statut.name]: "1",
};

export default initialValues;
