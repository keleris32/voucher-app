import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {images, icons, COLORS, FONTS, SIZES} from '../constants';
import {CustomInput, CustomButton} from '../components';

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={images.loginBg} style={styles.bgImage}>
        <Image source={icons.redAcomart} style={styles.logo} />
        <View style={styles.formContainer}>
          <CustomInput placeholder="E-mail" inputStyle={styles.input} />
          <CustomInput placeholder="Password" inputStyle={styles.input} />
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <CustomButton
            buttonText="Log In"
            onPress={() => console.log('Login Pressed!')}
          />
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Not Registered?</Text>
            <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
              <Text style={styles.signUpText}>Sign Up!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
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

  input: {
    borderWidth: 1,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.base,
    marginVertical: SIZES.base,
    color: COLORS.black,
    ...FONTS.body3,
  },

  forgotText: {
    color: COLORS.blue,
    alignSelf: 'flex-end',
    ...(FONTS.body5 * 2),
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
