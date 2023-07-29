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

function getInitialValues(contactOrganisationToEdit) {
  return {
    [nom.name]: contactOrganisationToEdit?.nom,
    [prenom.name]: contactOrganisationToEdit?.prenom,
    [e_mail.name]: contactOrganisationToEdit?.e_mail,
    [entreprise.name]: contactOrganisationToEdit?.organisation?.nom,
    [adresse.name]: contactOrganisationToEdit?.organisation?.adresse,
    [code_postal.name]: contactOrganisationToEdit?.organisation?.code_postal,
    [ville.name]: contactOrganisationToEdit?.organisation?.ville,
    [statut.name]: contactOrganisationToEdit?.organisation?.statut,
  };
}
export default getInitialValues;
