import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_AUTH_STATE,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearAuthState = () => dispatch => {
  dispatch({
    type: CLEAR_AUTH_STATE,
  });
};

export default ({
    firstName: first_name,
    lastName: last_name,
    email,
    password,
    confirmPassword: password_confirmation,
    phoneNumber: phone_number,
    country_id,
    callbackUrl,
    registration_channel,
  }) =>
  dispatch => {
    dispatch({
      type: REGISTER_LOADING,
    });
    axiosInstance
      .post('retailer/auth/register', {
        first_name,
        last_name,
        email,
        password,
        password_confirmation,
        phone_number,
        country_id,
        callbackUrl,
        registration_channel,
      })
      .then(res => {
        // If the Login operation is successfully, store the jwtToken in local storage
        AsyncStorage.setItem('token', res.data.data.jwtToken);

        // If the Login operation is successfully, store the retailer object in local storage
        AsyncStorage.setItem('retailer', JSON.stringify(res.data.data.user));

        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: REGISTER_FAIL,
          payload: err.response ? err.response.data : err,
        });
      });
  };
