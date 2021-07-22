import React, { createContext, useReducer, useState } from 'react';

import authReducer from './reducers/authReducer';
import authInitialState from './initialStates/authInitialState';
import getRetailerReducer from './reducers/getRetailerReducer';
import getRetailerInitialState from './initialStates/getRetailerInitialState';

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [getRetailerState, getRetailerDispatch] = useReducer(
    getRetailerReducer,
    getRetailerInitialState,
  );

  return (
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
        getRetailerState,
        getRetailerDispatch,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
