import React, { useContext } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { GlobalContext } from '../../context/Provider';
import SubscriptionCard from './SubscriptionCard';
import { SELECTED_CARD } from '../../constants/actionTypes';

const AfrostreamComponent = () => {
  // Afrostream global state variable
  const {
    getAfrostreamState: { afrostreamData },
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
      <FlatList
        keyExtractor={item => item.id}
        data={afrostreamData}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectedOption(item)}>
            <SubscriptionCard
              name={item.name}
              duration={item.duration_in_days}
              deviceLimit={item.device_limit}
              price={item.charging_price}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AfrostreamComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
  },
});
