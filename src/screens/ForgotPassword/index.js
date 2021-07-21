import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { images, icons, COLORS, FONTS, SIZES } from '../../constants';
import { CustomInput, CustomButton } from '../../components';
import { LOGIN, DOCUMENTS } from '../../constants/routeNames';
import { validationSchema } from './validationSchema';
import EnvironmentVariables from '../../config/env';
import axiosInstance from '../../helpers/axiosInterceptor';

const ForgotPassword = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const submitForm = ({ email, callbackUrl }) => {
    setLoading(true);

    // If the form is valid, then the form's values are dispatched to the server
    axiosInstance
      .post('retailer/auth/password/forgot', {
        email,
        callbackUrl,
      })
      .then(res => {
        Alert.alert(
          'Success',
          'The password reset link was sent successfully!',
          [
            {
              text: 'Ok',
              onPress: () => navigation.replace(LOGIN),
            },
          ],
        );

        setLoading(false);
      })
      .catch(err => {
        if (err.response) {
          setInvalidEmail(true);
        } else
          Alert.alert(
            'Error',
            'Please check your internet connection and try again!',
          );

        setLoading(false);
      });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        callbackUrl: EnvironmentVariables.CALLBACK_URL,
      }}
      validateOnMount={true}
      onSubmit={values => {
        submitForm(values);
      }}
      validationSchema={validationSchema}>
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
            <TouchableOpacity onPress={() => navigation.replace(DOCUMENTS)}>
              <Image source={icons.redAcomart} style={styles.logo} />
            </TouchableOpacity>
            <View style={styles.screenTitleCon}>
              <Text style={styles.screenTitle}>Password Recovery</Text>
              <Text style={styles.screenSubTitle}>
                Enter your email and instructions will be sent to you.
              </Text>
            </View>
            <View style={styles.formContainer}>
              {/* Display an error message, if the form's data is deemed invalid by the server */}
              {invalidEmail && (
                <View style={styles.invalidErrorMessage}>
                  <Text style={styles.invalidErrorText}>
                    Invalid credentials provided!
                  </Text>
                </View>
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
              {/* If this field contains an error and it has been touched, then display the error message */}
              {errors.email && touched.email && (
                <Text style={styles.errors}>{errors.email}</Text>
              )}

              <CustomButton
                buttonText="Reset Password"
                disabled={loading}
                onPress={handleSubmit}
              />

              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => navigation.replace(LOGIN)}>
                <Icon name="chevron-left" style={styles.rightArrowIcon} />
                <Text style={styles.signUpText}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      )}
    </Formik>
  );
};

export default ForgotPassword;

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
  },

  screenTitleCon: {
    width: wp('80%'),
    marginTop: SIZES.largeTitle,
    marginBottom: SIZES.margin,
  },

  screenTitle: {
    ...FONTS.h1,
  },

  screenSubTitle: {
    marginTop: 2,
    ...FONTS.h4,
  },

  formContainer: {
    width: wp('80%'),
  },

  backBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightArrowIcon: {
    color: COLORS.black,
    ...FONTS.h1,
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
