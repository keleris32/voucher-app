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
import { GlobalContext } from '../../context/Provider';
import axiosInstance from '../../helpers/axiosInterceptor';
import { validationSchema } from './validationSchema';

const AccountSettings = () => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    getRetailerState: { retailerData },
  } = useContext(GlobalContext);
  const [selectedCountry, setSelectedCountry] = useState({
    id: '',
    name: 'Select your country',
    code: '0',
  });

  const updateRetailerProfile = formData => {
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.fullName);
    data.append('email', formData.email);
    data.append('phone_number', formData.phoneNumber);
    data.append('country_id', selectedCountry.id);
    data.append('_method', 'PATCH');

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
        err => console.log(JSON.stringify(err, null, 2)),
        Alert.alert('Success', 'Your Profile was updated successfully', [
          {
            text: 'OK',
            onPress: () => {
              setLoading(false);
            },
          },
        ]),
      );
  };

  return (
    <Formik
      initialValues={{
        fullName: retailerData.name,
        email: retailerData.email,
        phoneNumber: retailerData.phone_number,
      }}
      validateOnMount={true}
      onSubmit={values => updateRetailerProfile(values)}
      validationSchema={validationSchema}>
      {props => (
        <View style={styles.container}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" style={styles.rightArrowIcon} />
          </TouchableOpacity> */}

          <Text style={styles.title}>Account Settings</Text>

          <View style={styles.wrapper}>
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
            <View style={styles.formContainer}>
              <View style={{ marginBottom: SIZES.radius }}>
                <Text style={styles.label}>Name</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder={retailerData.name}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={COLORS.gray}
                    onChangeText={props.handleChange('fullName')}
                    onBlur={props.handleBlur('fullName')}
                    value={props.values.fullName}
                    errors={props.errors.fullName}
                    touched={props.touched.fullName}
                  />
                </View>
                {/* If this field contains an error and it has been touched, then display the error message */}
                {props.errors.fullName && props.touched.fullName && (
                  <Text style={styles.errors}>{props.errors.fullName}</Text>
                )}
              </View>
              <View style={{ marginBottom: SIZES.radius }}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder={retailerData.email}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={COLORS.gray}
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                    value={props.values.email}
                    errors={props.errors.email}
                    touched={props.touched.email}
                  />
                </View>
                {/* If this field contains an error and it has been touched, then display the error message */}
                {props.errors.email && props.touched.email && (
                  <Text style={styles.errors}>{props.errors.email}</Text>
                )}
              </View>
              <View style={{ marginBottom: SIZES.radius }}>
                <Text style={styles.label}>Phone Number</Text>
                <CustomInput
                  placeholder={retailerData.phone_number}
                  iconType="phone"
                  selectedCountry={selectedCountry}
                  onChangeText={props.handleChange('phoneNumber')}
                  onBlur={props.handleBlur('phoneNumber')}
                  value={props.values.phoneNumber}
                  errors={props.errors.phoneNumber}
                  touched={props.touched.phoneNumber}
                />
                {/* If this field contains an error and it has been touched, then display the error message */}
                {props.errors.phoneNumber && props.touched.phoneNumber && (
                  <Text style={styles.errors}>{props.errors.phoneNumber}</Text>
                )}
              </View>
              <CustomButton
                buttonText="Update Profile"
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

export default AccountSettings;

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
