import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Please enter a phone number')
    .matches(
      // /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      /^[0-9]\d+$/,
      'Enter a valid phone number',
    ),
});
