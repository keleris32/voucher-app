import * as yup from 'yup';

export const accountSettingsValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter a valid name')
    .required('Name is required'),
  lastName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter a valid name')
    .required('Name is required'),
});
