import React, { useContext, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { Value } from 'react-native-reanimated';

import { GlobalContext } from '../../context/Provider';
import MovieCard from './MovieCard';
import { SELECTED_CARD } from '../../constants/actionTypes';
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
      type: SELECTED_CARD,
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

  // ------------------------------------------------------- >

  return (
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
            onPress={() => selectedOption(item)}>
            <MovieCard
              title={item.title}
              image={item.featured_image}
              parentalGuidance={item.parental_guidance_age}
              price={item.starting_price}
            />
          </TouchableOpacity>
        )}
      />

      <AnimatedBottomSheet />
    </View>
  );
};

export default AfrocinemaComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
  },
});
