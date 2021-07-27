import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { FONTS, SIZES, COLORS } from '../../constants';

const SubscriptionCard = props => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.device}>Device limit: {props.deviceLimit}</Text>
      </View>
      <Text style={styles.price}>
        {'\u0024 '}
        {props.price}
      </Text>
    </View>
  );
};

export default SubscriptionCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('5%'),
    marginBottom: wp('10%'),
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.base,
  },

  title: {
    ...FONTS.h2,
    marginBottom: wp('1.25%'),
    color: COLORS.acomartBlue,
  },

  device: {
    ...FONTS.body4,
  },

  price: {
    ...FONTS.h3,
    color: COLORS.acomartBlue,
  },
});
