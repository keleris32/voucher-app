import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import { GlobalContext } from '../context/Provider';
import { ActivityIndicator } from 'react-native';

const AppNavContainer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const {
    authState: { isLoggedIn },
  } = useContext(GlobalContext);

  // An asynchronous function that checks the local storage for the retailer object
  const getRetailer = async () => {
    try {
      const retailer = await AsyncStorage.getItem('retailer');

      // If the object is present, set the authenication state variable to true, else false
      if (retailer) {
        setIsAuthLoading(true);

        setIsAuthenticated(true);
      } else {
        setIsAuthLoading(true);

        setIsAuthenticated(false);
      }
    } catch (error) {}
  };

  // Call the getRetailer fn on component mount and when the authState, isLoggedIn, changes.
  // If the authState changes, the useEffect hook will call the getRetailer fn to check local storage to find out if the retailer is still authenticated.
  useEffect(() => {
    getRetailer();
  }, [isLoggedIn]);

  return (
    <>
      {console.log(isAuthenticated, isLoggedIn)}
      {isAuthLoading ? (
        <NavigationContainer>
          {isLoggedIn || isAuthenticated ? <TabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default AppNavContainer;
