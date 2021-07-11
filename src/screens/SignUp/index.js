import React, { useState, useContext, useEffect } from 'react';
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
import register from '../../context/actions/auth/register';
import { GlobalContext } from '../../context/Provider';
import CountryModal from '../../components/CountryModal';

const SignUp = ({ navigation }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [countryData, setCountryData] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const {
    authDispatch,
    authState: { error, loading, networkError, success },
  } = useContext(GlobalContext);

  const submitRegistration = formData => {
    // Set the isInvalid state to false onSubmit.
    setIsInvalid(false);

    // If the form is valid, then the form's values are dispatched to the server
    register(formData)(authDispatch);

    // If the form is valid, but the client gets an error response from the server, set isInvalid state to true.
    error && setIsInvalid(true);

    // If the form is valid, but the client fails to communicate with the server, then an alert is displayed to the User
    networkError &&
      Alert.alert(
        'Error.',
        'Please check your internet connection and try again later!',
      );
  };

  return (
    <Formik
      initialValues={{
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        country_id: '2710a8bc-adea-4b47-93cf-eb875012702d',
        callbackUrl: 'http://localhost:3000/',
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
            {/* <View style={styles.imageBackDrop}> */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical={true}>
              <TouchableOpacity
                onPress={() => navigation.replace('SplashScreen')}>
                <Image source={icons.redAcomart} style={styles.logo} />
              </TouchableOpacity>
              <View style={styles.formContainer}>
                {/* Display an error message, if the form's data is deemed invalid by the server */}
                {isInvalid && (
                  <View style={styles.invalidErrorMessage}>
                    <Text style={styles.invalidErrorText}>
                      Invalid credentials provided!
                    </Text>
                  </View>
                )}

                <TouchableOpacity>
                  <CountryModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    countryData={countryData}
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
            {/* </View> */}
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

  // imageBackDrop: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: COLORS.lightBackDrop,
  // },

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
