import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_ERROR,
  GET_TRANSACTIONS_LOADING,
} from '../../constants/actionTypes';

const getTransactions = (state, { type, payload }) => {
  switch (type) {
    case GET_TRANSACTIONS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case GET_TRANSACTIONS:
      return {
        ...state,
        transactionsData: payload,
        loading: false,
      };

    case GET_TRANSACTIONS_ERROR:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};

export default getTransactions;
