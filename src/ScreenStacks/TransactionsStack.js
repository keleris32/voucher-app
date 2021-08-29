import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Transactions } from '../screens';
import { TRANSACTIONS } from '../constants/routeNames';
import { GlobalContext } from '../context/Provider';

const Stack = createStackNavigator();

{
  /* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */
}

const TransactionsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={TRANSACTIONS}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={TRANSACTIONS} component={Transactions} />
    </Stack.Navigator>
  );
};

export default TransactionsStack;
