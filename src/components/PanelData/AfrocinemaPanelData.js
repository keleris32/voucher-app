import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { decode } from 'html-entities';
import NumberFormat from 'react-number-format';

import { GlobalContext } from '../../context/Provider';
import { COLORS, FONTS } from '../../constants';
import CustomButton from '../CustomButton';
import { PAYMENTS } from '../../constants/routeNames';

const AfrocinemaPanelData = async ({ bs }) => {
  let navigation = useNavigation();

  // Global state variable for selectedCardData (selectedAfrocinemaData)
  const {
    selectedCardState: { selectedAfrocinemaData },
  } = useContext(GlobalContext);

  // Initialize a variable and store Global state
  const data = selectedAfrocinemaData;

  // Decode the HTML code gotten from data to it's appropraite symbol
  const decodedSymbol = decode(data?.premier.charging_currency_symbol);

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
          <Image
            source={{
              uri: data.landscape_image,
            }}
            style={styles.image}
          />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{data.title}</Text>
          </View>
          <View style={styles.detailsWrapper}>
            {/* <ScrollView> */}
            <View style={styles.synopsisContainer}>
              <Text style={styles.synopsis}>
                <Text style={{ ...FONTS.h4 }}>Synopsis: </Text>
                {data.synopsis}
              </Text>
            </View>
            {/* </ScrollView> */}
            <View style={styles.descriptionWrapper}>
              <View style={styles.description}>
                <Text style={{ ...FONTS.h4 }}>Release year: </Text>
                <Text style={{ color: COLORS.black, ...FONTS.body4 }}>
                  {data.year_of_release} (
                  <Text style={{ color: COLORS.acomartBlue2 }}>
                    {data.territory_of_origin}
                  </Text>
                  )
                </Text>
              </View>
              <View style={styles.description}>
                <Text style={{ ...FONTS.h4 }}>Director: </Text>
                <Text style={{ color: COLORS.acomartBlue2, ...FONTS.body4 }}>
                  {data.director}
                </Text>
              </View>
              <View style={styles.description}>
                <Text style={{ ...FONTS.h4 }}>Language: </Text>
                <Text style={{ color: COLORS.acomartBlue2, ...FONTS.body4 }}>
                  {data.language}
                </Text>
              </View>
              <View style={styles.description}>
                <Text style={{ ...FONTS.h4 }}>PG: </Text>
                <Text style={{ color: COLORS.acomartBlue2, ...FONTS.body4 }}>
                  {data.parental_guidance_age}
                </Text>
              </View>
            </View>
            <View style={{ marginBottom: wp('10%') }}>
              {/* <NumberFormat
                value={data?.premier.discounted_charging_price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={decodedSymbol}
                renderText={value => (
                  <CustomButton
                    buttonText={value}
                    onPress={() => proceedToPaymentScreen(bs)}
                  />
                )}
              /> */}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AfrocinemaPanelData;

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    alignItems: 'center',
    paddingVertical: wp('5%'),
  },

  wrapper: {
    width: wp('85%'),
    alignItems: 'center',
    paddingHorizontal: wp('2.5%'),
  },

  image: {
    width: wp('70%'),
    height: hp('25%'),
  },

  titleWrapper: {
    width: '100%',
    marginVertical: hp('2.5%'),
  },

  title: {
    textAlign: 'center',
    color: COLORS.black,
    ...FONTS.h3,
  },

  detailsWrapper: {
    width: '100%',
    marginVertical: wp('2.5%'),
  },

  synopsisContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray2,
    backgroundColor: COLORS.lightGray2,
  },

  synopsis: {
    color: COLORS.black,
    ...FONTS.body4,
  },

  descriptionWrapper: {
    marginVertical: wp('2.5%'),
  },

  description: {
    flexDirection: 'row',
    marginBottom: wp('1.25%'),
  },
});
