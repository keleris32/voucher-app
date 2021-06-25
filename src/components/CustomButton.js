import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS, FONTS, SIZES} from '../constants';

const CustomButton = ({buttonText, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
    ...FONTS.h3,
  },

  button: {
    alignItems: 'center',
    marginVertical: SIZES.padding,
    paddingVertical: SIZES.font,
    backgroundColor: COLORS.red,
    borderRadius: SIZES.base,
  },
});
