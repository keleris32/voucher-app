import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { COLORS, FONTS } from '../../constants';
import CustomButton from '../CustomButton';

const ErrorPageComponent = ({ text, refreshComp }) => {
  return (
    <View style={styles.container}>
      <View>
        <Icons name="wifi-off" style={styles.icon} />
        <Text style={styles.text}>{text}</Text>
      </View>
      <CustomButton buttonText="Refresh" onPress={refreshComp} />
    </View>
  );
};

export default ErrorPageComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp('10%'),
    backgroundColor: COLORS.offWhite,
  },

  icon: {
    fontSize: wp('20%'),
    color: COLORS.blue,
    marginVertical: wp('5%'),
    alignSelf: 'center',
  },

  text: {
    textAlign: 'center',
    ...FONTS.italic4,
  },
});
