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
    fullName: name,
    email,
    password,
    confirmPassword: password_confirmation,
    phoneNumber: phone_number,
    country_id,
    callbackUrl,
  }) =>
  dispatch => {
    dispatch({
      type: REGISTER_LOADING,
    });
    axiosInstance
      .post('retailer/auth/register', {
        name,
        email,
        password,
        password_confirmation,
        phone_number,
        country_id,
        callbackUrl,
      })
      .then(res => {
        // If the Login operation is successfully, store the jwtToken in local storage
        AsyncStorage.setItem('token', res.data.data.jwtToken);

        // If the Login operation is successfully, store the retailer object in local storage
        // AsyncStorage.setItem(
        //   'retailer',
        //   JSON.stringify(res.data.data.retailer),
        // );

        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch({
          type: REGISTER_FAIL,
          payload: err.response
            ? err.response.data
            : {
                networkError:
                  'Please check your internet connection and try again later.',
              },
        });
      });
  };
