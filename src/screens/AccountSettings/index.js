import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CustomButton } from '../../components';
import { Formik } from 'formik';
import CountryModal from '../../components/CountryModal';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { COLORS, SIZES, FONTS } from '../../constants';
import { GlobalContext } from '../../context/Provider';
import axiosInstance from '../../helpers/axiosInterceptor';
import { accountSettingsValidationSchema } from './validationSchema';
import EnvironmentVariables from '../../config/env';
import ErrorMessage from '../../components/ErrorMessage';
import { GET_RETAILER } from '../../constants/actionTypes';

const AccountSettings = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [countryLoading, setCountryLoading] = useState(false);
  const [newCountryData, setNewCountryData] = useState();
  const [fetchError, setFetchError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorComponent, setErrorComponent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Retailer global state variable
  const {
    getRetailerDispatch,
    getRetailerState: { retailerData },
  } = useContext(GlobalContext);

  // Selected country state variable
  const [selectedCountry, setSelectedCountry] = useState({
    id: retailerData.country_id,
    name: 'Select your country',
    code: '0',
  });

  const updateRetailerProfile = formData => {
    setLoading(true);
    errorMessage && setErrorMessage('');
    errorComponent && setErrorComponent(false);

    // Upload form
    const data = new FormData();
    data.append('first_name', formData.firstName);
    data.append('last_name', formData.lastName);
    data.append('email', formData.email);
    data.append('phone_number', formData.phoneNumber);
    data.append('country_id', selectedCountry.id);
    data.append('callbackUrl', EnvironmentVariables.EMAIL_CALLBACK_URL);
    data.append('_method', 'PATCH');

    axiosInstance
      .post('retailer', data)
      .then(res => {
        getRetailerDispatch({
          type: GET_RETAILER,
          payload: res.data.data.user,
        });
        Alert.alert('Success', 'Your Profile was updated successfully', [
          {
            text: 'OK',
            onPress: () => {
              setLoading(false);
              setErrorComponent(false);
            },
          },
        ]);
      })
      .catch(err => {
        // Set state to display an error message for network error and form error
        if (err.message === 'Network Error') {
          setErrorComponent(true);
          setLoading(false);
        } else {
          setErrorMessage(err?.response?.data?.errors);
          setLoading(false);
        }
      });
  };

  const fetchCountries = async () => {
    let newData = [];
    setCountryLoading(true);

    await axiosInstance
      .get('countries')
      .then(res => {
        newData = res.data.data.countries.filter(
          country => country.id === retailerData.country_id,
        );

        setNewCountryData(newData[0].name);
      })
      .catch(err => {})
      .finally(() => setCountryLoading(false));
  };

  const checkForEmail = formProp => {
    // Check if the previous email is different from the new one
    if (retailerData.email !== formProp.email) {
      // Give a warning if the email has been changed and call the update fn if the user goes ahead
      Alert.alert(
        'Warning',
        'Please note that you would be required to verify your new email address',
        [
          {
            text: 'Cancel',
            onPress: () => {},
          },
          {
            text: 'Proceed',
            onPress: () => updateRetailerProfile(formProp),
          },
        ],
      );
    } else {
      // If the email isnt different, call the update fn straightaway
      updateRetailerProfile(formProp);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <Formik
      initialValues={{
        firstName: retailerData.first_name,
        lastName: retailerData.last_name,
        email: retailerData.email,
        phoneNumber: retailerData.phone_number,
      }}
      validateOnMount={true}
      onSubmit={values => checkForEmail(values)}
      validationSchema={accountSettingsValidationSchema}>
      {props => (
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={true}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <View style={styles.container}>
            <View style={styles.headerWrapper}>
              <TouchableOpacity
                style={styles.iconCon}
                onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" style={styles.leftArrowIcon} />
              </TouchableOpacity>
              <Text style={styles.title}>Account Settings</Text>
            </View>

            {countryLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={COLORS.acomartBlue2} size="large" />
              </View>
            ) : (
              <View style={styles.wrapper}>
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
                    newCountryData={newCountryData}
                  />
                </TouchableOpacity>
                {/* If the field is not valid, display an error */}
                {errorMessage?.country_id && (
                  <Text style={styles.errorMessage}>
                    Please select your country
                  </Text>
                )}
                <View style={styles.formContainer}>
                  <View style={{ marginBottom: SIZES.radius }}>
                    <Text style={styles.label}>First Name</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.inputField}
                        placeholder={retailerData?.first_name}
                        underlineColorAndroid="transparent"
                        placeholderTextColor={COLORS.gray}
                        onChangeText={props.handleChange('firstName')}
                        onBlur={props.handleBlur('firstName')}
                        value={props.values.firstName}
                        errors={props.errors.firstName}
                        touched={props.touched.firstName}
                      />
                    </View>

                    {/* If the field is not valid, display an error */}
                    {errorMessage?.first_name && (
                      <Text style={styles.errorMessage}>
                        {errorMessage?.first_name}
                      </Text>
                    )}
                  </View>
                  <View style={{ marginBottom: SIZES.radius }}>
                    <Text style={styles.label}>Last Name</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.inputField}
                        placeholder={retailerData?.last_name}
                        underlineColorAndroid="transparent"
                        placeholderTextColor={COLORS.gray}
                        onChangeText={props.handleChange('lastName')}
                        onBlur={props.handleBlur('lastName')}
                        value={props.values.lastName}
                        errors={props.errors.lastName}
                        touched={props.touched.lastName}
                      />
                    </View>

                    {/* If the field is not valid, display an error */}
                    {errorMessage?.last_name && (
                      <Text style={styles.errorMessage}>
                        {errorMessage?.last_name}
                      </Text>
                    )}
                  </View>
                  <View style={{ marginBottom: SIZES.radius }}>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.inputField}
                        placeholder={retailerData?.email}
                        keyboardType="email-address"
                        underlineColorAndroid="transparent"
                        placeholderTextColor={COLORS.gray}
                        onChangeText={props.handleChange('email')}
                        onBlur={props.handleBlur('email')}
                        value={props.values.email.trim()}
                        errors={props.errors.email}
                        touched={props.touched.email}
                      />
                    </View>

                    {errorMessage?.email && (
                      <Text style={styles.errorMessage}>
                        {errorMessage?.email}
                      </Text>
                    )}
                  </View>
                  <View style={{ marginBottom: SIZES.radius }}>
                    <Text style={styles.label}>Phone Number</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.inputField}
                        placeholder={retailerData?.phone_number}
                        keyboardType="phone-pad"
                        underlineColorAndroid="transparent"
                        placeholderTextColor={COLORS.gray}
                        onChangeText={props.handleChange('phoneNumber')}
                        onBlur={props.handleBlur('phoneNumber')}
                        value={props.values.phoneNumber.trim()}
                        errors={props.errors.phoneNumber}
                        touched={props.touched.phoneNumber}
                      />
                    </View>

                    {errorMessage?.phone_number &&
                      !errorMessage?.country_id && (
                        <Text style={styles.errorMessage}>
                          {errorMessage?.phone_number}
                        </Text>
                      )}
                  </View>
                  <CustomButton
                    buttonText={loading ? 'Updating' : 'Update Profile'}
                    disabled={loading}
                    onPress={props.handleSubmit}
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
    paddingVertical: wp('10%'),
    alignItems: 'center',
  },

  headerWrapper: {
    width: '100%',
    flexDirection: 'row',
  },

  iconCon: {
    transform: [{ translateX: wp('2.5%') }],
  },

  leftArrowIcon: {
    paddingTop: Platform.OS === 'ios' ? wp('6.5%') : 0,
    fontSize: hp('4.75%'),
    color: COLORS.black,
  },

  title: {
    flex: 1,
    // paddingVertical: 5,
    paddingTop: Platform.OS === 'ios' ? wp('7.5%') : 0,
    marginBottom: wp('12.5%'),
    textAlign: 'center',
    marginRight: wp('5%'),
    ...FONTS.h2,
  },

  wrapper: {
    width: wp('85%'),
  },

  formContainer: {
    marginTop: SIZES.radius,
    marginBottom: SIZES.margin,
  },

  label: {
    color: COLORS.black,
    ...FONTS.h4,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.radius / 2,
    paddingVertical: Platform.OS === 'ios' ? SIZES.base : 0,
    marginVertical: SIZES.base,
  },

  inputField: {
    flex: 1,
    color: COLORS.black,
    ...FONTS.h3,
  },

  errors: {
    color: COLORS.red,
    ...FONTS.body4,
  },

  errorMessage: {
    marginBottom: SIZES.radius,
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
