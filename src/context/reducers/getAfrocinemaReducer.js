import {
  GET_AFROCINEMA_DATA,
  GET_AFROCINEMA_LOADING,
} from '../../constants/actionTypes';

const getAfrocinemaReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_AFROCINEMA_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_AFROCINEMA_DATA:
      return {
        ...state,
        afrocinemaData: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default getAfrocinemaReducer;
