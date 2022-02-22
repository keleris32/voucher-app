import { GET_LOCATION } from '../../constants/actionTypes';

const getLocationReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_LOCATION:
      return {
        ...state,
        locationData: payload,
      };

    default:
      return state;
  }
};

export default getLocationReducer;
