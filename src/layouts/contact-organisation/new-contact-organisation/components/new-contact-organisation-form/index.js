// @mui-components
import Grid from "@mui/material/Grid";
// @field
import FormField from "../form-field";

function newContactOrganisationForm({ formData }) {
  const { formField, values, errors, touched, statuts } = formData;

  let { nom, prenom, e_mail, entreprise, adresse, code_postal, ville, statut } =
    formField;

  let {
    nom: nomValue,
    prenom: prenomValue,
    e_mail: e_mailValue,
    entreprise: entrepriseValue,
    adresse: adresseValue,
    code_postal: code_postalValue,
    ville: villeValue,
    statut: statutValue,
  } = values;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormField
            type={nom.type}
            label={nom.label}
            name={nom.name}
            value={nomValue}
            placeholder={nom.placeholder}
            error={errors.nom && touched.nom}
            success={(nomValue.length > 0 && !errors.nom).toString()}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField
            type={prenom.type}
            label={prenom.label}
            name={prenom.name}
            value={prenomValue}
            placeholder={prenom.placeholder}
            error={errors.prenom && touched.prenom}
            success={(prenomValue.length > 0 && !errors.prenom).toString()}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormField
            type={e_mail.type}
            label={e_mail.label}
            name={e_mail.name}
            value={e_mailValue}
            placeholder={e_mail.placeholder}
            error={errors.e_mail && touched.e_mail}
            success={(e_mailValue.length > 0 && !errors.e_mail).toString()}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormField
            type={entreprise.type}
            label={entreprise.label}
            name={entreprise.name}
            value={entrepriseValue}
            placeholder={entreprise.placeholder}
            error={errors.entreprise && touched.entreprise}
            success={(
              entrepriseValue.length > 0 && !errors.entreprise
            ).toString()}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormField
            type={adresse.type}
            label={adresse.label}
            name={adresse.name}
            value={adresseValue}
            placeholder={adresse.placeholder}
            error={errors.adresse && touched.adresse}
            success={(adresseValue.length > 0 && !errors.adresse).toString()}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormField
            type={code_postal.type}
            label={code_postal.label}
            name={code_postal.name}
            value={code_postalValue}
            placeholder={code_postal.placeholder}
            error={errors.code_postal && touched.code_postal}
            success={(
              code_postalValue.length > 0 && !errors.code_postal
            ).toString()}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormField
            type={ville.type}
            label={ville.label}
            name={ville.name}
            value={villeValue}
            placeholder={ville.placeholder}
            error={errors.ville && touched.ville}
            success={(villeValue.length > 0 && !errors.ville).toString()}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormField
            selectOptions={statuts}
            isAutoComplete
            label={statut.label}
            name={statut.name}
            value={statutValue}
            error={(errors.statut && touched.statut)?.toString()}
            success={(statutValue?.length > 0 && !errors.statut).toString()}
            placeholder={statut.placeholder}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default newContactOrganisationForm;
