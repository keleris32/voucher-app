import React, { useContext } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { GlobalContext } from '../../context/Provider';
import MovieCard from './MovieCard';
import { SELECTED_CARD } from '../../constants/actionTypes';
import SearchBar from './SearchBar';

const AfrocinemaComponent = () => {
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

  return (
    <View style={styles.container}>
      <SearchBar />
      <FlatList
        data={afrocinemaData}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectedOption(item)}>
            <MovieCard
              title={item.title}
              image={item.featured_image}
              parentalGuidance={item.parental_guidance_age}
              price={item.starting_price}
            />
          </TouchableOpacity>
        )}
      />
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
