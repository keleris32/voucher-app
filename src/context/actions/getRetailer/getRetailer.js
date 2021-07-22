import { GET_RETAILER } from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default () => async dispatch => {
  await axiosInstance
    .get('retailer/')
    .then(res => {
      console.log(JSON.stringify(res.data, null, 2));
      dispatch({
        type: GET_RETAILER,
        payload: res.data.data,
      });
    })
    .catch(err => console.log(err));
};
