import { GET_RETAILER } from '../../constants/actionTypes';

const getRetailerReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_RETAILER:
      return {
        ...state,
        retailerData: payload,
      };

    case 'GET_RETAILER_COUNTRY_DATA':
      return {
        ...state,
        retailerCountryData: payload,
      };
    default:
      return state;
  }
};

export default getRetailerReducer;
