import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { FONTS, SIZES, COLORS } from '../../constants';

const MovieCard = props => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={{
            uri: props.image,
          }}
          style={styles.image}
        />
        <View style={styles.descriptionWrapper}>
          <Text style={styles.title} numberOfLines={1}>
            {props.title}
          </Text>
          <Text style={styles.pg}>PG: {props.parentalGuidance}</Text>
        </View>
      </View>
      <Text style={styles.price}>
        {'\u0024 '}
        {props.price}
      </Text>
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

  image: {
    width: wp('21.25%'),
    height: wp('21.25%'),
  },

  descriptionWrapper: {
    flex: 0.775,
    justifyContent: 'space-between',
    paddingVertical: wp('2.5%'),
    marginHorizontal: wp('2.5%'),
  },

  title: {
    color: COLORS.acomartBlue2,
    ...FONTS.h3,
  },

  pg: {
    ...FONTS.body4,
  },

  price: {
    color: COLORS.acomartBlue2,
    ...FONTS.h3,
  },
});
