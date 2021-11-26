import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import AppNavContainer from './src/navigations';
import GlobalProvider from './src/context/Provider';

{
  /* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */
}

const App = () => {
  console.reportErrorsAsExceptions = false;
  return (
    <GlobalProvider>
      <AppNavContainer>
        <StatusBar style="auto" />
      </AppNavContainer>
    </GlobalProvider>
  );
};

export default App;
