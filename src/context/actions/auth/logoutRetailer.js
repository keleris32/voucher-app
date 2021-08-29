import {
  LOGOUT_LOADING,
  LOGOUT_RETAILER,
  LOGOUT_RETAILER_ERROR,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default navigation => dispatch => {
  dispatch({
    type: LOGOUT_LOADING,
  });

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
      navigation.goBack('initialRoute');
    })
    .catch(err => {
      dispatch({
        type: LOGOUT_RETAILER_ERROR,
      });
    });
};
