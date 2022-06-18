import React, { useContext, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SearchBar from '../components/AfrocinemaComponent/SearchBar';

import TransactionsCard from '../components/TransactionsCard';
import { COLORS, FONTS } from '../constants';
import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_ERROR,
  GET_TRANSACTIONS_LOADING,
} from '../constants/actionTypes';
import { GlobalContext } from '../context/Provider';
import axiosInstance from '../helpers/axiosInterceptor';
import ErrorPageComponent from '../components/ErrorPageComponent';

const Transactions = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState('');
  const [fetchError, setFetchError] = useState(false);
  const [refreshState, setRefreshState] = useState(false);

  const refreshPage = () => setRefreshState(!refreshState);

  // Transactions data global state variable
  const {
    getTransactionsDispatch,
    getTransactionsState: { transactionsData, loading },
  } = useContext(GlobalContext);

  const filterBySuccessfulTransactions = transactions => {
    return transactions.filter(transaction => transaction.status === 'success');
  };

  // get transactions data from api
  const getTransactionsData = async () => {
    setFetchError(false);
    getTransactionsDispatch({
      type: GET_TRANSACTIONS_LOADING,
    });
    await axiosInstance
      .get('retailer/payment-transactions?include=model')
      .then(res => {
        setFilteredData(
          filterBySuccessfulTransactions(res.data.data.payment_transactions),
        );
        getTransactionsDispatch({
          type: GET_TRANSACTIONS,
          payload: res.data.data.payment_transactions,
        });
      })
      .catch(err => {
        getTransactionsDispatch({
          type: GET_TRANSACTIONS_ERROR,
        });
        setFetchError(true);
      });
  };

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

      setFilteredData(newData);

      setSearchValue(text);
    } else {
      // if it is empty, update filteredData with afrocinemaData
      setFilteredData(transactionsData);

      setSearchValue(text);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTransactionsData();
    }, [refreshState]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      {fetchError ? (
        <ErrorPageComponent
          text="Ops! Please check your internet connection and try again."
          refreshComp={refreshPage}
        />
      ) : loading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator color={COLORS.acomartBlue2} size="large" />
        </View>
      ) : (
        <View style={styles.wrapper}>
          <View
            style={{
              width: wp('100%'),
              paddingHorizontal: wp('5%'),
              alignItems: 'center',
            }}>
            <SearchBar
              searchValue={searchValue}
              searchFilterFunction={searchFilterFunction}
              placeholder="Search email"
            />
            {filteredData.length === 0 && (
              <View style={{ marginVertical: wp('5%') }}>
                <Text style={{ ...FONTS.h4 }}>There are no transactions</Text>
              </View>
            )}
          </View>

          <View>
            <FlatList
              data={filteredData}
              keyExtractor={item => item.id}
              // ListHeaderComponent={}
              showsVerticalScrollIndicator={true}
              renderItem={({ item }) => (
                <TransactionsCard
                  date={item?.is_successful_at}
                  currency={item?.currency}
                  price={item?.amount}
                  reference={item?.transaction_reference}
                  purpose={item?.payment_purpose}
                  meta={item?.meta}
                  model={item?.model}
                />
              )}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: wp('10%'),
    paddingBottom: wp('20%'),
    alignItems: 'center',
    backgroundColor: COLORS.offWhite,
  },

  title: {
    paddingTop: Platform.OS === 'ios' ? wp('7.5%') : 0,
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
