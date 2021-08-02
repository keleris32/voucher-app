import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { COLORS, SIZES } from '../../constants';
import AfrocinemaPanelData from '../PanelData/AfrocinemaPanelData';
import AfrostreamPanelData from '../PanelData/AfrostreamPanelData';
import { GlobalContext } from '../../context/Provider';

const AnimatedBottomSheet = ({ bs, fall }) => {
  const {
    selectedCardState: { isAfrocinemaActive },
  } = useContext(GlobalContext);

  // Rendered component for reanimated-bottom-sheet
  const renderContent = () => (
    <>
      <TouchableOpacity onPress={() => bs.current.snapTo(1)}>
        <View style={styles.panel} />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <View style={styles.panelHeader}>
          <TouchableOpacity onPress={() => bs.current.snapTo(1)}>
            <View style={styles.panelHandle} />
          </TouchableOpacity>
        </View>
        {isAfrocinemaActive ? (
          <AfrostreamPanelData bs={bs} />
        ) : (
          <AfrostreamPanelData bs={bs} />
        )}
      </View>
    </>
  );

  return (
    <>
      <BottomSheet
        ref={bs}
        snapPoints={[hp('100%'), 0]}
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
  panel: {
    height: hp('100%'),
    backgroundColor: COLORS.backDrop,
  },

  contentContainer: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('70%'),
    backgroundColor: COLORS.white,
    borderTopStartRadius: SIZES.largeTitle,
    borderTopEndRadius: SIZES.largeTitle,
  },

  panelHeader: {
    alignItems: 'center',
  },

  panelHandle: {
    width: wp('15%'),
    height: SIZES.base,
    borderRadius: SIZES.base,
    backgroundColor: '#00000040',
    marginVertical: SIZES.radius,
  },
});
