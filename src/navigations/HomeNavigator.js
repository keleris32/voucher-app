import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './src/navigations/TabNavigator';
import { Transactions, Payments } from '../screens';
import { HOME, TRANSACTIONS, PAYMENTS } from '../constants/routeNames';

const Stack = createStackNavigator();

{
  /* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */
}

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={HOME}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={HOME} component={TabNavigator} />
      <Stack.Screen name={TRANSACTIONS} component={Transactions} />
      <Stack.Screen name={PAYMENTS} component={Payments} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
