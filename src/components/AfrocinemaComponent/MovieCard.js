import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.pg}>PG: {props.parentalGuidance}</Text>
        </View>
      </View>
      <Text style={styles.price}>{props.price}</Text>
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
    marginBottom: wp('5%'),
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
    justifyContent: 'space-between',
    paddingVertical: wp('1.25%'),
    marginHorizontal: wp('2.5%'),
  },

  title: {
    ...FONTS.h4,
  },

  price: {
    ...FONTS.h3,
  },
});
