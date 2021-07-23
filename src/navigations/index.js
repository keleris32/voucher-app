import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import VerificationNavigator from './VerificationNavigator';
import { GlobalContext } from '../context/Provider';
import { ActivityIndicator } from 'react-native';
import axiosInstance from '../helpers/axiosInterceptor';
import { GET_RETAILER } from '../constants/actionTypes';

const AppNavContainer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Auth global state
  const {
    authState: { isLoggedIn },
  } = useContext(GlobalContext);

  // getRetailer global state
  const {
    getRetailerDispatch,
    getRetailerState: { retailerData },
  } = useContext(GlobalContext);

  // An asynchronous function that checks the local storage for the retailer object
  const getRetailer = async () => {
    try {
      const retailer = await AsyncStorage.getItem('retailer');

      // If the object is present, set the authenication state variable to true, else false
      if (retailer) {
        setIsAuthLoading(true);

        // If there's no retailer data stored in the global state, then fetch it from the server
        if (!retailerData) {
          await axiosInstance
            .get('retailer/')
            .then(res => {
              getRetailerDispatch({
                type: GET_RETAILER,
                payload: res.data.data.retailer,
              });
            })
            .catch(err => console.log(err));
        }

        // if the retailer has been logged in, set authentication state to true
        setIsAuthenticated(true);
      } else {
        setIsAuthLoading(true);

        // if the retailer isn't logged in, set authentication state to false
        setIsAuthenticated(false);
      }
    } catch (error) {}
  };

  // Call the getRetailer fn on component mount when the authState, isLoggedIn, changes.
  // If the authState changes, the useEffect hook will call the getRetailer fn to check local storage inorder find out if the retailer is still authenticated.
  useEffect(() => {
    getRetailer();
  }, [isLoggedIn]);

  return (
    <>
      {console.log(isAuthenticated, isLoggedIn)}
      {/* {console.log('retailerData>>', JSON.stringify(retailerData, null, 2))} */}
      {isAuthLoading ? (
        // Navigation Container to house all the navigator components
        <NavigationContainer>
          {/* If the retailer has been authenticated but not verified, then redirect to the Verification Navigator to be verified */}
          {/* Else-if the retailer has been authenticated and also verified, then redirect to the Tab Navigator (Home) */}
          {/* Else redirect the retailer to the AuthNavigator to be authenticated. */}
          {isAuthenticated &&
          retailerData.verification_status !== 'approved' ? (
            <VerificationNavigator />
          ) : isAuthenticated &&
            retailerData.verification_status === 'approved' ? (
            <TabNavigator />
          ) : (
            <AuthNavigator />
          )}
        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default AppNavContainer;
