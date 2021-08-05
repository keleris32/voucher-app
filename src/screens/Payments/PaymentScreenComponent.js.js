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

  const fetchAfrocinemaPayment = async prop => {
    setLoading(true);

    // Create a FormData and append the required fields
    const afrocinemaFormData = new FormData();
    afrocinemaFormData.append('video_id', selectedAfrocinemaData.id);
    afrocinemaFormData.append('payment_purpose', 'afrocinema_premier');
    afrocinemaFormData.append('customer_country_id', selectedCountry.id);
    afrocinemaFormData.append('customer_phone_number', prop);

    // Send a request to get the client secret and customer Id and set them to the initPaymentSheet
    await axiosInstance
      .post('stripe/get-payment-intent', afrocinemaFormData)
      .then(res => {
        console.log('omo e go oooo>>>', JSON.stringify(res.data, null, 2));
        setLoading(false);
        initPaymentSheet({
          customerId: res.data.data.payment_intent.customer,
          paymentIntentClientSecret: res.data.data.payment_intent.client_secret,
        });
      })
      .catch(err => {
        console.log('err>>>>>>', err);
        setLoading(false);
      });
  };

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

    // Send a request to get the client secret and customer Id and set them to the initPaymentSheet
    await axiosInstance
      .post('stripe/get-payment-intent', afrostreamFormData)
      .then(res => {
        console.log('omo e go oooo>>>', JSON.stringify(res.data, null, 2));
        setLoading(false);
        initPaymentSheet({
          customerId: res.data.data.payment_intent.customer,
          paymentIntentClientSecret: res.data.data.payment_intent.client_secret,
        });
      })
      .catch(err => {
        console.log('err>>>>>>', err);
        setLoading(false);
      });
  };

  const openPaymentSheet = async prop => {
    // if the selected product is afrocinema, then await the fetchAfrocinema fn, else await fetchAfrostream fn
    if (isAfrocinemaActive) {
      await fetchAfrocinemaPayment(prop);
    } else {
      await fetchAfrostreamPayment(prop);
    }

    await presentPaymentSheet({ clientSecret })
      .then(res => {
        Alert.alert('Success', 'Your order has been confirmed!', [
          {
            text: 'OK',
            onPress: () => {
              setLoading(false);
            },
          },
        ]);
      })
      .catch(error => {
        Alert.alert(error.code, error.message, [
          {
            text: 'OK',
            onPress: () => {
              setLoading(false);
            },
          },
        ]);
      });

    // const { error } = await presentPaymentSheet({ clientSecret });

    // if (error) {
    //   Alert.alert(error.code, error.message, [
    //     {
    //       text: 'OK',
    //       onPress: () => {
    //         setLoading(false);
    //       },
    //     },
    //   ]);
    // } else {
    //   Alert.alert('Success', 'Your order has been confirmed!', [
    //     {
    //       text: 'OK',
    //       onPress: () => {
    //         setLoading(false);
    //       },
    //     },
    //   ]);
    // }

    console.log('omo the thing just pass me');
  };

  return (
    <Formik
      initialValues={{
        phoneNumber: '',
      }}
      validateOnMount={true}
      onSubmit={values => {
        // console.log(values, selectedCountry.id)
        // setGivenPhoneNumber(values.phoneNumber);
        openPaymentSheet(values.phoneNumber);
        // simpleFetch();
      }}
      validationSchema={validationSchema}>
      {props => (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.wrapper}>
              <Text style={styles.title}>Customer's Details</Text>
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
