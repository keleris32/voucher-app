import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CustomButton } from '../../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PasswordIcon from 'react-native-vector-icons/Ionicons';

import { COLORS, SIZES, FONTS } from '../../constants';
import axiosInstance from '../../helpers/axiosInterceptor';
import { changePasswordValidationSchema } from './validationSchema';
import EnvironmentVariables from '../../config/env';
import ErrorMessage from '../../components/ErrorMessage';

const ChangePassword = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [errorComponent, setErrorComponent] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true);
  const [isNewPasswordConfirmHidden, setIsNewPasswordConfirmHidden] =
    useState(true);

  const updateRetailerPassword = (formData, resetForm) => {
    setLoading(true);

    const data = new FormData();
    data.append('current_password', formData.currentPassword);
    data.append('new_password', formData.newPassword);
    data.append('new_password_confirmation', formData.newPasswordConfirmation);
    data.append('callbackUrl', EnvironmentVariables.EMAIL_CALLBACK_URL);

    axiosInstance
      .post('retailer/change-password', data)
      .then(res =>
        Alert.alert('Success', 'Your Profile was updated successfully', [
          {
            text: 'OK',
            onPress: () => {
              setLoading(false);
              resetForm();
              setInvalidPassword(false);
              setErrorComponent(false);
            },
          },
        ]),
      )
      .catch(err => {
        if (err.message === 'Network Error') {
          Alert.alert(
            'Error',
            'Please check your internet connection and try again later',
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
          setInvalidPassword(true);
          setLoading(false);
        }
      });
  };

  const checkForPassword = (formProp, resetForm) => {
    if (formProp.newPassword !== formProp.newPasswordConfirmation) {
      setErrorComponent(true);
    } else {
      updateRetailerPassword(formProp, resetForm);
    }
  };

  return (
    <Formik
      initialValues={{
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
      }}
      validateOnMount={true}
      onSubmit={(values, { resetForm }) => checkForPassword(values, resetForm)}
      validationSchema={changePasswordValidationSchema}>
      {props => (
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity
              style={styles.iconCon}
              onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" style={styles.leftArrowIcon} />
            </TouchableOpacity>
            <Text style={styles.title}>Change Password</Text>
          </View>

          <View style={styles.wrapper}>
            {invalidPassword && (
              <ErrorMessage
                errorMessage="Your current password is incorrect"
                setErrorComponent={setInvalidPassword}
              />
            )}

            {errorComponent && (
              <ErrorMessage
                errorMessage="Your new password does not match!"
                setErrorComponent={setErrorComponent}
              />
            )}

            <View style={styles.formContainer}>
              <View style={{ marginBottom: SIZES.radius }}>
                <Text style={styles.label}>Current Password</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Current Password"
                    secureTextEntry={isNewPasswordHidden}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={COLORS.gray}
                    onChangeText={props.handleChange('currentPassword')}
                    onBlur={props.handleBlur('currentPassword')}
                    value={props.values.currentPassword}
                    errors={props.errors.currentPassword}
                    touched={props.touched.currentPassword}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setIsNewPasswordHidden(!isNewPasswordHidden)
                    }>
                    <PasswordIcon
                      name={isNewPasswordHidden ? 'eye' : 'eye-off'}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
                {/* If this field contains an error and it has been touched, then display the error message */}
                {props.errors.currentPassword &&
                  props.touched.currentPassword && (
                    <Text style={styles.errors}>
                      {props.errors.currentPassword}
                    </Text>
                  )}
              </View>
              <View style={{ marginBottom: SIZES.radius }}>
                <Text style={styles.label}>New Password</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder="New Password"
                    secureTextEntry={isNewPasswordConfirmHidden}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={COLORS.gray}
                    onChangeText={props.handleChange('newPassword')}
                    onBlur={props.handleBlur('newPassword')}
                    value={props.values.newPassword}
                    errors={props.errors.newPassword}
                    touched={props.touched.newPassword}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setIsNewPasswordConfirmHidden(!isNewPasswordConfirmHidden)
                    }>
                    <PasswordIcon
                      name={isNewPasswordConfirmHidden ? 'eye' : 'eye-off'}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
                {/* If this field contains an error and it has been touched, then display the error message */}
                {props.errors.newPassword && props.touched.newPassword && (
                  <Text style={styles.errors}>{props.errors.newPassword}</Text>
                )}
              </View>
              <View style={{ marginBottom: SIZES.radius }}>
                <Text style={styles.label}>New Password Confirmation</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder="New Password Confirmation"
                    secureTextEntry={isPasswordHidden}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={COLORS.gray}
                    onChangeText={props.handleChange('newPasswordConfirmation')}
                    onBlur={props.handleBlur('newPasswordConfirmation')}
                    value={props.values.newPasswordConfirmation}
                    errors={props.errors.newPasswordConfirmation}
                    touched={props.touched.newPasswordConfirmation}
                  />
                  <TouchableOpacity
                    onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                    <PasswordIcon
                      name={isPasswordHidden ? 'eye' : 'eye-off'}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
                {/* If this field contains an error and it has been touched, then display the error message */}
                {props.errors.newPasswordConfirmation &&
                  props.touched.newPasswordConfirmation && (
                    <Text style={styles.errors}>
                      {props.errors.newPasswordConfirmation}
                    </Text>
                  )}
              </View>
              <CustomButton
                buttonText={loading ? 'Updating' : 'Update Password'}
                disabled={loading}
                onPress={props.handleSubmit}
              />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
    paddingVertical: wp('10%'),
    alignItems: 'center',
  },

  rightArrowIcon: {
    position: 'absolute',
    left: wp('5%'),
    top: wp('10%'),
    fontSize: hp('4.75%'),
    color: COLORS.black,
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

  title: {
    flex: 1,
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

  icon: {
    fontSize: wp('5%'),
    color: COLORS.black,
  },
});
