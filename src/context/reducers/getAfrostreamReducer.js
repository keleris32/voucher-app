import {
  GET_AFROSTREAM_DATA,
  GET_AFROSTREAM_LOADING,
} from '../../constants/actionTypes';

const getAfrostreamReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_AFROSTREAM_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_AFROSTREAM_DATA:
      return {
        ...state,
        afrostreamData: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default getAfrostreamReducer;
