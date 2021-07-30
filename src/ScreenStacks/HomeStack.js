import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Payments } from '../screens';
import { HOME, PAYMENTS } from '../constants/routeNames';

const Stack = createStackNavigator();

{
  /* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */
}

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={HOME}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={HOME} component={Home} />
      <Stack.Screen name={PAYMENTS} component={Payments} />
    </Stack.Navigator>
  );
};

export default HomeStack;
