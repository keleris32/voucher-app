import { SELECTED_CARD } from '../../constants/actionTypes';

const selectedCardReducer = (state, { type, payload }) => {
  switch (type) {
    case SELECTED_CARD:
      return {
        ...state,
        selectedCardData: payload,
      };

    default:
      return state;
  }
};

export default selectedCardReducer;
