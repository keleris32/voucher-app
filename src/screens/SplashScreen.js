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
      <ImageBackground source={images.splashScreenBg} style={styles.bgImage}>
        <View style={styles.imageBackDrop}>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <View style={styles.logoWrap}>
              <Image source={icons.whiteAcomart} style={styles.logo} />
              <Text style={styles.logoTitle}>ACOMART</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.text}>www.myafrostream.tv</Text>
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
    width: wp('50%'),
    height: hp('25%'),
  },

  logoTitle: {
    color: COLORS.white,
    ...FONTS.largeTitle,
  },

  text: {
    position: 'absolute',
    bottom: hp('5%'),
    color: COLORS.white,
    opacity: 0.8,
    letterSpacing: 2,
    ...FONTS.body4,
  },
});
