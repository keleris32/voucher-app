import { GET_AFROCINEMA_DATA } from '../../constants/actionTypes';

const getAfrocinemaReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_AFROCINEMA_DATA:
      return {
        ...state,
        afrocinemaData: payload,
      };

    default:
      return state;
  }
};

export default getAfrocinemaReducer;
