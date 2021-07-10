import React, { createContext, useReducer } from 'react';

import authReducer from './reducers/authReducer';
import authInitialState from './initialStates/authInitialState';

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  return (
    <GlobalContext.Provider value={{ authState, authDispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
