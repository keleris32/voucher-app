import React, { useContext, useState, useEffect, createRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Value } from 'react-native-reanimated';

import { COLORS, FONTS } from '../../constants';
import axiosInstance from '../../helpers/axiosInterceptor';
import { GlobalContext } from '../../context/Provider';
import { CustomButton, CustomInput, RadioButtonComp } from '../../components';
import EnvironmentVariables from '../../config/env';
import CountryModal from '../../components/CountryModal';
import { validationSchema } from './validationSchema';
import ErrorMessage from '../../components/ErrorMessage';
import ErrorPageComponent from '../../components/ErrorPageComponent';
import PaystackWebView from './Paystack/PaystackWebview';
import { AfrocinemaFormData } from './Paystack/AfrocinemaFormData';
import { AfrostreamFormData } from './Paystack/AfrostreamFormData';

const PaymentScreenComponent = ({ navigation }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [fetchGatewayLoading, setFetchGatewayLoading] = useState(false);
  const [fetchGatewayError, setFetchGatewayError] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState([]);
  const [errorComponent, setErrorComponent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fetchError, setFetchError] = useState(false);
  const [isPaymentChecked, setIsPaymentChecked] = useState({
    stripe: false,
    paystack: false,
  });
  // const [isPaymentChecked, setIsPaymentChecked] = useState();
  const [processPaystack, setProcessPaystack] = useState(false);
  const [paystackAuthorizationUrl, setPaystackAuthorizationUrl] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    id: '',
    name: 'Select your country',
    code: '0',
  });
  const [refresh, setRefresh] = useState(false);

  const refreshComp = () => setRefresh(!refresh);

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

  // ------------------------------------------------------- >
  // Animations

  const bs = createRef();
  const fall = new Value(1);

  // ------------------------------------------------------- >

  const fetchPaymentGateways = async () => {
    setFetchGatewayLoading(true);
    setFetchGatewayError(false);

    var paymentGateways;

    await axiosInstance
      .get('payment-gateways?appName=ACOMART RETAIL')
      .then(res => {
        paymentGateways = res.data.data.payment_gateways;

        if (paymentGateways[0].name === 'Stripe') {
          setIsPaymentChecked({
            stripe: true,
            paystack: false,
          });
        } else if (paymentGateways[0].name === 'Paystack') {
          setIsPaymentChecked({
            stripe: false,
            paystack: true,
          });
        }
        setPaymentGateway(paymentGateways);
      })
      .catch(err => setFetchGatewayError(true))
      .finally(() => setFetchGatewayLoading(false));
  };

  // Fn to request for client secret if the product is from Afrocinema
  const fetchAfrocinemaPayment = async prop => {
    setLoading(true);
    errorMessage && setErrorMessage('');
    errorComponent && setErrorComponent(false);

    // Create a FormData and append the required fields
    const afrocinemaFormData = new FormData();
    afrocinemaFormData.append('video_id', selectedAfrocinemaData.id);
    afrocinemaFormData.append('payment_purpose', 'afrocinema_premier');
    afrocinemaFormData.append('is_retailer', '1');
    afrocinemaFormData.append('customer_country_id', selectedCountry.id);
    afrocinemaFormData.append('customer_email', prop);

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

      // End of Try ---->>
      // ------>>
    } catch (error) {
      // Set state to display an errorComponent for network error or errorMessage for form error
      if (error.message === 'Network Error') {
        setErrorComponent(true);
        setLoading(false);
      } else {
        setErrorMessage(error?.response?.data?.errors);
        setLoading(false);
      }

      // End of Catch ---->>
      // ------>>
    }

    return { customer, paymentIntent };
  };

  // Fn to request for client secret if the product is from Afrostream
  const fetchAfrostreamPayment = async prop => {
    setLoading(true);
    errorMessage && setErrorMessage('');
    errorComponent && setErrorComponent(false);

    // Create a FormData and append the required fields
    const afrostreamFormData = new FormData();
    afrostreamFormData.append('plan_id', selectedAfrostreamData.id);
    afrostreamFormData.append('payment_purpose', 'afrostream_subscription');
    afrostreamFormData.append(
      'cancel_subscription_url',
      'https://myafrostream.tv/user',
    );
    afrostreamFormData.append('is_retailer', '1');
    afrostreamFormData.append('customer_country_id', selectedCountry.id);
    afrostreamFormData.append('customer_email', prop);

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

      // End of Try ---->>
      // ------>>
    } catch (error) {
      // Set state to display an errorComponent for network error or errorMessage for form error
      if (error.message === 'Network Error') {
        setErrorComponent(true);
        setLoading(false);
      } else {
        setErrorMessage(error?.response?.data?.errors);
        setLoading(false);
      }

      // End of Catch ---->>
      // ------>>
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
        Alert.alert(
          'Something went wrong',
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
      } else {
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
        Alert.alert(
          'Something went wrong',
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
      } else {
      }

      // END OF ELSE STATEMENT
      // ----------------------------------------------->
      // ----------------------------------------------->
    }
  };

  const PaystackPayment = async customerEmail => {
    setLoading(true);

    if (isAfrocinemaActive) {
      // ----- Start of IF::> Afrocinema ---------->

      const { paystackFormData } = await AfrocinemaFormData([
        selectedAfrocinemaData.id,
        selectedCountry.id,
        customerEmail,
      ]);

      try {
        let response = await axiosInstance.post(
          'paystack/get-payment-intent',
          paystackFormData,
        );

        setPaystackAuthorizationUrl(
          response.data.data.payment_intent.authorization_url,
        );

        setProcessPaystack(true);
      } catch (error) {
        Alert.alert(
          'Something went wrong',
          'Please check your internet connection and try again later.',
        );
      } finally {
        setLoading(false);
      }

      // ----- End of IF::> Afrocinema ---------->
    } else {
      // ----- Start of ELSE::> Afrostream ---------->

      const { paystackFormData } = await AfrostreamFormData([
        selectedAfrostreamData.id,
        selectedCountry.id,
        customerEmail,
      ]);

      try {
        let response = await axiosInstance.post(
          'paystack/get-payment-intent',
          paystackFormData,
        );

        setPaystackAuthorizationUrl(
          response.data.data.payment_intent.authorization_url,
        );

        setProcessPaystack(true);
      } catch (error) {
        Alert.alert(
          'Something went wrong',
          'Please check your internet connection and try again later.',
        );
      } finally {
        setLoading(false);
      }

      // ----- End of ELSE::> Afrostream ---------->
    }
  };

  const openPaymentSheet = async prop => {
    // InitializePayment Fn
    await initializePayment(prop);

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

  const closePaystackWebview = () => setProcessPaystack(false);

  const paymentMethodHandler = email => {
    // Check if Stripe payment gateway has been selected then proceed
    isPaymentChecked.stripe && openPaymentSheet(email);

    // Check if Paystack payment gateway has been selected then proceed
    isPaymentChecked.paystack && PaystackPayment(email);
  };

  useEffect(() => {
    fetchPaymentGateways();
  }, [refresh]);

  return (
    <>
      <Formik
        initialValues={{
          email: '',
        }}
        validateOnMount={true}
        onSubmit={values => {
          paymentMethodHandler(values.email);
        }}
        validationSchema={validationSchema}>
        {props => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={true}
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            <SafeAreaView style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.container}
                onPress={closePaystackWebview}
                activeOpacity={1}>
                {/* <View style={styles.container}> */}
                <View style={styles.headerWrapper}>
                  <TouchableOpacity
                    style={styles.iconCon}
                    onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" style={styles.leftArrowIcon} />
                  </TouchableOpacity>
                  <Text style={styles.screenTitle}>Checkout</Text>
                </View>

                {fetchGatewayError ? (
                  <ErrorPageComponent
                    text="Ops! Please check your internet connection and try again."
                    refreshComp={refreshComp}
                  />
                ) : fetchGatewayLoading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator
                      color={COLORS.acomartBlue2}
                      size="large"
                    />
                  </View>
                ) : (
                  <View style={styles.wrapper}>
                    <Text style={styles.title}>
                      Fill in the customer's Details
                    </Text>
                    {errorComponent && (
                      <ErrorMessage
                        errorMessage="Please check your internet connection!"
                        setErrorComponent={setErrorComponent}
                      />
                    )}
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

                    {/* Display error message from server */}
                    {errorMessage?.customer_country_id && (
                      <Text style={styles.errorMessage}>
                        Please select a country
                      </Text>
                    )}
                    <View style={{ marginVertical: wp('5%') }}>
                      <CustomInput
                        placeholder="Email"
                        iconType="email"
                        keyboardType="email"
                        // selectedCountry={selectedCountry}
                        onChangeText={props.handleChange('email')}
                        onBlur={props.handleBlur('email')}
                        value={props.values.email.trim()}
                        errors={props.errors.email}
                        touched={props.touched.email}
                      />

                      {/* If this field contains an error and it has been touched, then display the error message */}
                      {props.errors.email && props.touched.email && (
                        <Text style={styles.errorMessage}>
                          {props.errors.email}
                        </Text>
                      )}

                      <View style={{ paddingVertical: wp('2.5%') }}>
                        {paymentGateway?.map((gateway, index) => (
                          <View key={gateway.id}>
                            <RadioButtonComp
                              data={gateway}
                              isPaymentChecked={isPaymentChecked}
                              setIsPaymentChecked={setIsPaymentChecked}
                              index={index}
                            />
                          </View>
                        ))}
                      </View>

                      <CustomButton
                        disabled={loading}
                        buttonText={loading ? 'Processing' : 'Proceed'}
                        onPress={props.handleSubmit}
                      />
                    </View>
                  </View>
                )}
                {/* </View> */}
              </TouchableOpacity>
            </SafeAreaView>
          </ScrollView>
        )}
      </Formik>
      {processPaystack && (
        <PaystackWebView
          authorization_url={paystackAuthorizationUrl}
          navigation={navigation}
          setProcessPaystack={setProcessPaystack}
        />
      )}
    </>
  );
};

export default PaymentScreenComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: wp('10%'),
    backgroundColor: COLORS.offWhite,
  },

  headerWrapper: {
    width: '100%',
    flexDirection: 'row',
  },

  iconCon: {
    transform: [{ translateX: wp('2.5%') }],
  },

  leftArrowIcon: {
    fontSize: hp('4.75%'),
    color: COLORS.black,
  },

  screenTitle: {
    flex: 1,
    marginBottom: wp('10%'),
    textAlign: 'center',
    marginRight: wp('5%'),
    ...FONTS.h2,
  },

  wrapper: {
    width: wp('85%'),
    marginVertical: wp('7.5%'),
  },

  title: {
    textAlign: 'center',
    marginBottom: wp('10%'),
    ...FONTS.h3,
  },

  errors: {
    color: COLORS.red,
    ...FONTS.body4,
  },

  errorMessage: {
    // marginBottom: SIZES.radius,
    color: COLORS.red,
    ...FONTS.h4,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
