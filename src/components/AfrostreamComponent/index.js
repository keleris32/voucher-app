import React, { useContext, createRef } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Value } from 'react-native-reanimated';

import { GlobalContext } from '../../context/Provider';
import SubscriptionCard from './SubscriptionCard';
import { SELECTED_AFROSTREAM_CARD } from '../../constants/actionTypes';
import AnimatedBottomSheet from '../AnimatedBottomSheet';

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
      type: SELECTED_AFROSTREAM_CARD,
      payload: optionData,
    });
  };

  // console.log('afrostreamData>>', JSON.stringify(afrostreamData, null, 2));

  // ------------------------------------------------------- >
  // Animations

  const bs = createRef();
  const fall = new Value(1);

  // ------------------------------------------------------- >

  return (
    <>
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.id}
          data={afrostreamData}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                selectedOption(item), bs.current.snapTo(0);
              }}>
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
      <AnimatedBottomSheet bs={bs} fall={fall} />
    </>
  );
};

export default AfrostreamComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
  },
});
