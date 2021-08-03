import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_LOADING,
} from '../../constants/actionTypes';

const getTransactions = (state, { type, payload }) => {
  switch (type) {
    case GET_TRANSACTIONS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_TRANSACTIONS:
      return {
        ...state,
        transactionsData: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default getTransactions;
