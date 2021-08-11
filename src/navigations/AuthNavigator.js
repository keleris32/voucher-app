import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Login, SignUp, ForgotPassword } from '../screens';
import { LOGIN, SIGN_UP, FORGOT_PASSWORD } from '../constants/routeNames';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={LOGIN}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={SIGN_UP} component={SignUp} />
      <Stack.Screen name={FORGOT_PASSWORD} component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
