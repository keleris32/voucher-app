import React from 'react';
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

import {images, icons, COLORS, FONTS, SIZES} from '../constants';
import {CustomInput, CustomButton} from '../components';

const SignUp = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={images.loginBg} style={styles.bgImage}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={true}>
          <Image source={icons.redAcomart} style={styles.logo} />
          <View style={styles.formContainer}>
            <CustomInput placeholder="First Name" inputStyle={styles.input} />
            <CustomInput placeholder="Last Name" inputStyle={styles.input} />
            <CustomInput
              placeholder="Telephone Number"
              inputStyle={styles.input}
            />
            <CustomInput placeholder="E-mail" inputStyle={styles.input} />
            <CustomInput placeholder="Password" inputStyle={styles.input} />
            <CustomInput
              placeholder="Confirm Password"
              inputStyle={styles.input}
            />
            <CustomButton
              buttonText="Sign Up"
              onPress={() => console.log('Login Pressed!')}
            />
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <Text style={styles.signUpText}>Log In!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
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
    ...FONTS.body3,
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  registerText: {
    ...(FONTS.base * 2),
  },

  signUpText: {
    paddingHorizontal: SIZES.base / 2,
    color: COLORS.blue,
    ...(FONTS.base * 2),
  },
});
