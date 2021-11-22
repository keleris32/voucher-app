import React, { useContext, createRef } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Value } from 'react-native-reanimated';

import { GlobalContext } from '../../context/Provider';
import SubscriptionCard from './SubscriptionCard';
import { SELECTED_AFROSTREAM_CARD } from '../../constants/actionTypes';
import AnimatedBottomSheet from '../AnimatedBottomSheet';
import { COLORS } from '../../constants';
import ErrorPageComponent from '../ErrorPageComponent';

const AfrostreamComponent = ({ refreshComp, fetchError }) => {
  // Afrostream global state variable
  const {
    getAfrostreamState: { afrostreamData, loading },
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
            <FlatList
              keyExtractor={item => item.id}
              data={afrostreamData}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    selectedOption(item);

                    bs.current.snapTo(0);
                  }}>
                  <SubscriptionCard
                    name={item.name}
                    duration={item.duration_in_days}
                    deviceLimit={item.device_limit}
                    discountedPrice={item.discounted_charging_price}
                    chargingPrice={item.charging_price}
                    symbol={item.charging_currency_symbol}
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

export default AfrostreamComponent;

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
