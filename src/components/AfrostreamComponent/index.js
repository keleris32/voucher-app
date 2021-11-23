import React, { useContext, createRef, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Value } from 'react-native-reanimated';

import { GlobalContext } from '../../context/Provider';
import { SELECTED_AFROSTREAM_CARD } from '../../constants/actionTypes';
import AnimatedBottomSheet from '../AnimatedBottomSheet';
import { COLORS } from '../../constants';
import ErrorPageComponent from '../ErrorPageComponent';
import SubscriptionPartnersComponent from './SubscriptionPartnersComponent';

const AfrostreamComponent = ({ refreshComp, fetchError }) => {
  const [isPlansAccordionActive, setIsPlansAccordionActive] = useState({
    acomart: true,
    otherPlan: false,
  });

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

  let convertedObj = Object.keys(afrostreamData);

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
              keyExtractor={item => item}
              data={convertedObj}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <SubscriptionPartnersComponent
                  partner={item}
                  plans={afrostreamData[item]}
                  index={index}
                  isPlansAccordionActive={isPlansAccordionActive}
                  setIsPlansAccordionActive={setIsPlansAccordionActive}
                  bs={bs}
                  selectedPlan={selectedOption}
                />
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
