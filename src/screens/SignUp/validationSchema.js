import * as yup from 'yup';

export const signUpValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    // .trim()
    .matches(/^[A-Z-a-z ]*$/, 'Please enter valid name')
    .max(40, 'The name is too long!')
    .required('Name is required'),
  phoneNumber: yup
    .string()
    .required('Please enter a phone number')
    .trim()
    .matches(
      // /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      /^[0-9]\d+$/,
      'Enter a valid phone number',
    ),
  email: yup
    .string()
    .email('Please enter a valid Email address')
    .trim()
    .required('Email Address is required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters long`)
    .required('Passowrd is required'),
  confirmPassword: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters long`)
    .required('Passowrd is required'),
});

// password: yup
//     .string()
//     .min(8, ({ min }) => `Password must be at least ${min} characters long`)
//     .required('Passowrd is required')
//     .matches(
//       /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
//       'Must contain 8 characters: One uppercase, one number and one special character',
//     ),
