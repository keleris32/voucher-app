import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  documentName: yup.string().required('This field is required'),
});
