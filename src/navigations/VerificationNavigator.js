import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { DOCUMENTS } from '../constants/routeNames';
import { Documents } from '../screens';

// Initialize the stack navigator
const Stack = createStackNavigator();

const VerificationNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={DOCUMENTS}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={DOCUMENTS} component={Documents} />
    </Stack.Navigator>
  );
};

export default VerificationNavigator;
