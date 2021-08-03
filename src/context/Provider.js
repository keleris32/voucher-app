import React, { createContext, useReducer, useState } from 'react';

import authReducer from './reducers/authReducer';
import authInitialState from './initialStates/authInitialState';
import getRetailerReducer from './reducers/getRetailerReducer';
import getRetailerInitialState from './initialStates/getRetailerInitialState';
import getAfrocinemaReducer from './reducers/getAfrocinemaReducer';
import getAfrocinemaInitialState from './initialStates/getAfrocinemaInitialState';
import getAfrostreamReducer from './reducers/getAfrostreamReducer';
import getAfrostreamInitialState from './initialStates/getAfrostreamInitialState';
import selectedCardReducer from './reducers/selectedCardReducer';
import selectedCardInitialState from './initialStates/selectedCardInititalState';
import getTransactions from './reducers/getTransactions';
import getTransactionsInitialState from './initialStates/getTransactionsInitialState';
import searchFilter from './reducers/searchFilter';
import searchFilterInitialState from './initialStates/searchFilterInitialState';

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  // Auth global state
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  // Retailer's data global state
  const [getRetailerState, getRetailerDispatch] = useReducer(
    getRetailerReducer,
    getRetailerInitialState,
  );

  // Afrocinema's data global state
  const [getAfrocinemaState, getAfrocinemaDispatch] = useReducer(
    getAfrocinemaReducer,
    getAfrocinemaInitialState,
  );

  // Afrostream's data global state
  const [getAfrostreamState, getAfrostreamDispatch] = useReducer(
    getAfrostreamReducer,
    getAfrostreamInitialState,
  );

  // Selected card global state
  const [selectedCardState, selectedCardDispatch] = useReducer(
    selectedCardReducer,
    selectedCardInitialState,
  );

  // Transactions data global state
  const [getTransactionsState, getTransactionsDispatch] = useReducer(
    getTransactions,
    getTransactionsInitialState,
  );

  // Search bar global state
  const [searchState, searchDispatch] = useReducer(
    searchFilter,
    searchFilterInitialState,
  );

  return (
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
        getRetailerState,
        getRetailerDispatch,
        getAfrocinemaState,
        getAfrocinemaDispatch,
        getAfrostreamState,
        getAfrostreamDispatch,
        selectedCardState,
        selectedCardDispatch,
        getTransactionsState,
        getTransactionsDispatch,
        searchState,
        searchDispatch,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
