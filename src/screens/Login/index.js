import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Formik } from 'formik';

import { images, icons, COLORS, FONTS, SIZES } from '../../constants';
import { CustomInput, CustomButton } from '../../components';
import { HOME, SIGN_UP } from '../../constants/routeNames';
import { loginValidationSchema } from './validationSchema';
import { GlobalContext } from '../../context/Provider';
import axios from 'axios';

const Login = ({ navigation }) => {
  const {
    authDispatch,
    authState: { error, loading, data },
  } = useContext(GlobalContext);

  const submitForm = values => {
    axios({
      method: 'post',
      url: 'http://10.0.2.2:8000/api/retailer/auth/login/',
      data: values,
    })
      .then(res => {
        console.log('Response >>>>>', res);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('ERROR.RESPONSE.DATA >>>>', error.response.data);
          console.log('ERROR.RESPONSE.STATUS >>>>>', error.response.status);
          console.log('ERROR.RESPONSE.HEADERS >>>>>>', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(
            'ERROR.REQUEST >>>>>>',
            JSON.stringify(error.request, null, 2),
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error >>>>>>', error.message);
        }
      });
  };
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validateOnMount={true}
      // onSubmit={() => navigation.replace(HOME)}
      onSubmit={values => submitForm(values)}
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
          <ImageBackground source={images.loginBg} style={styles.bgImage}>
            <View style={styles.imageBackDrop}>
              <TouchableOpacity
                onPress={() => navigation.replace('SplashScreen')}>
                <Image source={icons.redAcomart} style={styles.logo} />
              </TouchableOpacity>
              <View style={styles.formContainer}>
                <CustomInput
                  placeholder="Email"
                  iconType="email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  errors={errors.email}
                  touched={touched.email}
                />
                {/* If this field contains an error and it has been touched, then display the error message */}
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
                {/* If this field contains an error and it has been touched, then display the error message */}
                {errors.password && touched.password && (
                  <Text style={styles.errors}>{errors.password}</Text>
                )}
                <TouchableOpacity>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
                <CustomButton
                  buttonText="Log In"
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
            </View>
          </ImageBackground>
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
    resizeMode: 'cover',
  },

  imageBackDrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.lightBackDrop,
  },

  logo: {
    resizeMode: 'contain',
    width: wp('25%'),
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
});
