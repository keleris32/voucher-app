import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_LOADING,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default ({ email, password }) =>
  dispatch => {
    dispatch({
      type: LOGIN_LOADING,
    });
    axiosInstance
      .post('retailer/auth/login', {
        email,
        password,
      })
      .then(res => {
        // If the Login operation is successfully, store the jwtToken in local storage
        AsyncStorage.setItem('token', res.data.data.jwtToken);

        // If the Login operation is successfully, store the retailer object in local storage
        AsyncStorage.setItem(
          'retailer',
          JSON.stringify(res.data.data.retailer),
        );

        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAIL,
          payload: err.response ? err.response.data.data : err,
        });
      });
  };
