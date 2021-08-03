import { GET_TRANSACTIONS } from '../../constants/actionTypes';

const getTransactions = (state, { type, payload }) => {
  switch (type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactionsData: payload,
      };

    default:
      return state;
  }
};

export default getTransactions;
