import React, { useContext, useState, createRef } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Value } from 'react-native-reanimated';

import { GlobalContext } from '../../context/Provider';
import MovieCard from './MovieCard';
import { SELECTED_AFROCINEMA_CARD } from '../../constants/actionTypes';
import SearchBar from './SearchBar';
import AnimatedBottomSheet from '../AnimatedBottomSheet';

const AfrocinemaComponent = ({ filteredData, setFilteredData }) => {
  const [searchValue, setSearchValue] = useState('');

  // Afrocinema global state variable
  const {
    getAfrocinemaState: { afrocinemaData },
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

  // console.log('afrocinemaData>>', JSON.stringify(afrocinemaData, null, 2));

  // ------------------------------------------------------- >
  // Animations

  const bs = createRef();
  const fall = new Value(1);

  // ------------------------------------------------------- >
  // console.log(JSON.stringify(afrocinemaData.charging_currency_symbol, null, 2));
  return (
    <>
      <View style={styles.container}>
        <SearchBar
          searchValue={searchValue}
          searchFilterFunction={searchFilterFunction}
        />
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
                image={item.landscape_image}
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
  );
};

export default AfrocinemaComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
  },
});
