import React from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';

import PaymentScreenComponent from './PaymentScreenComponent.js';
import EnvironmentVariables from '../../config/env.js';

const Payments = ({ navigation }) => {
  return (
    <StripeProvider publishableKey={EnvironmentVariables.STRIPE_PUBLIC_KEY}>
      <PaymentScreenComponent navigation={navigation} />
    </StripeProvider>
  );
};

export default Payments;
