import React, { createContext, useReducer, useState } from 'react';

import authReducer from './reducers/authReducer';
import authInitialState from './initialStates/authInitialState';
import getRetailerReducer from './reducers/getRetailerReducer';
import getRetailerInitialState from './initialStates/getRetailerInitialState';
import getAfrocinemaReducer from './reducers/getAfrocinemaReducer';
import getAfrocinemaInitialState from './initialStates/getAfrocinemaInitialState';
import getAfrostreamReducer from './reducers/getAfrostreamReducer';
import getAfrostreamInitialState from './initialStates/getAfrostreamInitialState';

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
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
