import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/MaterialIcons';

import { COLORS, icons, SIZES } from '../../constants';

const RadioButtonComp = ({
  data,
  isPaymentChecked,
  setIsPaymentChecked,
  index,
}) => {
  const gatewayBool = Object.values(isPaymentChecked);

  const radioButtonHandler = gateway => {
    if (gateway === 'Stripe') {
      setIsPaymentChecked({
        stripe: true,
        opay: false,
        paystack: false,
      });
    } else if (gateway === 'Paystack') {
      setIsPaymentChecked({
        stripe: false,
        opay: false,
        paystack: true,
      });
    } else if (gateway === 'Flutterwave') {
      setIsPaymentChecked({
        stripe: false,
        opay: true,
        paystack: false,
      });
    }
  };
  var icon;

  if (data.name === 'Stripe') {
    icon = icons.stripe;
  } else if (data.name === 'Flutterwave') {
    icon = icons.opay;
  } else if (data.name === 'Paystack') {
    icon = icons.paystack;
  }

  const iconName = data.name;

  return (
    <View style={styles.container}>
      {gatewayBool[index] === true ? (
        <>
          <TouchableOpacity
            style={styles.radioBtn}
            activeOpacity={0.8}
            onPress={() => radioButtonHandler(data.name)}>
            <Icons name="radio-button-on" style={styles.radioIcon} />
            <Text style={styles.text}>Pay with </Text>
            <Image
              source={icon}
              style={[
                styles.paymentLogo,
                {
                  width: iconName === 'Stripe' ? wp('15%') : wp('15%'),
                },
              ]}
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.radioBtn}
            activeOpacity={0.8}
            onPress={() => radioButtonHandler(data.name)}>
            <Icons name="radio-button-off" style={styles.radioIcon} />
            <Text style={styles.text}>Pay with</Text>
            <Image
              source={icon}
              style={[
                styles.paymentLogo,
                {
                  width: iconName === 'Stripe' ? wp('15%') : wp('15%'), //35 for paystack
                },
              ]}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default RadioButtonComp;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: wp('2.5%'),
  },

  radioIcon: {
    fontSize: wp('7.5%'),
    paddingRight: SIZES.base,
    color: COLORS.acomartBlue2,
  },

  radioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  paymentLogo: {
    height: wp('12.5%'),
    resizeMode: 'contain',
  },

  text: {
    paddingRight: wp('2.5%'),
  },
});
