import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';
import { GlobalContext } from '../context/Provider';

const Transactions = () => {
  // Transactions data global state variable
  const {
    getTransactionsState: { transactionsData },
  } = useContext(GlobalContext);

  console.log(JSON.stringify(transactionsData, null, 2));

  return (
    <View style={styles.container}>
      <Text>Hiiii from Transactions</Text>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
});
