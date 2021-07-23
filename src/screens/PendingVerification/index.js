import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { images, COLORS, FONTS } from '../../constants';

const PendingVerification = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification Status: Pending.</Text>
      <View style={styles.imgWrapper}>
        <Image source={images.pendingVectorImg} style={styles.pendingImage} />
        <Text style={styles.text}>
          You would be notified by our team once the vetting process has been
          completed.
        </Text>
      </View>
    </View>
  );
};

export default PendingVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  title: {
    position: 'absolute',
    top: hp('10%'),
    alignSelf: 'center',
    ...FONTS.h2,
  },

  imgWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pendingImage: {
    resizeMode: 'contain',
    width: wp('50%'),
    height: hp('35%'),
  },

  text: {
    width: wp('85%'),
    ...FONTS.h4,
  },
});
