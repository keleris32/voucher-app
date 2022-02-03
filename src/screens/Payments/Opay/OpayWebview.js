import React, { useRef } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { WebView } from 'react-native-webview';
import EnvironmentVariables from '../../../config/env';

import { COLORS, SIZES } from '../../../constants';

export default function OpayWebView({
  authorization_url,
  navigation,
  setProcessOpay,
}) {
  const webviewRef = useRef(null);

  const onNavigationStateChange = state => {
    const { url } = state;

    console.log(JSON.stringify(state, null, 2));

    if (url.includes(EnvironmentVariables.OPAY_CALLBACK_URL)) {
      setProcessOpay(false);

      // navigation.goBack();

      // Alert.alert('Success', 'Your order has been confirmed!', [
      //   {
      //     text: 'OK',
      //     onPress: () => {
      //       navigation.goBack();
      //     },
      //   },
      // ]);
    }
  };

  const onError = () => {
    Alert.alert('Error', 'Something went wrong, please try again later.', [
      {
        text: 'Ok',
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <WebView
        onNavigationStateChange={e => onNavigationStateChange(e)}
        source={{ uri: authorization_url }}
        scalesPageToFit
        startInLoadingState
        onError={onError}
        style={styles.webview}
        ref={webviewRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('75%'),
    backgroundColor: COLORS.white,
    borderTopStartRadius: SIZES.largeTitle,
    borderTopEndRadius: SIZES.largeTitle,
  },

  webview: {
    width: wp('100%'),
    height: wp('100%'),
    flex: 1,
  },
});
