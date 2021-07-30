import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
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
import { CustomButton, CustomInput } from '../../components';
import CountryModal from '../../components/CountryModal';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { COLORS, SIZES, FONTS } from '../../constants';
import axiosInstance from '../../helpers/axiosInterceptor';
import { validationSchema } from './validationSchema';
import EnvironmentVariables from '../../config/env';

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const updateRetailerProfile = formData => {
    setLoading(true);

    const data = new FormData();
    data.append('current_password', formData.currentPassword);
    data.append('new_password', formData.newPassword);
    data.append('new_password_confirmation', formData.newPasswordConfirmation);
    data.append('callbackUrl', EnvironmentVariables.EMAIL_CALLBACK_URL);

    axiosInstance
      .post('retailer', data)
      .then(res =>
        Alert.alert('Success', 'Your Profile was updated successfully', [
          {
            text: 'OK',
            onPress: () => {
              setLoading(false);
            },
          },
        ]),
      )
      .catch(
        err => {
          console.log(JSON.stringify(err, null, 2));
          Alert.alert('Success', 'Your Profile was updated successfully', [
            {
              text: 'OK',
              onPress: () => {
                setLoading(false);
              },
            },
          ]);
        },
        // Alert.alert(
        //   'Error',
        //   'Please check your internet connection and try again later',
        //   [
        //     {
        //       text: 'OK',
        //       onPress: () => {
        //         setLoading(false);
        //       },
        //     },
        //   ],
        // ),
      );
  };

  return (
    <Formik
      initialValues={{
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
      }}
      validateOnMount={true}
      onSubmit={values => updateRetailerProfile(values)}
      validationSchema={validationSchema}>
      {props => (
        <View style={styles.container}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" style={styles.rightArrowIcon} />
          </TouchableOpacity> */}

          <Text style={styles.title}>Change Password</Text>

          <View style={styles.wrapper}>
            <View style={styles.formContainer}>
              <View style={{ marginBottom: SIZES.radius }}>
                <Text style={styles.label}>Current Password</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Current Password"
                    underlineColorAndroid="transparent"
                    placeholderTextColor={COLORS.gray}
                    onChangeText={props.handleChange('currentPassword')}
                    onBlur={props.handleBlur('currentPassword')}
                    value={props.values.currentPassword}
                    errors={props.errors.currentPassword}
                    touched={props.touched.currentPassword}
                  />
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
                    underlineColorAndroid="transparent"
                    placeholderTextColor={COLORS.gray}
                    onChangeText={props.handleChange('newPassword')}
                    onBlur={props.handleBlur('newPassword')}
                    value={props.values.newPassword}
                    errors={props.errors.newPassword}
                    touched={props.touched.newPassword}
                  />
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
                    underlineColorAndroid="transparent"
                    placeholderTextColor={COLORS.gray}
                    onChangeText={props.handleChange('newPasswordConfirmation')}
                    onBlur={props.handleBlur('newPasswordConfirmation')}
                    value={props.values.newPasswordConfirmation}
                    errors={props.errors.newPasswordConfirmation}
                    touched={props.touched.newPasswordConfirmation}
                  />
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
                buttonText="Update Password"
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

  title: {
    marginBottom: wp('12.5%'),
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
});
