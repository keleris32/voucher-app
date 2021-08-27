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
      return {
        ...state,
        signUpLoading: true,
        signUpError: '',
      };

    case LOGIN_LOADING:
      return {
        ...state,
        loginLoading: true,
        loginError: '',
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoggedOut: false,
        loginLoading: false,
        signUpLoading: false,
        data: payload,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        signUpLoading: false,
        signUpError: payload,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loginError: payload,
        loginLoading: false,
      };

    case CLEAR_AUTH_STATE:
      return {
        ...state,
        loginLoading: false,
        signUpLoading: false,
        data: null,
        loginError: null,
        signUpError: null,
        logoutError: false,
      };

    case LOGOUT_RETAILER:
      return {
        ...state,
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
