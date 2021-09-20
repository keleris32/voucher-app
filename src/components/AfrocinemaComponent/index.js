import React, { useContext, useState, createRef } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Value } from 'react-native-reanimated';

import { GlobalContext } from '../../context/Provider';
import MovieCard from './MovieCard';
import { SELECTED_AFROCINEMA_CARD } from '../../constants/actionTypes';
import SearchBar from './SearchBar';
import AnimatedBottomSheet from '../AnimatedBottomSheet';
import ErrorPageComponent from '../ErrorPageComponent';
import { FONTS } from '../../constants';

const AfrocinemaComponent = ({
  filteredData,
  setFilteredData,
  fetchError,
  refreshComp,
}) => {
  const [searchValue, setSearchValue] = useState('');

  // Afrocinema global state variable
  const {
    getAfrocinemaState: { afrocinemaData, loading },
  } = useContext(GlobalContext);

  // Selected card global state variable
  const { selectedCardDispatch } = useContext(GlobalContext);

  const selectedOption = optionData => {
    // store the selected card data in the global state
    selectedCardDispatch({
      type: SELECTED_AFROCINEMA_CARD,
      payload: optionData,
    });
  };

  const searchFilterFunction = text => {
    // Check if inserted text is not empty
    if (text) {
      // If it isn't empty, filter afrocinemaData and update filteredData
      const newData = afrocinemaData.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchValue(text);
    } else {
      // if it is empty, update filteredData with afrocinemaData
      setFilteredData(afrocinemaData);
      setSearchValue(text);
    }
  };

  // ------------------------------------------------------- >
  // Animations

  const bs = createRef();
  const fall = new Value(1);

  // ------------------------------------------------------- >

  return (
    <>
      {fetchError ? (
        <ErrorPageComponent
          text="Ops! Please check your internet connection and try again."
          refreshComp={refreshComp}
        />
      ) : loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={COLORS.acomartBlue2} size="large" />
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <SearchBar
              searchValue={searchValue}
              searchFilterFunction={searchFilterFunction}
              placeholder="Search movies"
            />
            {filteredData.length === 0 && (
              <View
                style={{
                  marginVertical: wp('5%'),
                  with: '100%',
                  alignItems: 'center',
                }}>
                <Text style={{ ...FONTS.h4 }}>No results found</Text>
              </View>
            )}
            <FlatList
              data={filteredData}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    selectedOption(item), bs.current.snapTo(0);
                  }}>
                  <MovieCard
                    title={item.title}
                    image={item.featured_image}
                    parentalGuidance={item.parental_guidance_age}
                    discountedPrice={item.premier.discounted_charging_price}
                    chargingPrice={item.premier.charging_price}
                    symbol={item.premier.charging_currency_symbol}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
          <AnimatedBottomSheet bs={bs} fall={fall} />
        </>
      )}
    </>
  );
};

export default AfrocinemaComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: wp('20%'),
    width: wp('100%'),
  },
});
