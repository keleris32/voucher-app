import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { images, COLORS, FONTS, SIZES } from '../../constants';
import { CustomInput, CustomButton } from '../../components';
import { LOGIN } from '../../constants/routeNames';
import { validationSchema } from './validationSchema';
import EnvironmentVariables from '../../config/env';
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage';

const ForgotPassword = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorComponent, setErrorComponent] = useState(false);

  const submitForm = async ({ email, callbackUrl }) => {
    setLoading(true);
    setErrorComponent(false);
    setErrorMessage('');

    // If the form is valid, then the form's values are dispatched to the server
    await axios
      .post(`${EnvironmentVariables.BASE_URL}retailer/auth/password/forgot`, {
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
      })
      .catch(err => {
        if (err.response) {
          setErrorMessage(err.response?.data?.message);
          setErrorComponent(true);
        } else
          Alert.alert(
            'Error',
            'Please check your internet connection and try again!',
          );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        callbackUrl: EnvironmentVariables.RESET_PASSWORD_CALLBACK_URL,
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={true}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <View style={styles.container}>
            <ImageBackground source={images.loginBg} style={styles.bgImage}>
              <View style={styles.screenTitleCon}>
                <Text style={styles.screenTitle}>Password Recovery</Text>
                <Text style={styles.screenSubTitle}>
                  Enter your email and instructions will be sent to you.
                </Text>
              </View>
              <View style={styles.formContainer}>
                {/* Display an error message, if the form's data is deemed invalid by the server */}
                {errorComponent && (
                  <ErrorMessage
                    errorMessage={errorMessage}
                    setErrorComponent={setErrorComponent}
                  />
                )}
                <CustomInput
                  placeholder="Email"
                  iconType="email"
                  keyboardType="email"
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
        </ScrollView>
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
    width: wp('200%'),
    height: hp('12.5%'),
  },

  screenTitleCon: {
    width: wp('80%'),
    marginTop: SIZES.largeTitle,
    marginBottom: SIZES.margin,
  },

  screenTitle: {
    // paddingVertical: 12.5,
    paddingVertical: wp('1.25%'),
    ...FONTS.h1,
  },

  screenSubTitle: {
    marginTop: 2,
    ...FONTS.h4,
  },

  formContainer: {
    width: wp('82.5%'),
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
