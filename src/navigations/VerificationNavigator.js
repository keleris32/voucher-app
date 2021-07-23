import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';

import { GlobalContext } from '../context/Provider';
import { DOCUMENTS, PENDING_VERIFICATION } from '../constants/routeNames';
import { Documents, PendingVerification } from '../screens';

// Initialize the stack navigator
const Stack = createStackNavigator();

const VerificationNavigator = () => {
  // getRetailer global state
  const {
    getRetailerState: { retailerData },
  } = useContext(GlobalContext);

  return (
    <Stack.Navigator
      initialRouteName={
        retailerData?.verification_status === 'pending'
          ? PendingVerification
          : Documents
      }
      screenOptions={{ headerShown: false }}>
      {console.log('Inside stack', retailerData.verification_status)}
      <Stack.Screen name={DOCUMENTS} component={Documents} />
      <Stack.Screen
        name={PENDING_VERIFICATION}
        component={PendingVerification}
      />
    </Stack.Navigator>
  );
};

export default VerificationNavigator;
