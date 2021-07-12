import { GET_COUNTRY_DATA } from '../../constants/actionTypes';

export const countryDataReducer = (state, action) => {
  switch (action.type) {
    case GET_COUNTRY_DATA:
      return {
        countryId: action.payloadId,
        countryName: action.payloadName,
        countryCode: action.payloadCode,
      };

    default:
      return state;
  }
};
