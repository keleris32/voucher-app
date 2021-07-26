import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { COLORS, SIZES } from '../../constants';

const AnimatedBottomSheet = ({ bs, fall }) => {
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const renderContent = () => (
    <View style={styles.panel}>
      <TouchableOpacity onPress={() => bs.current.snapTo(1)}>
        <Text>Animated Bottom!!!</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <View
        style={{
          //   ...StyleSheet.absoluteFill,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: -1,
        }}
      />

      <BottomSheet
        ref={bs}
        snapPoints={[hp('70%'), 0]}
        renderHeader={renderHeader}
        renderContent={renderContent}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
    </>
  );
};

export default AnimatedBottomSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('100%'),
    //   borderTopStartRadius: SIZES.largeTitle,
    //   borderTopEndRadius: SIZES.largeTitle,
    //   backgroundColor: 'red',
  },

  header: {
    backgroundColor: COLORS.white,
    shadowColor: '#333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  panelHeader: {
    alignItems: 'center',
  },

  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },

  panel: {
    height: hp('100%'),
    alignItems: 'center',
    backgroundColor: 'red',
  },
});
