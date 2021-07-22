import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import { GlobalContext } from '../context/Provider';
import { ActivityIndicator } from 'react-native';
import getRetailer from '../context/actions/getRetailer/getRetailer';
import axiosInstance from '../helpers/axiosInterceptor';
import { GET_RETAILER } from '../constants/actionTypes';
import VerificationNavigator from './VerificationNavigator';

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
        // getRetailer()(getRetailerDispatch);

        await axiosInstance
          .get('retailer/')
          .then(res => {
            getRetailerDispatch({
              type: GET_RETAILER,
              payload: res.data.data.retailer,
            });
          })
          .catch(err => console.log(err));

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
      {console.log('retailerData>>', JSON.stringify(retailerData, null, 2))}
      {isAuthLoading ? (
        <NavigationContainer>
          {isAuthenticated &&
          retailerData.verification_status === 'approved' ? (
            <TabNavigator />
          ) : (
            <AuthNavigator />
          )}
          {/* {isLoggedIn || isAuthenticated ? <TabNavigator /> : <AuthNavigator />} */}
        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default AppNavContainer;
