import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GlobalContext } from '../../context/Provider';

const AfrostreamComponent = () => {
  const {
    getAfrostreamState: { afrostreamData },
  } = useContext(GlobalContext);

  return (
    <View>
      <Text>Hi Afrostream!</Text>
      <Text>{afrostreamData[0].name}</Text>
    </View>
  );
};

export default AfrostreamComponent;

const styles = StyleSheet.create({});
