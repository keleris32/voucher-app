import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  CardField,
  CardFieldInput,
  useStripe,
} from '@stripe/stripe-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Formik } from 'formik';

import { COLORS, FONTS, SIZES } from '../../constants';
import axiosInstance from '../../helpers/axiosInterceptor';
import { GlobalContext } from '../../context/Provider';
import { CustomButton, CustomInput } from '../../components';
import EnvironmentVariables from '../../config/env';
import CountryModal from '../../components/CountryModal';
import { validationSchema } from './validationSchema';

const PaymentScreenComponent = () => {
  const [card, setCard] = useState(CardFieldInput.Details | null);
  const { confirmPayment, handleCardAction } = useStripe();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [givenPhoneNumber, setGivenPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({
    id: '',
    name: 'Select your country',
    code: '0',
  });

  const clientSecret = EnvironmentVariables.STRIPE_PUBLIC_KEY;

  // Global state variable for selectedCard data
  const {
    selectedCardState: {
      isAfrocinemaActive,
      selectedAfrocinemaData,
      selectedAfrostreamData,
    },
  } = useContext(GlobalContext);

  const getClientSecret = async () => {
    if (isAfrocinemaActive) {
      const formData = new FormData();
      formData.append('video_id', selectedAfrocinemaData.id);
      formData.append('payment_purpose', 'afrocinema_premier');
      formData.append('customer_country_id', selectedCountry.id);
      formData.append('customer_phone_number', givenPhoneNumber);

      try {
        let response = await axiosInstance.post(
          'stripe/get-payment-intent',
          formData,
        );

        // =-------------------------------->
        // =---------------------------------->

        const { error } = await initPaymentSheet({
          customerId: response.data.data.payment_intent.customer,
          paymentIntentClientSecret:
            response.data.data.payment_intent.client_secret,
        });

        if (!error) {
          setLoading(true);
        } else {
          console.log('initPayment error>>', error);
        }

        // =-------------------------------->
        // =---------------------------------->
      } catch (error) {
        console.log('Afrocinema', error);
      }
      // ---------- End of If ---------------->
    } else {
      const formData = new FormData();
      formData.append('plan_id', selectedAfrostreamData.id);
      formData.append('payment_purpose', 'afrostream_subscription');
      formData.append(
        'cancel_subscription_url',
        'https://myafrostream.tv/user',
      );
      formData.append('customer_country_id', selectedCountry.id);
      formData.append('customer_phone_number', givenPhoneNumber);

      // console.log('Afrostream', givenPhoneNumber);

      try {
        let response = await axiosInstance.post(
          'stripe/get-payment-intent',
          formData,
        );

        // =-------------------------------->
        // =---------------------------------->

        const { error } = await initPaymentSheet({
          customerId: response.data.data.payment_intent.customer,
          paymentIntentClientSecret:
            response.data.data.payment_intent.client_secret,
        });

        if (!error) {
          setLoading(true);
        } else {
          console.log('initPayment error>>', error);
        }

        // =-------------------------------->
        // =---------------------------------->
      } catch (error) {
        console.log('Afrostream', error);
      }

      // ---------------- End of Else ------------------>
    }
  };

  const openPaymentSheet = async () => {
    await getClientSecret();

    const { error } = await presentPaymentSheet({ clientSecret });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!', [
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
        // console.log(values, selectedCountry.id)
        setGivenPhoneNumber(values.phoneNumber);
        openPaymentSheet();
      }}
      validationSchema={validationSchema}>
      {props => (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.wrapper}>
              <Text>Hiiiiii from Payments</Text>
              <TouchableOpacity
                disabled={fetchError}
                onPress={() => setIsModalVisible(true)}>
                <CountryModal
                  isModalVisible={fetchError ? false : isModalVisible}
                  setIsModalVisible={setIsModalVisible}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  fetchError={fetchError}
                  setFetchError={setFetchError}
                />
              </TouchableOpacity>
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
                buttonText="Proceed to Checkout"
                onPress={props.handleSubmit}
              />
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

  errors: {
    color: COLORS.red,
    ...FONTS.body4,
  },
});

{
  /* <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            // flexDirection: 'column',
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            // flexDirection: 'column',
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={cardDetails => {
            setCard(cardDetails);
          }}
          onFocus={focusedField => {
            console.log('focusField', focusedField);
          }}
        /> */
}
