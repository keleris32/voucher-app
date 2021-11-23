import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/FontAwesome';

import SubscriptionCard from './SubscriptionCard';
import { COLORS, SIZES, FONTS } from '../../constants';

const SubscriptionPartnersComponent = props => {
  const {
    partner,
    plans,
    index,
    isPlansAccordionActive,
    setIsPlansAccordionActive,
    bs,
    selectedPlan,
  } = props;

  const plansBool = Object.values(isPlansAccordionActive);

  const accordionHandler = partnerName => {
    if (partnerName === 'ACOMART') {
      setIsPlansAccordionActive({
        acomart: true,
        otherPlan: false,
      });
    } else {
      setIsPlansAccordionActive({
        acomart: false,
        otherPlan: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headerBar}
        activeOpacity={0.7}
        onPress={() => accordionHandler(partner)}>
        <Text style={styles.title}>{partner} subscription plans</Text>
        {plansBool[index] === true ? (
          <Icons name="minus" style={styles.icon} />
        ) : (
          <Icons name="plus" style={styles.icon} />
        )}
      </TouchableOpacity>
      {plansBool[index] === true && (
        <View style={styles.body}>
          {plans.map(plan => (
            <View key={plan.id}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  selectedPlan(plan);

                  bs.current.snapTo(0);
                }}>
                <SubscriptionCard
                  name={plan.name}
                  duration={plan.duration_in_days}
                  deviceLimit={plan.device_limit}
                  discountedPrice={plan.discounted_charging_price}
                  chargingPrice={plan.charging_price}
                  symbol={plan.charging_currency_symbol}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default SubscriptionPartnersComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.white,
    // borderWidth: 1,
    // borderColor: COLORS.gray,
    // borderRadius: SIZES.base / 2,
    marginBottom: wp('7.5%'),
  },

  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: wp('14%'),
    borderRadius: SIZES.base / 2,
    paddingHorizontal: SIZES.base,
    backgroundColor: COLORS.acomartBlue2,
  },

  title: {
    flex: 1,
    color: COLORS.white,
    ...FONTS.h3,
    // marginBottom: 15,
  },

  icon: {
    color: COLORS.white,
    ...FONTS.h3,
  },

  body: {
    paddingHorizontal: wp('2.5%'),
  },
});
