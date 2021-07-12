import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
      {iconType === 'phone' ? (
        <View style={styles.phoneContainter}>
          <Text style={styles.phoneText}>{props.selectedCountry.code}</Text>
        </View>
      ) : (
        <Icons name={icon} style={styles.icon} />
      )}
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
    // paddingHorizontal: SIZES.base,
    paddingRight: SIZES.base,
    marginVertical: SIZES.base,
  },

  icon: {
    flex: 0.1,
    fontSize: wp('5%'),
    paddingRight: SIZES.base,
    paddingLeft: SIZES.base * 2,
    color: COLORS.black,
  },

  inputField: {
    flex: 1,
    color: COLORS.black,
    ...FONTS.h3,
  },

  phoneContainter: {
    height: '100%',
    // alignItems: 'center',
    marginRight: SIZES.base * 1.5,
    borderTopLeftRadius: SIZES.base,
    borderBottomLeftRadius: SIZES.base,
    backgroundColor: COLORS.acomartBlue,
  },

  phoneText: {
    position: 'relative',
    marginTop: '20%',
    paddingHorizontal: SIZES.base * 1.5,
    color: COLORS.white,
    ...FONTS.h3,
  },
});
