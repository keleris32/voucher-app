import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './src/navigations/TabNavigator';
import {
  Transactions,
  Payments,
  Settings,
  AccountSettings,
  ChangePassword,
} from '../screens';
import {
  HOME,
  TRANSACTIONS,
  PAYMENTS,
  SETTINGS,
  ACCOUNT_SETTINGS,
  CHANGE_PASSWORD,
} from '../constants/routeNames';

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
      <Stack.Screen name={SETTINGS} component={} />
      <Stack.Screen name={ACCOUNT_SETTINGS} component={AccountSettings} />
      <Stack.Screen name={CHANGE_PASSWORD} component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
