import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS, FONTS } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ErrorMessage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.errorMessage}</Text>
      <TouchableOpacity
        onPress={() =>
          props.setErrorComponent
            ? props.setErrorComponent(false)
            : props.clearAuthState()
        }>
        <Icon name="cancel" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: wp('2.5%'),
    paddingHorizontal: wp('1.5%'),
    backgroundColor: COLORS.red,
    marginBottom: wp('2.5%'),
  },

  text: {
    ...FONTS.h4,
    color: COLORS.white,
  },

  icon: {
    fontSize: hp('2.75%'),
    color: COLORS.white,
  },
});
