import {
  CLEAR_AUTH_STATE,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  LOGOUT_RETAILER,
  LOGOUT_RETAILER_ERROR,
} from '../../constants/actionTypes';

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case REGISTER_LOADING:
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        loginError: '',
        signUpError: '',
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoggedOut: false,
        loading: false,
        data: payload,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        signUpError: payload,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loginError: payload,
      };

    case CLEAR_AUTH_STATE:
      return {
        ...state,
        loading: false,
        data: null,
        loginError: null,
        signUpError: null,
        logoutError: false,
      };

    case LOGOUT_RETAILER:
      return {
        ...state,
        loading: false,
        data: null,
        isLoggedIn: false,
        isLoggedOut: true,
      };

    case LOGOUT_RETAILER_ERROR:
      return {
        ...state,
        logoutError: true,
      };

    default:
      return state;
  }
};

export default authReducer;
