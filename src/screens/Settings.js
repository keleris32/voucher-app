import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
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
import DocumentPicker from 'react-native-document-picker';

const Settings = ({ navigation }) => {
  // Auth global state variable
  const { authDispatch } = useContext(GlobalContext);

  // retailerData global state variable
  const {
    getRetailerState: { retailerData },
  } = useContext(GlobalContext);

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

  const selectDocument = async () => {
    try {
      // Document Picker to select a file
      const file = await DocumentPicker.pick({
        // The type of file eligible for selection
        type: [DocumentPicker.types.images],
      });

      // set the result to state
      setSelectedFile(file);
    } catch (err) {
      setSelectedFile(null);

      if (DocumentPicker.isCancel(err)) {
        return;
      } else {
        Alert.alert(
          'Error.',
          'Something went wrong. Please check your internet connection and try again!',
        );
      }
    }
  };

  // console.log(JSON.stringify(retailerData, null, 2));

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <View style={{ marginBottom: wp('12.5%') }}>
            <Image
              source={{ uri: retailerData?.profile_picture }}
              style={styles.image}
            />
            <TouchableOpacity onPress={() => selectDocument()}>
              <Text style={styles.imageText}>Update image</Text>
            </TouchableOpacity>
          </View>
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

  image: {
    width: wp('40%'),
    height: wp('40%'),
    borderRadius: wp('20%'),
    alignSelf: 'center',
    marginBottom: wp('2.5%'),
  },

  imageText: {
    alignSelf: 'center',
    color: COLORS.acomartBlue2,
    ...FONTS.h4,
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
