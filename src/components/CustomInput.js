import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import PasswordIcon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { COLORS, FONTS, SIZES } from '../constants';

const CustomInput = ({ iconType, placeholder, keyboardType, ...props }) => {
  let icon;
  let keyboard;

  if (iconType === 'name') {
    icon = 'user';
  } else if (iconType === 'phone') {
    icon = 'phone';
  } else if (iconType === 'email') {
    icon = 'envelope';
  } else if (iconType === 'password') {
    icon = 'lock';
  } else if (iconType === 'passwordConfirm') {
    icon = 'lock';
  } else if (iconType === 'loginPassword') {
    icon = 'lock';
  }

  if (keyboardType === 'phone') {
    keyboard = 'phone-pad';
  } else if (keyboardType === 'email') {
    keyboard = 'email-address';
  } else {
    keyboard = 'default';
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
          <Text
            style={[
              styles.phoneText,
              {
                marginTop:
                  props.selectedCountry.name === 'Select your country'
                    ? '30%'
                    : '20%',
              },
            ]}>
            {props.selectedCountry.code}
          </Text>
        </View>
      ) : (
        <Icons name={icon} style={styles.icon} />
      )}
      <TextInput
        underlineColorAndroid="transparent"
        keyboardType={keyboard}
        style={styles.inputField}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        {...props}
      />
      {iconType === 'password' && (
        <TouchableOpacity
          onPress={() => props.setIsPasswordHidden(!props.isPasswordHidden)}>
          <PasswordIcon
            name={props.isPasswordHidden ? 'eye' : 'eye-off'}
            style={styles.passwordIcon}
          />
        </TouchableOpacity>
      )}
      {iconType === 'passwordConfirm' && (
        <TouchableOpacity
          onPress={() =>
            props.setIsPasswordConfirmHidden(!props.isPasswordConfirmHidden)
          }>
          <PasswordIcon
            name={props.isPasswordConfirmHidden ? 'eye' : 'eye-off'}
            style={styles.passwordIcon}
          />
        </TouchableOpacity>
      )}

      {iconType === 'loginPassword' && (
        <TouchableOpacity
          onPress={() =>
            props.setIsLoginPasswordHidden(!props.isLoginPasswordHidden)
          }>
          <PasswordIcon
            name={props.isLoginPasswordHidden ? 'eye' : 'eye-off'}
            style={styles.passwordIcon}
          />
        </TouchableOpacity>
      )}
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
    marginRight: SIZES.base * 1.5,
    borderTopLeftRadius: SIZES.base,
    borderBottomLeftRadius: SIZES.base,
    backgroundColor: COLORS.acomartBlue2,
  },

  phoneText: {
    position: 'relative',
    paddingHorizontal: SIZES.base * 1.5,
    color: COLORS.white,
    ...FONTS.h3,
  },

  passwordIcon: {
    fontSize: wp('5%'),
    color: COLORS.black,
  },
});
