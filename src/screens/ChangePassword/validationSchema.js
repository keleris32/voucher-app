import * as yup from 'yup';

export const changePasswordValidationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters long`)
    .required('Passowrd is required'),
  newPassword: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters long`)
    .required('Passowrd is required'),
  newPasswordConfirmation: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters long`)
    .required('Passowrd is required'),
});
