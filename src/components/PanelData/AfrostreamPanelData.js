import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { decode } from 'html-entities';
import NumberFormat from 'react-number-format';

import { GlobalContext } from '../../context/Provider';
import { COLORS, FONTS, SIZES } from '../../constants';
import CustomButton from '../CustomButton';
import { PAYMENTS } from '../../constants/routeNames';

const AfrostreamPanelData = ({ bs }) => {
  let navigation = useNavigation();

  // Global state variable for selectedCardData (selectedAfrostreamData)
  const {
    selectedCardState: { selectedAfrostreamData },
  } = useContext(GlobalContext);

  // Initialize a variable and store Global state
  const data = selectedAfrostreamData;

  // Decode the HTML code gotten from data to it's appropraite symbol
  const decodedSymbol = decode(data?.charging_currency_symbol);
  console.log(JSON.stringify(data, null, 2));

  var no_of_days;

  if (data.duration_in_days > 1) {
    no_of_days = 'days';
  } else {
    no_of_days = 'day';
  }

  const proceedToPaymentScreen = async () => {
    // Close bottom sheet
    bs.current.snapTo(1);

    // Navigate to Payment Screen
    navigation.navigate(PAYMENTS);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{data.name}</Text>
          </View>
          <View style={styles.detailsWrapper}>
            <View style={styles.description}>
              <Text style={{ ...FONTS.h4 }}>Device Limit: </Text>
              <Text style={{ color: COLORS.acomartBlue2, ...FONTS.body4 }}>
                {data.device_limit}
              </Text>
            </View>
            <View style={styles.description}>
              <Text style={{ ...FONTS.h4 }}>Duration: </Text>
              <Text style={{ color: COLORS.acomartBlue2, ...FONTS.body4 }}>
                {data.duration_in_days} {no_of_days}
              </Text>
            </View>
            <View style={{ marginTop: wp('15%') }}>
              <NumberFormat
                value={data?.discounted_charging_price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={decodedSymbol}
                renderText={value => (
                  <CustomButton
                    buttonText={value}
                    onPress={() => proceedToPaymentScreen(bs)}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AfrostreamPanelData;

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    alignItems: 'center',
    paddingVertical: wp('10%'),
  },

  wrapper: {
    width: wp('85%'),
    alignItems: 'center',
    paddingHorizontal: wp('2.5%'),
  },

  titleContainer: {
    width: wp('70%'),
    height: hp('17.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZES.base,
    borderColor: COLORS.gray2,
    backgroundColor: COLORS.lightGray2,
  },

  title: {
    color: COLORS.black,
    ...FONTS.h1,
  },

  detailsWrapper: {
    width: '100%',
    marginVertical: wp('10%'),
  },

  description: {
    flexDirection: 'row',
    marginBottom: wp('2.5%'),
  },
});
