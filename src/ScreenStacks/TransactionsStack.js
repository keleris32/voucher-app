import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Transactions } from '../screens';
import { TRANSACTIONS } from '../constants/routeNames';
import axiosInstance from '../helpers/axiosInterceptor';
import { GlobalContext } from '../context/Provider';
import { GET_TRANSACTIONS } from '../constants/actionTypes';

const Stack = createStackNavigator();

{
  /* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */
}

const TransactionsStack = () => {
  // Transactions data global state variable
  const { getTransactionsDispatch } = useContext(GlobalContext);

  // get transactions data from api
  const getTransactionsData = async () => {
    await axiosInstance
      .get('retailer/payment-transactions')
      .then(res => {
        getTransactionsDispatch({
          type: GET_TRANSACTIONS,
          payload: res.data.data.payment_transactions,
        });
      })
      .catch(err => {
        console.log('Transaction Stack>>', JSON.stringify(err, null, 2));
      });
  };

  useEffect(() => {
    getTransactionsData();
  }, []);

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
