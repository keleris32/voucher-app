import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { COLORS, FONTS, SIZES } from '../constants';

const CustomButton = ({ buttonText, onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: disabled ? COLORS.gray2 : COLORS.acomartBlue2 },
      ]}>
      {disabled && (
        <ActivityIndicator color={COLORS.acomartBlue2} size="large" />
      )}
      <Text style={[styles.text, { marginLeft: disabled ? wp('2.5%') : null }]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  text: {
    // paddingVertical: 12.5,
    color: COLORS.white,
    ...FONTS.h3,
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SIZES.padding,
    paddingVertical: SIZES.font,
    borderRadius: SIZES.base,
  },
});
