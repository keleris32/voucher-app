import {
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  NETWORK_ERROR,
} from '../../constants/actionTypes';

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case REGISTER_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: '',
        networkError: '',
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: payload,
        error: '',
        networkError: '',
      };

    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        networkError: '',
        success: false,
      };

    case NETWORK_ERROR:
      return {
        ...state,
        loading: false,
        error: '',
        networkError: payload,
        success: false,
      };

    default:
      return state;
  }
};

export default authReducer;
