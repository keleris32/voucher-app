import React, { useContext, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Formik } from 'formik';

import { COLORS, FONTS } from '../../constants';
import axiosInstance from '../../helpers/axiosInterceptor';
import { GlobalContext } from '../../context/Provider';
import { CustomButton, CustomInput } from '../../components';
import EnvironmentVariables from '../../config/env';
import CountryModal from '../../components/CountryModal';
import { validationSchema } from './validationSchema';

const PaymentScreenComponent = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    id: '',
    name: 'Select your country',
    code: '0',
  });

  // Stripe public key
  const clientSecret = EnvironmentVariables.STRIPE_PUBLIC_KEY;

  // Global state variable for selectedCard data
  const {
    selectedCardState: {
      isAfrocinemaActive,
      selectedAfrocinemaData,
      selectedAfrostreamData,
    },
  } = useContext(GlobalContext);

  // Global state variable for retailer's data
  const {
    getRetailerState: { retailerData },
  } = useContext(GlobalContext);

  // Fn to request for client secret if the product is from Afrocinema
  const fetchAfrocinemaPayment = async prop => {
    setLoading(true);

    // Create a FormData and append the required fields
    const afrocinemaFormData = new FormData();
    afrocinemaFormData.append('video_id', selectedAfrocinemaData.id);
    afrocinemaFormData.append('payment_purpose', 'afrocinema_premier');
    afrocinemaFormData.append('customer_country_id', selectedCountry.id);
    afrocinemaFormData.append('customer_phone_number', prop);

    var customer;
    var paymentIntent;

    try {
      // Request to get PaymentIntent
      let response = await axiosInstance.post(
        'stripe/get-payment-intent',
        afrocinemaFormData,
      );

      customer = await response.data.data.payment_intent.customer;
      paymentIntent = await response.data.data.payment_intent.client_secret;

      // console.log('cinema first stage done');
      // setLoading(false);
    } catch (error) {
      // console.log('Caught cinema error', error);
      Alert.alert(
        'Error',
        'Please check your internet connection and try again later.',
        [
          {
            text: 'OK',
            onPress: () => {
              setLoading(false);
            },
          },
        ],
      );
      // setLoading(false);
    }

    return { customer, paymentIntent };
  };

  // Fn to request for client secret if the product is from Afrostream
  const fetchAfrostreamPayment = async prop => {
    setLoading(true);

    // Create a FormData and append the required fields
    const afrostreamFormData = new FormData();
    afrostreamFormData.append('plan_id', selectedAfrostreamData.id);
    afrostreamFormData.append('payment_purpose', 'afrostream_subscription');
    afrostreamFormData.append(
      'cancel_subscription_url',
      'https://myafrostream.tv/user',
    );
    afrostreamFormData.append('customer_country_id', selectedCountry.id);
    afrostreamFormData.append('customer_phone_number', prop);

    var customer;
    var paymentIntent;

    try {
      // Request to get PaymentIntent
      let response = await axiosInstance.post(
        'stripe/get-payment-intent',
        afrostreamFormData,
      );

      customer = await response.data.data.payment_intent.customer;
      paymentIntent = await response.data.data.payment_intent.client_secret;

      // console.log('stream first stage done');
    } catch (error) {
      // console.log('Caught stream error', error);
      Alert.alert(
        'Error',
        'Please check your internet connection and try again later.',
        [
          {
            text: 'OK',
            onPress: () => {
              setLoading(false);
            },
          },
        ],
      );
      // setLoading(false);
    }

    return { customer, paymentIntent };
  };

  // Initialize payment with payment Intent details retrieved from the server
  const initializePayment = async prop => {
    // If selected product is an afrocinema_premier, then call fetchAfrocinemaPayment function
    if (isAfrocinemaActive) {
      // fetchAfrocinemaPayment Fn
      const { customer, paymentIntent } = await fetchAfrocinemaPayment(prop);

      // START OF IF STATEMENT
      // ----------------------------------------------->
      // ----------------------------------------------->

      // Start of InitPaymentSheet for Afrocinema
      const { error } = await initPaymentSheet({
        customerId: customer,
        paymentIntentClientSecret: paymentIntent,
      });

      if (error) {
        console.log(error);
      } else {
        // console.log('2nd stage done');
      }

      // END OF IF STATEMENT
      // ----------------------------------------------->
      // ----------------------------------------------->
    } else {
      // fetchAfrostreamPayment Fn
      const { customer, paymentIntent } = await fetchAfrostreamPayment(prop);

      // START OF ELSE STATEMENT
      // ----------------------------------------------->
      // ----------------------------------------------->

      // State of InitPaymentSheet for Afrostream
      const { error } = await initPaymentSheet({
        customerId: customer,
        paymentIntentClientSecret: paymentIntent,
      });

      if (error) {
        console.log(error);
      } else {
        // console.log('2nd stage done');
      }

      // END OF ELSE STATEMENT
      // ----------------------------------------------->
      // ----------------------------------------------->
    }
  };

  const openPaymentSheet = async prop => {
    // InitializePayment Fn
    await initializePayment(prop);

    // console.log('3rd stage');

    const { error } = await presentPaymentSheet({ clientSecret });

    if (error) {
      Alert.alert(error.code, error.message, [
        {
          text: 'OK',
          onPress: () => {
            setLoading(false);
          },
        },
      ]);
    } else {
      Alert.alert('Success', 'Your order has been confirmed!', [
        {
          text: 'OK',
          onPress: () => {
            setLoading(false);
          },
        },
      ]);
    }
  };

  return (
    <Formik
      initialValues={{
        phoneNumber: '',
      }}
      validateOnMount={true}
      onSubmit={values => {
        openPaymentSheet(values.phoneNumber);
      }}
      validationSchema={validationSchema}>
      {props => (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.wrapper}>
              <Text style={styles.title}>Customer's Details</Text>
              <TouchableOpacity
                // disabled={fetchError}
                onPress={() => setIsModalVisible(true)}>
                <CountryModal
                  isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  fetchError={fetchError}
                  setFetchError={setFetchError}
                />
              </TouchableOpacity>
              <View style={{ marginVertical: wp('7.5%') }}>
                <CustomInput
                  placeholder="Phone Number"
                  iconType="phone"
                  selectedCountry={selectedCountry}
                  onChangeText={props.handleChange('phoneNumber')}
                  onBlur={props.handleBlur('phoneNumber')}
                  value={props.values.phoneNumber}
                  errors={props.errors.phoneNumber}
                  touched={props.touched.phoneNumber}
                />

                {/* If this field contains an error and it has been touched, then display the error message */}
                {props.errors.phoneNumber && props.touched.phoneNumber && (
                  <Text style={styles.errors}>{props.errors.phoneNumber}</Text>
                )}

                <CustomButton
                  disabled={loading}
                  buttonText={loading ? 'Processing' : 'Proceed to Checkout'}
                  onPress={props.handleSubmit}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default PaymentScreenComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.offWhite,
  },

  wrapper: {
    width: wp('85%'),
  },

  title: {
    textAlign: 'center',
    marginBottom: wp('15%'),
    ...FONTS.h2,
  },

  errors: {
    color: COLORS.red,
    ...FONTS.body4,
  },
});
