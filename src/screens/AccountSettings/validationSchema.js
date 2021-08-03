import * as yup from 'yup';

export const accountSettingsValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .max(40, 'The name is too long!')
    .required('Name is required'),
  phoneNumber: yup.string().required('Please enter a phone number'),
  // .matches(
  //   /([0-9\s\-]{11,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
  //   'Enter a valid phone number',
  // ),
  email: yup
    .string()
    .email('Please enter a valid Email address')
    .required('Email Address is required'),
});
