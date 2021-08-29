import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { decode } from 'html-entities';
import NumberFormat from 'react-number-format';

import { GlobalContext } from '../../context/Provider';
import { COLORS, FONTS, SIZES } from '../../constants';
import CustomButton from '../CustomButton';
import { PAYMENTS } from '../../constants/routeNames';
import axiosInstance from '../../helpers/axiosInterceptor';
import EnvironmentVariables from '../../config/env';
import { GET_RETAILER } from '../../constants/actionTypes';

const AfrostreamPanelData = ({ bs }) => {
  let navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [refreshState, setRefreshState] = useState(false);
  const [clicked, setClicked] = useState(false);

  const refreshPage = () => {
    setRefreshState(!refreshState);
    setClicked(true);
  };

  // Global state variable for selectedCardData (selectedAfrostreamData)
  const {
    selectedCardState: { selectedAfrostreamData },
  } = useContext(GlobalContext);

  const {
    getRetailerDispatch,
    getRetailerState: { retailerData },
  } = useContext(GlobalContext);

  // Initialize a variable and store Global state
  const data = selectedAfrostreamData;

  // Decode the HTML code gotten from data to it's appropraite symbol
  const decodedSymbol = decode(data.charging_currency_symbol);

  var no_of_days;

  if (data.duration_in_days > 1) {
    no_of_days = 'days';
  } else {
    no_of_days = 'day';
  }

  // Fetch new retailer data
  const getRefreshData = async () => {
    await axiosInstance
      .get('retailer/')
      .then(res => {
        getRetailerDispatch({
          type: GET_RETAILER,
          payload: res.data.data.user,
        });

        Alert.alert('Success', 'Your information is now up to date!');
      })
      .catch(err => {
        Alert.alert(
          'Error.',
          'Something went wrong. Please check your internet connection and try again later.',
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Resend email verification
  const resendEmailVerification = () => {
    axiosInstance
      .get('retailer/auth/email/resend-verification', {
        params: {
          callbackUrl: EnvironmentVariables.EMAIL_CALLBACK_URL,
        },
      })
      .then(res =>
        Alert.alert('', 'Email verification was sent successfully!', [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ]),
      )
      .catch(err =>
        Alert.alert(
          'Error',
          'Please check your internet connection and try again!',
          [
            {
              text: 'Ok',
              onPress: () => {},
            },
          ],
        ),
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const proceedToPaymentScreen = async () => {
    setLoading(true);

    if (retailerData?.email_verified_at) {
      // Close bottom sheet
      bs.current.snapTo(1);

      // Navigate to Payment Screen
      navigation.navigate(PAYMENTS);

      setLoading(false);
    } else {
      // Alert pop-up with email verification link
      Alert.alert(
        'Verify your email',
        'Please verify your email before proceeding! Refresh if you have already verified',
        [
          {
            text: 'Resend verification',
            onPress: () => {
              resendEmailVerification();
            },
          },
          {
            text: 'Refresh',
            onPress: () => {
              refreshPage();
            },
          },
        ],
      );
    }
  };

  // Only try to fetch Data when refresh button has been clicked (clicked =true)
  useEffect(() => {
    clicked && getRefreshData();
  }, [refreshState]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{data.name}</Text>
          </View>
          <View style={styles.detailsWrapper}>
            <View style={styles.description}>
              <Text style={{ ...FONTS.h4 }}>Device Limit: </Text>
              <Text style={{ color: COLORS.acomartBlue2, ...FONTS.body4 }}>
                {data.device_limit}
              </Text>
            </View>
            <View style={styles.description}>
              <Text style={{ ...FONTS.h4 }}>Duration: </Text>
              <Text style={{ color: COLORS.acomartBlue2, ...FONTS.body4 }}>
                {data.duration_in_days} {no_of_days}
              </Text>
            </View>
            <View style={{ marginTop: wp('15%') }}>
              <NumberFormat
                value={data.discounted_charging_price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={decodedSymbol}
                renderText={value => (
                  <CustomButton
                    buttonText={
                      loading ? (
                        <ActivityIndicator color={COLORS.white} size="small" />
                      ) : (
                        value
                      )
                    }
                    onPress={() => proceedToPaymentScreen(bs)}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AfrostreamPanelData;

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    alignItems: 'center',
    paddingVertical: wp('10%'),
  },

  wrapper: {
    width: wp('85%'),
    alignItems: 'center',
    paddingHorizontal: wp('2.5%'),
  },

  titleContainer: {
    width: wp('70%'),
    height: hp('17.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZES.base,
    borderColor: COLORS.gray2,
    backgroundColor: COLORS.lightGray2,
  },

  title: {
    color: COLORS.black,
    ...FONTS.h1,
  },

  detailsWrapper: {
    width: '100%',
    marginVertical: wp('10%'),
  },

  description: {
    flexDirection: 'row',
    marginBottom: wp('2.5%'),
  },
});
