import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import TransactionsCard from '../components/TransactionsCard';
import { COLORS, SIZES, FONTS } from '../constants';
import { GlobalContext } from '../context/Provider';

const Transactions = () => {
  // Transactions data global state variable
  const {
    getTransactionsState: { transactionsData },
  } = useContext(GlobalContext);

  // console.log(JSON.stringify(transactionsData, null, 2));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <View style={styles.wrapper}>
        <View>
          <FlatList
            data={transactionsData}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={true}
            renderItem={({ item }) => (
              <TransactionsCard
                date={item.is_successful_at}
                currency={item.currency}
                price={item.amount}
                reference={item.transaction_reference}
                purpose={item.payment_purpose}
                meta={item.meta}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: wp('10%'),
    alignItems: 'center',
    backgroundColor: COLORS.offWhite,
  },

  title: {
    color: COLORS.black,
    marginBottom: wp('10%'),
    ...FONTS.h2,
  },

  wrapper: {
    flex: 1,
    width: wp('95%'),
  },
});
