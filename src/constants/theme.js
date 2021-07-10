import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const COLORS = {
  white: '#fff',
  white2: '#F9F9F9',
  black: '#020202',
  blue: '#4096FE',
  acomartBlue: '#1b2e4b',
  red: '#F20012',
  gray: '#777777',
  gray2: '#C8C4C4',
  lightGray: '#F5F6FB',
  lightGray2: '#F8F8F8',
  backDrop: 'rgba(0,0,0,0.4)',
  lightBackDrop: 'rgba(0,0,0,0.1)',
};
export const SIZES = {
  // global sizes
  base: wp('2%'),
  radius: wp('3.5%'),
  font: wp('4%'),
  padding: wp('6.5%'),
  margin: wp('7.5%'),

  // font sizes
  largeTitle: wp('10%'),
  h1: wp('7.5%'),
  h2: wp('6%'),
  h3: wp('4.5%'),
  h4: wp('4%'),
  body1: wp('7.5%'),
  body2: wp('6%'),
  body3: wp('4.5%'),
  body4: wp('4%'),
  body5: wp('3.5%'),

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: { fontFamily: 'Raleway-Black', fontSize: SIZES.largeTitle },
  h1: { fontFamily: 'Raleway-Black', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'Raleway-Bold', fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: 'Raleway-Bold', fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: 'Raleway-Bold', fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: 'Raleway-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Raleway-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Raleway-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Raleway-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'Raleway-Regular',
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
