import React, { createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';

import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import { GlobalContext } from '../context/Provider';

const AppNavContainer = () => {
  const {
    authState: { isLoggedIn },
  } = useContext(GlobalContext);

  //   console.log('isLoggedin is >>>>>>', isLoggedIn);
  return (
    <NavigationContainer>
      {isLoggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavContainer;
