import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { decode } from 'html-entities';
import NumberFormat from 'react-number-format';

import { GlobalContext } from '../../context/Provider';
import { COLORS, FONTS } from '../../constants';
import CustomButton from '../CustomButton';
import { PAYMENTS } from '../../constants/routeNames';
import axiosInstance from '../../helpers/axiosInterceptor';
import EnvironmentVariables from '../../config/env';
import { GET_RETAILER } from '../../constants/actionTypes';

const AfrocinemaPanelData = ({ bs }) => {
  let navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [refreshState, setRefreshState] = useState(false);
  const [clicked, setClicked] = useState(false);

  const refreshPage = () => {
    setRefreshState(!refreshState);
    setClicked(true);
  };

  // Global state variable for selectedCardData (selectedAfrocinemaData)
  const {
    selectedCardState: { selectedAfrocinemaData },
  } = useContext(GlobalContext);

  const {
    getRetailerDispatch,
    getRetailerState: { retailerData },
  } = useContext(GlobalContext);

  // Initialize a variable and store Global state
  const data = selectedAfrocinemaData;

  // // if (selectedAfrocinemaData.premier.charging_currency_symbol) {
  const symbol = selectedAfrocinemaData?.premier.charging_currency_symbol;
  // // }

  const price = selectedAfrocinemaData.premier.discounted_charging_price;

  // // Decode the HTML code gotten from data to it's appropraite symbol
  const decodedSymbol = decode(symbol);

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

    if (retailerData.email_verified_at) {
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
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Image
              source={{
                uri: data.landscape_image,
              }}
              style={styles.image}
            />
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>{data.title}</Text>
            </View>
            <View style={styles.detailsWrapper}>
              <View style={styles.synopsisContainer}>
                <Text style={styles.synopsis}>
                  <Text style={{ ...FONTS.h4 }}>Synopsis: </Text>
                  {data.synopsis}
                </Text>
              </View>
              <View style={styles.descriptionWrapper}>
                <View style={styles.description}>
                  <Text style={{ ...FONTS.h4 }}>Release year: </Text>
                  <Text style={{ color: COLORS.black, ...FONTS.body4 }}>
                    {data.year_of_release} (
                    <Text style={{ color: COLORS.acomartBlue2 }}>
                      {data.territory_of_origin}
                    </Text>
                    )
                  </Text>
                </View>
                <View style={styles.description}>
                  <Text style={{ ...FONTS.h4 }}>Director: </Text>
                  <Text style={{ color: COLORS.acomartBlue2, ...FONTS.body4 }}>
                    {data.director}
                  </Text>
                </View>
                <View style={styles.description}>
                  <Text style={{ ...FONTS.h4 }}>Language: </Text>
                  <Text style={{ color: COLORS.acomartBlue2, ...FONTS.body4 }}>
                    {data.language}
                  </Text>
                </View>
                <View style={styles.description}>
                  <Text style={{ ...FONTS.h4 }}>PG: </Text>
                  <Text style={{ color: COLORS.acomartBlue2, ...FONTS.body4 }}>
                    {data.parental_guidance_age}
                  </Text>
                </View>
              </View>
              <View style={{ marginBottom: wp('10%') }}>
                {selectedAfrocinemaData.premier.discounted_charging_price && (
                  <NumberFormat
                    value={price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={decodedSymbol}
                    renderText={value => (
                      <CustomButton
                        buttonText={
                          loading ? (
                            <ActivityIndicator
                              color={COLORS.white}
                              size="small"
                            />
                          ) : (
                            value
                          )
                        }
                        onPress={() => proceedToPaymentScreen(bs)}
                      />
                    )}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default AfrocinemaPanelData;

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    alignItems: 'center',
    paddingVertical: wp('5%'),
  },

  wrapper: {
    width: wp('85%'),
    alignItems: 'center',
    paddingHorizontal: wp('2.5%'),
  },

  image: {
    width: wp('70%'),
    height: hp('25%'),
  },

  titleWrapper: {
    width: '100%',
    marginVertical: hp('2.5%'),
  },

  title: {
    textAlign: 'center',
    color: COLORS.black,
    ...FONTS.h3,
  },

  detailsWrapper: {
    width: '100%',
    marginVertical: wp('2.5%'),
  },

  synopsisContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray2,
    backgroundColor: COLORS.lightGray2,
  },

  synopsis: {
    color: COLORS.black,
    ...FONTS.body4,
  },

  descriptionWrapper: {
    marginVertical: wp('2.5%'),
  },

  description: {
    flexDirection: 'row',
    marginBottom: wp('1.25%'),
  },
});

// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// const AfrocinemaPanelData = () => {
//   return (
//     <View>
//       <Text></Text>
//     </View>
//   );
// };

// export default AfrocinemaPanelData;

// const styles = StyleSheet.create({});
