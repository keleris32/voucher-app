import React, { createContext, useReducer, useState } from 'react';

import authReducer from './reducers/authReducer';
import authInitialState from './initialStates/authInitialState';
import countryDataInitialState from './initialStates/countryDataInitialState';
import { countryDataReducer } from './reducers/countryDataReducer';

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [countryData, setCountryData] = useReducer(
    countryDataReducer,
    countryDataInitialState,
  );

  return (
    <GlobalContext.Provider
      value={{ authState, authDispatch, countryData, setCountryData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
