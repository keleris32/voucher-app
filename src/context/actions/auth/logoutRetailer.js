import { LOGOUT_RETAILER } from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => dispatch => {
  axiosInstance
    .get('retailer/auth/logout')
    .then(res => {
      // Dispatch this action which sets the authState, isLoggedIn to false.
      dispatch({
        type: LOGOUT_RETAILER,
      });

      // If the Logout operation is successfully, remove the jwtToken from local storage
      AsyncStorage.removeItem('token');

      // If the Logout operation is successfully, remove the retailer object from local storage
      AsyncStorage.removeItem('retailer');
    })
    .catch(err => {
      console.log(err?.response.data);
    });
};
