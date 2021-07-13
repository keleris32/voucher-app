import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

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
