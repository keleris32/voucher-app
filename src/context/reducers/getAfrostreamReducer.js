import { GET_AFROSTREAM_DATA } from '../../constants/actionTypes';

const getAfrostreamReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_AFROSTREAM_DATA:
      return {
        ...state,
        afrostreamData: payload,
      };

    default:
      return state;
  }
};

export default getAfrostreamReducer;
