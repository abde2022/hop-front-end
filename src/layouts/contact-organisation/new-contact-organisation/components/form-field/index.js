//@Formik
import { ErrorMessage, Field, useFormikContext } from "formik";
//@Mui
import { TextField, Box, Typography, Autocomplete } from "@mui/material";

function FormField({
  label,
  name,
  value,
  selectOptions,
  isAutoComplete,
  ...rest
}) {
  //@Fomik-Use
  const { setFieldValue } = useFormikContext();

  return (
    <Box mb={1.5}>
      {isAutoComplete ? (
        <Autocomplete
          onChange={(event, newValue) => setFieldValue(name, newValue?.label)}
          key={selectOptions.id}
          options={selectOptions}
          {...rest}
          name={name}
          renderInput={(params) => (
            <TextField {...params} label={label} fullWidth />
          )}
        />
      ) : (
        <Field
          key={name}
          {...rest}
          name={name}
          as={TextField}
          variant="outlined"
          label={label}
          fullWidth
          sx={{ textAlign: "right" }}
        />
      )}

      <Box mt={0.75} sx={{ display: "flex", justifyContent: "left", mr: 2 }}>
        <Typography
          component="div"
          variant="caption"
          color="error"
          fontWeight="regular"
        >
          {<ErrorMessage name={name} />}
        </Typography>
      </Box>
    </Box>
  );
}

export default FormField;
