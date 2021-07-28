import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {
  CardField,
  CardFieldInput,
  useStripe,
} from '@stripe/stripe-react-native';

import { COLORS, FONTS, SIZES } from '../../constants';
import axiosInstance from '../../helpers/axiosInterceptor';

const PaymentScreenComponent = () => {
  const [card, setCard] = useState(CardFieldInput.Details | null);
  const { confirmPayment, handleCardAction } = useStripe();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    await axiosInstance
      .post('stripe/get-payment-intent')
      .then(res => {})
      .catch(err => {});
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Hiiiiii from Payments</Text>
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={cardDetails => {
            setCard(cardDetails);
          }}
          onFocus={focusedField => {
            console.log('focusField', focusedField);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreenComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
});
