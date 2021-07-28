import React from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';

import PaymentScreenComponent from './PaymentScreenComponent.js';
import EnvironmentVariables from '../../config/env.js';

const Payments = () => {
  return (
    <StripeProvider publishableKey={EnvironmentVariables.STRIPE_PUBLIC_KEY}>
      <PaymentScreenComponent />
    </StripeProvider>
  );
};

export default Payments;
