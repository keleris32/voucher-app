import React, { useContext } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { GlobalContext } from '../../context/Provider';
import SubscriptionCard from './SubscriptionCard';

const AfrostreamComponent = () => {
  // Afrostream global state variable
  const {
    getAfrostreamState: { afrostreamData },
  } = useContext(GlobalContext);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        data={afrostreamData}
        renderItem={({ item }) => (
          <TouchableOpacity>
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
