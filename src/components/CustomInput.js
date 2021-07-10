import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { COLORS, FONTS, SIZES } from '../constants';

const CustomInput = ({ iconType, placeholder, ...props }) => {
  let icon;

  if (iconType === 'name') {
    icon = 'user';
  } else if (iconType === 'phone') {
    icon = 'phone';
  } else if (iconType === 'email') {
    icon = 'envelope';
  } else if (iconType === 'password') {
    icon = 'lock';
  }

  return (
    <View
      style={[
        styles.inputContainer,
        {
          borderColor:
            props.errors && props.touched ? COLORS.red : COLORS.black,
        },
      ]}>
      <Icons name={icon} style={styles.icon} />
      <TextInput
        underlineColorAndroid="transparent"
        style={styles.inputField}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        {...props}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.base,
    marginVertical: SIZES.base,
  },

  icon: {
    flex: 0.1,
    fontSize: wp('5%'),
    paddingHorizontal: SIZES.base,
    color: COLORS.black,
  },

  inputField: {
    flex: 1,
    color: COLORS.black,
    ...FONTS.h3,
  },
});
