import { GET_SEARCH_DATA } from '../../constants/actionTypes';

const searchFilter = (state, { type, payload }) => {
  switch (type) {
    case GET_SEARCH_DATA:
      return {
        ...state,
        searchFilterData: payload,
      };

    default:
      return state;
  }
};

export default searchFilter;
