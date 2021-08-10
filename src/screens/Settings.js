import React, { useState, useContext } from 'react';
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
import axiosInstance from '../helpers/axiosInterceptor';

const Settings = ({ navigation }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

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
    setIsUpdating(true);

    try {
      // Document Picker to select a file
      const file = await DocumentPicker.pick({
        // The type of file eligible for selection
        type: [DocumentPicker.types.images],
      });

      console.log(JSON.stringify(file, null, 2));

      // set the result to state
      setSelectedFile(file);
    } catch (err) {
      setSelectedFile(null);

      if (DocumentPicker.isCancel(err)) {
        setIsUpdating(false);
      } else {
        Alert.alert(
          'Error.',
          'Something went wrong. Please check your internet connection and try again!',
        );
      }
    }
  };

  const uploadImage = async () => {
    await selectDocument();

    if (selectedFile !== null) {
      const formData = new FormData();
      formData.append('profile_picture', selectedFile, selectedFile.name);

      axiosInstance
        .post('retailer/profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data;',
          },
        })
        .then(res => {
          Alert.alert(
            'Success.',
            'Your profile picture was successfully updated!',
            [
              {
                text: 'Ok',
                onPress: () => {
                  setIsUpdating(false);
                },
              },
            ],
          );
        })
        .catch(err => {
          Alert.alert(
            'Error.',
            'Something went wrong. Please check your internet connection and try again!',
            [
              {
                text: 'Ok',
                onPress: () => {
                  setIsUpdating(false);
                },
              },
            ],
          );
        });
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
            <TouchableOpacity onPress={() => uploadImage()}>
              <Text style={styles.imageText}>
                {isUpdating ? 'Updating...' : 'Update image'}
              </Text>
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
