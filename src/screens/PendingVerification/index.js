import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CustomButton } from '../../components';

import { images, COLORS, FONTS } from '../../constants';
import { GET_RETAILER } from '../../constants/actionTypes';
import { GlobalContext } from '../../context/Provider';
import axiosInstance from '../../helpers/axiosInterceptor';

const PendingVerification = () => {
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [refreshState, setRefreshState] = useState(false);

  // function to refresh page
  const refreshPage = () => {
    setLoading(true);
    setRefreshState(!refreshState);
    setClicked(true);
  };

  // retailer global state variable
  const {
    getRetailerDispatch,
    getRetailerState: { retailerData },
  } = useContext(GlobalContext);

  // After data has been fetched, check the verification status of the retailer
  const checkStatus = () => {
    if (retailerData.verification_status !== 'approved') {
      Alert.alert(
        'Pending',
        'You would be notified once the vetting process has been completed',
        [
          {
            text: 'Ok',
            onPress: () => {
              setLoading(false);
              setClicked(false);
            },
          },
        ],
      );
    } else {
      setLoading(false);
      setClicked(false);
    }
  };

  // Get retailer Data and set in global state variable, then if successful, call the
  // checkStatus function
  const getData = async () => {
    await axiosInstance
      .get('retailer/')
      .then(res => {
        getRetailerDispatch({
          type: GET_RETAILER,
          payload: res.data.data.user,
        });

        checkStatus();
      })
      .catch(err => {
        Alert.alert(
          'Error',
          'Please check your internet connection and try again.',
          [
            {
              text: 'Ok',
              onPress: () => {
                setLoading(false);
                setClicked(false);
              },
            },
          ],
        );
      });
  };

  // Only try to fetch Data when refresh button has been clicked (clicked =true)
  useEffect(() => {
    clicked && getData();
  }, [refreshState]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification Status: Pending.</Text>
      <View style={styles.imgWrapper}>
        <Image source={images.pendingVectorImg} style={styles.pendingImage} />
        <Text style={styles.text}>
          You would be notified by our team once the vetting process has been
          completed.
        </Text>
        <View style={{ alignSelf: 'center' }}>
          <Text style={{ ...FONTS.italic4 }}>
            Already verified? Refresh to proceed
          </Text>
          <CustomButton
            buttonText={loading ? 'Processing' : 'Refresh'}
            disabled={loading}
            onPress={refreshPage}
          />
        </View>
      </View>
    </View>
  );
};

export default PendingVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  title: {
    position: 'absolute',
    top: hp('10%'),
    alignSelf: 'center',
    ...FONTS.h2,
  },

  imgWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pendingImage: {
    resizeMode: 'contain',
    width: wp('50%'),
    height: hp('35%'),
  },

  text: {
    width: wp('85%'),
    marginBottom: wp('20%'),
    ...FONTS.h4,
  },
});
