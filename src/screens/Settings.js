import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { COLORS, FONTS, SIZES } from '../constants';
import logoutRetailer from '../context/actions/auth/logoutRetailer';
import { GlobalContext } from '../context/Provider';
import { ACCOUNT_SETTINGS, CHANGE_PASSWORD } from '../constants/routeNames';

const Settings = ({ navigation }) => {
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
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate(ACCOUNT_SETTINGS)}>
            <View style={[styles.cardWrapper, { marginBottom: wp('7.5%') }]}>
              <View style={styles.cardContainer}>
                <Icons name="user" style={styles.cardIcon} />
                <Text style={styles.cardText}>Account Settings</Text>
              </View>
              <Icon name="chevron-right" style={styles.rightArrowIcon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(CHANGE_PASSWORD)}>
            <View style={styles.cardWrapper}>
              <View style={styles.cardContainer}>
                <Icons name="lock" style={styles.cardIcon} />
                <Text style={styles.cardText}>Change Password</Text>
              </View>
              <Icon name="chevron-right" style={styles.rightArrowIcon} />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogOut}>
          <View style={styles.cardWrapper}>
            <View style={styles.cardContainer}>
              <Icon
                name="logout"
                style={[styles.cardIcon, { color: COLORS.red }]}
              />
              <Text style={[styles.cardText, { color: COLORS.red }]}>
                Log Out
              </Text>
            </View>
            <Icon name="chevron-right" style={styles.rightArrowIcon} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('10%'),
    justifyContent: 'space-between',
    backgroundColor: COLORS.offWhite,
  },

  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    borderWidth: 1,
    borderRadius: SIZES.base,
    borderColor: COLORS.gray,
  },

  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp('5%'),
  },

  cardIcon: {
    fontSize: hp('4%'),
    color: COLORS.acomartBlue2,
  },

  cardText: {
    marginHorizontal: wp('2%'),
    color: COLORS.black,
    ...FONTS.h4,
  },

  rightArrowIcon: {
    fontSize: hp('4.75%'),
    color: COLORS.black,
  },
});
