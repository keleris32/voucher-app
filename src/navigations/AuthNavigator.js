import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  SplashScreen,
  Login,
  SignUp,
  ForgotPassword,
  Documents,
} from '../screens';
import {
  SPLASH_SCREEN,
  LOGIN,
  SIGN_UP,
  FORGOT_PASSWORD,
  DOCUMENTS,
} from '../constants/routeNames';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={SPLASH_SCREEN}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={SIGN_UP} component={SignUp} />
      <Stack.Screen name={FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={DOCUMENTS} component={Documents} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
