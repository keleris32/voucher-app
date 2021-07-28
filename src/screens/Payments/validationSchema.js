import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  phoneNumber: yup.string().required('Please enter a phone number'),
});
