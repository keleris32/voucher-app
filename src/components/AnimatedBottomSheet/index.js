import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { SIZES } from '../../constants';

const AnimatedBottomSheet = ({ translateY, gestureHandler }) => {
  return (
    <>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: -1,
          }}
        />
      </TapGestureHandler>
      <Animated.View
        style={{
          ...styles.container,
          transform: [{ translateY: translateY }],
        }}>
        <Text></Text>
      </Animated.View>
    </>
  );
};

export default AnimatedBottomSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('70%'),
    borderTopStartRadius: SIZES.largeTitle,
    borderTopEndRadius: SIZES.largeTitle,
    backgroundColor: 'red',
  },
});
