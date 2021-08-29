import React, { useState, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Formik } from 'formik';

import { images, icons, COLORS, FONTS, SIZES } from '../../constants';
import { CustomInput, CustomButton } from '../../components';
import { LOGIN } from '../../constants/routeNames';
import { signUpValidationSchema } from './validationSchema';
import registerRetailer, {
  clearAuthState,
} from '../../context/actions/auth/registerRetailer';
import { GlobalContext } from '../../context/Provider';
import CountryModal from '../../components/CountryModal';
import EnvironmentVariables from '../../config/env';
import ErrorMessage from '../../components/ErrorMessage';

const SignUp = ({ navigation }) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordConfirmHidden, setIsPasswordConfirmHidden] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    id: '',
    name: 'Select your country',
    code: '0',
  });

  // Auth state global variable
  const {
    authDispatch,
    authState: { signUpError, signUpLoading, data },
  } = useContext(GlobalContext);

  // Clear Auth State
  const clearLoginState = () => {
    clearAuthState()(authDispatch);
  };

  // Return a callback dispatch function to clear the authentication state on component unMount
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (data || signUpError) {
          clearAuthState()(authDispatch);
        }
      };
    }, [data, signUpError]),
  );

  const submitRegistration = formData => {
    // Update the country_id with data from the selectedCountry state variable
    formData.country_id = selectedCountry.id;

    // If the form is valid, then the form's values are dispatched to the server
    registerRetailer(formData)(authDispatch);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        country_id: '',
        callbackUrl: EnvironmentVariables.EMAIL_CALLBACK_URL,
        registration_channel: 'mobile',
      }}
      validateOnMount={true}
      onSubmit={values => {
        submitRegistration(values);
      }}
      validationSchema={signUpValidationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={true}>
            <ImageBackground source={images.loginBg} style={styles.bgImage}>
              <Image source={icons.fullAcomart} style={styles.logo} />
              <View style={styles.formContainer}>
                {/* If the app fails to fetch data from the server, then this error message will be displayed */}
                {signUpError?.message === 'Network Error' && (
                  <ErrorMessage
                    errorMessage="Please check your internet connection!"
                    clearAuthState={clearLoginState}
                  />
                )}

                <TouchableOpacity
                  // disabled={fetchError}
                  onPress={() => setIsModalVisible(true)}>
                  <CountryModal
                    // isModalVisible={fetchError ? false : isModalVisible}
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    fetchError={fetchError}
                    setFetchError={setFetchError}
                  />
                </TouchableOpacity>
                {signUpError?.errors?.country_id && (
                  <Text style={styles.errors}>Please select your country</Text>
                )}

                <CustomInput
                  placeholder="First Name"
                  iconType="name"
                  keyboardType="default"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  errors={errors.firstName}
                  touched={touched.firstName}
                />
                {/* If the field has been touched and it's not valid, display an error */}
                {errors.firstName && touched.firstName && (
                  <Text style={styles.errors}>{errors.firstName}</Text>
                )}

                <CustomInput
                  placeholder="Last Name"
                  iconType="name"
                  keyboardType="default"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  errors={errors.lastName}
                  touched={touched.lastName}
                />
                {/* If the field has been touched and it's not valid, display an error */}
                {errors.lastName && touched.lastName && (
                  <Text style={styles.errors}>{errors.lastName}</Text>
                )}

                <CustomInput
                  placeholder="Phone Number"
                  iconType="phone"
                  keyboardType="phone"
                  selectedCountry={selectedCountry}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber.trim()}
                  errors={errors.phoneNumber}
                  touched={touched.phoneNumber}
                />
                {/* If the field has been touched and it's not valid, display an error */}
                {/* {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={styles.errors}>{errors.phoneNumber}</Text>
                )} */}
                {signUpError?.errors?.phone_number && (
                  <Text style={styles.errors}>
                    {signUpError?.errors?.phone_number}
                  </Text>
                )}

                <CustomInput
                  placeholder="Email"
                  iconType="email"
                  keyboardType="email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email.trim()}
                  errors={errors.email}
                  touched={touched.email}
                />
                {/* If the field has been touched and it's not valid, display an error */}
                {/* {errors.email && touched.email && (
                  <Text style={styles.errors}>{errors.email}</Text>
                )} */}
                {signUpError?.errors?.email && (
                  <Text style={styles.errors}>
                    {signUpError?.errors?.email}
                  </Text>
                )}

                <CustomInput
                  placeholder="Password"
                  iconType="password"
                  keyboardType="default"
                  secureTextEntry={isPasswordHidden}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  errors={errors.password}
                  touched={touched.password}
                  isPasswordHidden={isPasswordHidden}
                  setIsPasswordHidden={setIsPasswordHidden}
                />
                {/* If the field has been touched and it's not valid, display an error */}
                {errors.password && touched.password && (
                  <Text style={styles.errors}>{errors.password}</Text>
                )}

                <CustomInput
                  placeholder="Confirm Password"
                  iconType="passwordConfirm"
                  keyboardType="default"
                  secureTextEntry={isPasswordConfirmHidden}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  errors={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  isPasswordConfirmHidden={isPasswordConfirmHidden}
                  setIsPasswordConfirmHidden={setIsPasswordConfirmHidden}
                />
                {/* If the field has been touched and it's not valid, display an error */}
                {!signUpError?.errors?.password &&
                  errors.confirmPassword &&
                  touched.confirmPassword && (
                    <Text style={styles.errors}>{errors.confirmPassword}</Text>
                  )}
                {signUpError?.errors?.password && (
                  <Text style={styles.errors}>
                    {signUpError?.errors?.password}
                  </Text>
                )}

                <CustomButton
                  buttonText={signUpLoading ? 'Registering' : 'Sign Up'}
                  disabled={signUpLoading}
                  onPress={handleSubmit}
                />
                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity onPress={() => navigation.replace(LOGIN)}>
                    <Text style={styles.signUpText}>Log In!</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bgImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    // paddingVertical: wp('1.25%'),
  },

  logo: {
    resizeMode: 'contain',
    width: wp('200%'),
    height: hp('12.5%'),
    alignSelf: 'center',
    marginTop: SIZES.padding,
  },

  formContainer: {
    width: wp('80%'),
    marginTop: SIZES.largeTitle,
    marginBottom: wp('25%'),
  },

  input: {
    borderWidth: 1,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.base,
    marginVertical: SIZES.base,
    color: COLORS.black,
    ...FONTS.h3,
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  registerText: {
    ...FONTS.h4,
  },

  signUpText: {
    paddingHorizontal: SIZES.base / 2,
    color: COLORS.blue,
    ...FONTS.h4,
  },

  errors: {
    marginBottom: SIZES.radius,
    color: COLORS.red,
    ...FONTS.h4,
  },

  invalidErrorMessage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.margin,
    marginBottom: SIZES.radius,
    backgroundColor: COLORS.red,
    borderRadius: SIZES.base / 2,
  },

  invalidErrorText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
});
