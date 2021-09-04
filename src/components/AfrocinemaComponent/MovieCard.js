import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { decode } from 'html-entities';
import NumberFormat from 'react-number-format';

import { FONTS, SIZES, COLORS } from '../../constants';

const MovieCard = props => {
  // Decode the HTML code gotten from data to it's appropraite symbol
  const decodedSymbol = decode(props.symbol);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.title} numberOfLines={1}>
            {props.title}
          </Text>
          <Text style={styles.pg}>PG: {props.parentalGuidance}</Text>
        </View>
      </View>

      <View>
        <NumberFormat
          value={props.discountedPrice}
          displayType={'text'}
          thousandSeparator={true}
          prefix={decodedSymbol}
          renderText={value => <Text style={styles.price}>{value}</Text>}
        />
        <NumberFormat
          value={props.chargingPrice}
          displayType={'text'}
          thousandSeparator={true}
          prefix={decodedSymbol}
          renderText={value => <Text style={styles.fakePrice}>{value}</Text>}
        />
      </View>
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: wp('2.5%'),
    paddingLeft: wp('1.25%'),
    paddingRight: wp('2.5%'),
    marginBottom: wp('7.5%'),
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.base,
  },

  wrapper: {
    flexDirection: 'row',
  },

  descriptionWrapper: {
    flex: 0.75,
    height: wp('21.25%'),
    justifyContent: 'space-between',
    paddingVertical: wp('2.5%'),
    marginHorizontal: wp('2.5%'),
  },

  title: {
    // paddingVertical: 3.5,
    color: COLORS.acomartBlue2,
    ...FONTS.h3,
  },

  pg: {
    ...FONTS.body4,
    color: COLORS.black,
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
