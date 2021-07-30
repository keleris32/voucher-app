import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Settings, AccountSettings, ChangePassword } from '../screens';
import {
  SETTINGS,
  ACCOUNT_SETTINGS,
  CHANGE_PASSWORD,
} from '../constants/routeNames';

const Stack = createStackNavigator();

{
  /* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */
}

const SettingsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SETTINGS}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SETTINGS} component={Settings} />
      <Stack.Screen name={ACCOUNT_SETTINGS} component={AccountSettings} />
      <Stack.Screen name={CHANGE_PASSWORD} component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
