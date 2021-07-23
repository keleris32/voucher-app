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

const SignUp = ({ navigation }) => {
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
          <ImageBackground source={images.loginBg} style={styles.bgImage}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical={true}>
              <TouchableOpacity
                onPress={() => navigation.replace('SplashScreen')}>
                <Image source={icons.redAcomart} style={styles.logo} />
              </TouchableOpacity>
              <View style={styles.formContainer}>
                {/* Display an error message, if the form's data is deemed invalid by the server */}
                {error?.errors && (
                  <View style={styles.invalidErrorMessage}>
                    <Text style={styles.invalidErrorText}>
                      Invalid credentials provided!
                    </Text>
                  </View>
                )}

                {/* If the app fails to fetch data from the server, then this error message will be displayed */}
                {(fetchError || error?.networkError) && (
                  <View style={styles.invalidErrorMessage}>
                    <Text style={styles.invalidErrorText}>
                      Please check your internet connection
                    </Text>
                  </View>
                )}

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
                  value={values.phoneNumber}
                  errors={errors.phoneNumber}
                  touched={touched.phoneNumber}
                />
                {/* If the field has been touched and it's not valid, display an error */}
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={styles.errors}>{errors.phoneNumber}</Text>
                )}

                <CustomInput
                  placeholder="Email"
                  iconType="email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  errors={errors.email}
                  touched={touched.email}
                />
                {/* If the field has been touched and it's not valid, display an error */}
                {errors.email && touched.email && (
                  <Text style={styles.errors}>{errors.email}</Text>
                )}

                <CustomInput
                  placeholder="Password"
                  iconType="password"
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  errors={errors.password}
                  touched={touched.password}
                />
                {/* If the field has been touched and it's not valid, display an error */}
                {errors.password && touched.password && (
                  <Text style={styles.errors}>{errors.password}</Text>
                )}

                <CustomInput
                  placeholder="Confirm Password"
                  iconType="password"
                  secureTextEntry={true}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  errors={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />
                {/* If the field has been touched and it's not valid, display an error */}
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.errors}>{errors.confirmPassword}</Text>
                )}

                <CustomButton
                  buttonText="Sign Up"
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
            </ScrollView>
          </ImageBackground>
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
  },

  logo: {
    resizeMode: 'contain',
    width: wp('25%'),
    height: hp('12.5%'),
    alignSelf: 'center',
    marginTop: SIZES.padding,
  },

  formContainer: {
    width: wp('80%'),
    marginVertical: SIZES.largeTitle,
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
