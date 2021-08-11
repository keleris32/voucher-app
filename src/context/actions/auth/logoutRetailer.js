import {
  LOGOUT_RETAILER,
  LOGOUT_RETAILER_ERROR,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => dispatch => {
  axiosInstance
    .get('retailer/auth/logout')
    .then(res => {
      // If the Logout operation is successfully, remove the jwtToken from local storage
      AsyncStorage.removeItem('token');

      // If the Logout operation is successfully, remove the retailer object from local storage
      AsyncStorage.removeItem('retailer');

      // Dispatch this action which sets the authState, isLoggedIn to false.
      dispatch({
        type: LOGOUT_RETAILER,
      });
    })
    .catch(err => {
      // // console.log(err?.response.data);
      // // If the Logout operation is successfully, remove the jwtToken from local storage
      // AsyncStorage.removeItem('token');

      // // If the Logout operation is successfully, remove the retailer object from local storage
      // AsyncStorage.removeItem('retailer');

      // // Dispatch this action which sets the authState, isLoggedIn to false.
      // dispatch({
      //   type: LOGOUT_RETAILER,
      // });

      dispatch({
        type: LOGOUT_RETAILER_ERROR,
      });
    });
};
