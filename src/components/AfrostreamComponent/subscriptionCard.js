import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { decode } from 'html-entities';
import NumberFormat from 'react-number-format';

import { FONTS, COLORS } from '../../constants';

const SubscriptionCard = props => {
  // Decode the HTML code gotten from data to it's appropraite symbol
  const decodedSymbol = decode(props?.symbol);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{props?.name}</Text>
        <Text style={styles.device}>Device limit: {props?.deviceLimit}</Text>
      </View>
      <View>
        <NumberFormat
          value={props?.discountedPrice}
          displayType={'text'}
          thousandSeparator={true}
          prefix={decodedSymbol}
          renderText={value => <Text style={styles.price}>{value}</Text>}
        />
        <NumberFormat
          value={props?.chargingPrice}
          displayType={'text'}
          thousandSeparator={true}
          prefix={decodedSymbol}
          renderText={value => <Text style={styles.fakePrice}>{value}</Text>}
        />
      </View>
    </View>
  );
};

export default SubscriptionCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('2.5%'),
    paddingVertical: wp('5%'),
    // marginBottom: wp('10%'),
    // borderWidth: 1,
    // borderColor: COLORS.gray,
    // borderRadius: SIZES.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },

  title: {
    ...FONTS.h2,
    // paddingVertical: 3.5,
    marginBottom: wp('1.25%'),
    color: COLORS.acomartBlue2,
  },

  device: {
    ...FONTS.body4,
  },

  price: {
    color: COLORS.acomartBlue2,
    marginBottom: wp('1.25%'),
    ...FONTS.h4,
  },

  fakePrice: {
    color: COLORS.gray,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    ...FONTS.body4,
  },
});
