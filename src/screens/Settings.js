import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { COLORS, FONTS, SIZES } from '../constants';
import logoutRetailer from '../context/actions/auth/logoutRetailer';
import { GlobalContext } from '../context/Provider';

const Settings = () => {
  const { authDispatch } = useContext(GlobalContext);

  const handleLogOut = () => {
    Alert.alert('Log Out!', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Confirm',
        onPress: () => {
          logoutRetailer()(authDispatch);
        },
      },
    ]);
  };

  return (
    <View style={{ padding: wp('5%') }}>
      <TouchableOpacity onPress={handleLogOut}>
        <View style={styles.container}>
          <View style={styles.logOutContainer}>
            <Icon name="logout" style={styles.logOutIcon} />
            <Text style={styles.logOutText}>Log Out</Text>
          </View>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    borderWidth: 1,
    borderRadius: SIZES.base,
  },

  logOutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp('5%'),
  },

  logOutIcon: {
    fontSize: hp('4.75%'),
    color: COLORS.red,
  },

  logOutText: {
    marginHorizontal: wp('2%'),
    color: COLORS.red,
    ...FONTS.h4,
  },

  rightArrowIcon: {
    fontSize: hp('4.75%'),
    color: COLORS.black,
  },
});
