import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SearchBar from '../components/AfrocinemaComponent/SearchBar';

import TransactionsCard from '../components/TransactionsCard';
import { COLORS, FONTS } from '../constants';
import { GET_SEARCH_DATA } from '../constants/actionTypes';
import { GlobalContext } from '../context/Provider';

const Transactions = () => {
  const [searchValue, setSearchValue] = useState('');

  // Transactions data global state variable
  const {
    getTransactionsState: { transactionsData, loading },
  } = useContext(GlobalContext);

  // Search Filter global state variable
  const {
    searchDispatch,
    searchState: { searchFilterData },
  } = useContext(GlobalContext);

  // console.log(JSON.stringify(transactionsData, null, 2));
  const searchFilterFunction = text => {
    // Check if inserted text is not empty
    if (text) {
      // If it isn't empty, filter afrocinemaData and update filteredData
      const newData = transactionsData.filter(item => {
        const metaObj = JSON.parse(item.meta);
        const itemData = metaObj.customer_phone_number
          ? metaObj.customer_phone_number.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      searchDispatch({
        type: GET_SEARCH_DATA,
        payload: newData,
      });
      setSearchValue(text);
    } else {
      // if it is empty, update filteredData with afrocinemaData
      searchDispatch({
        type: GET_SEARCH_DATA,
        payload: transactionsData,
      });
      setSearchValue(text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      {loading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator color={COLORS.acomartBlue2} size="large" />
        </View>
      ) : (
        <View style={styles.wrapper}>
          <View style={{ width: wp('100%'), paddingHorizontal: wp('5%') }}>
            <SearchBar
              searchValue={searchValue}
              searchFilterFunction={searchFilterFunction}
              placeholder="Search phone numbers"
            />
          </View>
          <View>
            <FlatList
              data={searchFilterData}
              keyExtractor={item => item.id}
              // ListHeaderComponent={}
              showsVerticalScrollIndicator={true}
              renderItem={({ item }) => (
                <TransactionsCard
                  date={item.is_successful_at}
                  currency={item.currency}
                  price={item.amount}
                  reference={item.transaction_reference}
                  purpose={item.payment_purpose}
                  meta={item.meta}
                  model={item.model}
                />
              )}
            />
          </View>
        </View>
      )}
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
    width: wp('100%'),
  },

  loadingWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: wp('20%'),
    width: wp('100%'),
  },
});
