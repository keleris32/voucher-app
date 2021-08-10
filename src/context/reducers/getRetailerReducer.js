import { GET_RETAILER } from '../../constants/actionTypes';

const getRetailerReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_RETAILER:
      return {
        ...state,
        retailerData: payload,
      };

    default:
      return state;
  }
};

export default getRetailerReducer;
