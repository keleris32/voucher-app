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
  Alert,
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
  const {
    authDispatch,
    authState: { error, loading, data },
  } = useContext(GlobalContext);

  // Return a callback dispatch function to clear the authentication state on component unMount
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (data || error) {
          clearAuthState()(authDispatch);
        }
      };
    }, [data, error]),
  );

  const submitRegistration = formData => {
    // Update the country_id with data from the selectedCountry state variable
    formData.country_id = selectedCountry.id;

    // If the form is valid, then the form's values are dispatched to the server
    registerRetailer(formData)(authDispatch);
  };
  // console.log('Sign up error>>>>>', JSON.stringify(error, null, 2));

  return (
    <Formik
      initialValues={{
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        country_id: '',
        callbackUrl: EnvironmentVariables.EMAIL_CALLBACK_URL,
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
              {/* <TouchableOpacity
                onPress={() => navigation.replace('SplashScreen')}> */}
              <Image source={icons.fullAcomart} style={styles.logo} />
              {/* </TouchableOpacity> */}
              <View style={styles.formContainer}>
                {/* If the app fails to fetch data from the server, then this error message will be displayed */}
                {error?.message === 'Network Error' && (
                  <View style={styles.invalidErrorMessage}>
                    <Text style={styles.invalidErrorText}>
                      Please check your internet connection
                    </Text>
                  </View>
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
                {error?.errors?.country_id && (
                  <Text style={styles.errors}>Please select your country</Text>
                )}

                <CustomInput
                  placeholder="Full Name"
                  iconType="name"
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                  errors={errors.fullName}
                  touched={touched.fullName}
                />
                {/* If the field has been touched and it's not valid, display an error */}
                {errors.fullName && touched.fullName && (
                  <Text style={styles.errors}>{errors.fullName}</Text>
                )}

                <CustomInput
                  placeholder="Phone Number"
                  iconType="phone"
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
                {error?.errors?.phone_number && (
                  <Text style={styles.errors}>
                    {error?.errors?.phone_number}
                  </Text>
                )}

                <CustomInput
                  placeholder="Email"
                  iconType="email"
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
                {error?.errors?.email && (
                  <Text style={styles.errors}>{error?.errors?.email}</Text>
                )}

                <CustomInput
                  placeholder="Password"
                  iconType="password"
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
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.errors}>{errors.confirmPassword}</Text>
                )}
                {error?.errors?.password && (
                  <Text style={styles.errors}>{error?.errors?.password}</Text>
                )}

                <CustomButton
                  buttonText={loading ? 'Registering' : 'Sign Up'}
                  disabled={loading}
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
