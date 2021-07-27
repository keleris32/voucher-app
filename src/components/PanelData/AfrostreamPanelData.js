import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GlobalContext } from '../../context/Provider';

const AfrostreamPanelData = () => {
  // SelectedCard global state
  const {
    selectedCardState: { selectedAfrostreamData },
  } = useContext(GlobalContext);

  return (
    <View>
      <Text>Hiiii from Afrostream Panel</Text>
    </View>
  );
};

export default AfrostreamPanelData;

const styles = StyleSheet.create({});
