import {
  GET_PAYMENT_DATA,
  SELECTED_AFROCINEMA_CARD,
  SELECTED_AFROSTREAM_CARD,
} from '../../constants/actionTypes';

const selectedCardReducer = (state, { type, payload }) => {
  switch (type) {
    case SELECTED_AFROCINEMA_CARD:
      return {
        ...state,
        selectedAfrocinemaData: payload,
        isAfrocinemaActive: true,
        isAfrostreamActive: false,
      };

    case SELECTED_AFROSTREAM_CARD:
      return {
        ...state,
        selectedAfrostreamData: payload,
        isAfrocinemaActive: false,
        isAfrostreamActive: true,
      };

    case GET_PAYMENT_DATA:
      return {
        ...state,
        paymentData: payload,
      };

    default:
      return state;
  }
};

export default selectedCardReducer;
