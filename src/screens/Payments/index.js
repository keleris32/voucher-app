import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';

import PaymentScreenComponent from './PaymentScreenComponent.js';
import EnvironmentVariables from '../../config/env.js';

const Payments = () => {
  const publishableKey = 'pk_test_znClE06SB5Mp0pC5wpaykgaw00fVnXlwaT';
  return (
    <StripeProvider publishableKey={publishableKey}>
      <PaymentScreenComponent />
    </StripeProvider>
  );
};

export default Payments;

const styles = StyleSheet.create({});
