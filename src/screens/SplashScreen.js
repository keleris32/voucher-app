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

import { images, icons, COLORS, FONTS } from '../constants';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={images.splashScreenBg2} style={styles.bgImage}>
        <View style={styles.imageBackDrop}>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <View style={styles.logoWrap}>
              <Image source={icons.newAcomart} style={styles.logo} />
              {/* <Text style={styles.logoTitle}>ACOMART</Text> */}
            </View>
          </TouchableOpacity>
          {/* <Text style={styles.text}>https://app.acomart.tv</Text> */}
        </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

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
    backgroundColor: COLORS.backDrop,
  },

  logoWrap: {
    alignItems: 'center',
  },

  logo: {
    resizeMode: 'contain',
    width: wp('80%'),
    height: hp('25%'),
  },

  logoTitle: {
    color: COLORS.white,
    ...FONTS.largeTitle,
  },

  // text: {
  //   position: 'absolute',
  //   bottom: hp('5%'),
  //   color: COLORS.white,
  //   opacity: 0.8,
  //   letterSpacing: 2,
  //   ...FONTS.body4,
  // },
});
