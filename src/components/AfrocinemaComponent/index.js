import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { GlobalContext } from '../../context/Provider';
import MovieCard from './MovieCard';

const AfrocinemaComponent = () => {
  const {
    getAfrocinemaState: { afrocinemaData },
  } = useContext(GlobalContext);

  console.log(JSON.stringify(afrocinemaData[0].featured_image, null, 2));

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        data={afrocinemaData}
        renderItem={({ item }) => (
          <TouchableOpacity>
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
