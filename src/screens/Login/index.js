import React, { useState, useContext, useCallback } from 'react';
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
import { FORGOT_PASSWORD, SIGN_UP } from '../../constants/routeNames';
import { loginValidationSchema } from './validationSchema';
import { GlobalContext } from '../../context/Provider';
import loginRetailer from '../../context/actions/auth/loginRetailer';
import { useFocusEffect } from '@react-navigation/native';
import { clearAuthState } from '../../context/actions/auth/registerRetailer';

const Login = ({ navigation }) => {
  const [isLoginPasswordHidden, setIsLoginPasswordHidden] = useState(true);

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

  const submitForm = formData => {
    // If the form is valid, then the form's values are dispatched to the server
    loginRetailer(formData)(authDispatch);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validateOnMount={true}
      onSubmit={values => {
        submitForm(values);
      }}
      validationSchema={loginValidationSchema}>
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
            alwaysBounceVertical={true}
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            <ImageBackground source={images.loginBg} style={styles.bgImage}>
              {/* <TouchableOpacity
              onPress={() => navigation.replace('SplashScreen')}> */}
              <Image source={icons.fullAcomart} style={styles.logo} />
              {/* </TouchableOpacity> */}
              <View style={styles.formContainer}>
                {/* Display an error message, if the form's data is deemed invalid by the server */}
                {error?.email && (
                  <View style={styles.invalidErrorMessage}>
                    <Text style={styles.invalidErrorText}>
                      Invalid credentials provided!
                    </Text>
                  </View>
                )}

                {/* Display an error message, if form failed to connect to the server */}
                {error?.message === 'Network Error' && (
                  <View style={styles.invalidErrorMessage}>
                    <Text style={styles.invalidErrorText}>
                      Please check your internet connection!
                    </Text>
                  </View>
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
                {/* If this field contains an error and it has been touched, then display the error message */}
                {errors.email && touched.email && (
                  <Text style={styles.errors}>{errors.email}</Text>
                )}
                <CustomInput
                  placeholder="Password"
                  iconType="loginPassword"
                  secureTextEntry={isLoginPasswordHidden}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password.trim()}
                  errors={errors.password}
                  touched={touched.password}
                  isLoginPasswordHidden={isLoginPasswordHidden}
                  setIsLoginPasswordHidden={setIsLoginPasswordHidden}
                />
                {/* If this field contains an error and it has been touched, then display the error message */}
                {errors.password && touched.password && (
                  <Text style={styles.errors}>{errors.password}</Text>
                )}
                <TouchableOpacity
                  onPress={() => navigation.navigate(FORGOT_PASSWORD)}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
                <CustomButton
                  buttonText={loading ? 'Logging In' : 'Log In'}
                  disabled={loading}
                  onPress={handleSubmit}
                />
                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>Not Registered?</Text>
                  <TouchableOpacity onPress={() => navigation.replace(SIGN_UP)}>
                    <Text style={styles.signUpText}>Sign Up!</Text>
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

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bgImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    paddingVertical: wp('5%'),
  },

  logo: {
    resizeMode: 'contain',
    width: wp('200%'),
    height: hp('12.5%'),
  },

  formContainer: {
    width: wp('80%'),
    marginVertical: SIZES.largeTitle * 2,
  },

  forgotText: {
    color: COLORS.blue,
    alignSelf: 'flex-end',
    ...FONTS.h4,
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
