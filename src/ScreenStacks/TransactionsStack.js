import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Transactions } from '../screens';
import { TRANSACTIONS } from '../constants/routeNames';
import axiosInstance from '../helpers/axiosInterceptor';
import { GlobalContext } from '../context/Provider';
import {
  GET_SEARCH_DATA,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_LOADING,
} from '../constants/actionTypes';

const Stack = createStackNavigator();

{
  /* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */
}

const TransactionsStack = () => {
  // Transactions data global state variable
  const { getTransactionsDispatch } = useContext(GlobalContext);

  // Search Filter global state variable
  const { searchDispatch } = useContext(GlobalContext);

  // get transactions data from api
  // const getTransactionsData = async () => {
  //   getTransactionsDispatch({
  //     type: GET_TRANSACTIONS_LOADING,
  //   });

  //   await axiosInstance
  //     .get('retailer/payment-transactions?include=model')
  //     .then(res => {
  //       getTransactionsDispatch({
  //         type: GET_TRANSACTIONS,
  //         payload: res.data.data.payment_transactions,
  //       });
  //       searchDispatch({
  //         type: GET_SEARCH_DATA,
  //         payload: res.data.data.payment_transactions,
  //       });
  //       console.log('Transaction Stack>>', JSON.stringify(res.data, null, 2));
  //     })
  //     .catch(err => {
  //       console.log('Transaction Stack>>', JSON.stringify(err, null, 2));
  //     });
  // };

  // useEffect(() => {
  //   getTransactionsData();
  // }, []);

  return (
    <Stack.Navigator
      initialRouteName={TRANSACTIONS}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={TRANSACTIONS} component={Transactions} />
    </Stack.Navigator>
  );
};

export default TransactionsStack;
