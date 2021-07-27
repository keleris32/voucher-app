import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GlobalContext } from '../../context/Provider';

const AfrocinemaPanelData = () => {
  //
  const {
    selectedCardState: { selectedAfrocinemaData },
  } = useContext(GlobalContext);

  return (
    <View>
      <Text>Hiiii from Afrocinema Panel</Text>
    </View>
  );
};

export default AfrocinemaPanelData;

const styles = StyleSheet.create({});
