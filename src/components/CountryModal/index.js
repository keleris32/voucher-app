import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import { COLORS, SIZES, FONTS } from '../../constants';

const CountryModal = props => {
  const [countryData, setCountryData] = useState([]);

  // Fetch data from the countries api and store in the countryData state variable
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const request = await axios.get('http://10.0.2.2:8000/api/countries');
        setCountryData(request.data.data.countries);
        props.setFetchError(false);
      } catch (err) {
        props.setFetchError(true);
      }
    };
    fetchCountryData();
  }, []);

  const selectedOption = optionData => {
    // Update the state with the selected option
    props.setSelectedCountry({
      id: optionData.id,
      name: optionData.name,
      code: optionData.dialing_code,
    });

    // Set isModalVisible to false to hide modal
    props.setIsModalVisible(!props.isModalVisible);
  };

  return (
    <View>
      <View style={styles.countryBar}>
        <Text style={styles.countryBarText}>{props.selectedCountry.name}</Text>
        <Icons name="chevron-circle-down" style={styles.icon} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isModalVisible}>
        <View style={styles.Container}>
          <View style={styles.modalContainer}>
            <ScrollView>
              {countryData?.map(option => {
                return (
                  <TouchableOpacity
                    key={option.id}
                    onPress={() => selectedOption(option)}>
                    <View style={styles.optionContainer}>
                      <Text style={styles.optionName}>{option.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={() => props.setIsModalVisible(!props.isModalVisible)}>
            <View style={styles.closeBtn}>
              <Text style={styles.btnText}>Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CountryModal;

const styles = StyleSheet.create({
  countryBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: wp('10%'),
    borderRadius: SIZES.base / 2,
    paddingHorizontal: SIZES.base,
    marginVertical: SIZES.base,
    backgroundColor: COLORS.acomartBlue2,
  },

  countryBarText: {
    color: COLORS.white,
    ...FONTS.h3,
  },

  icon: {
    color: COLORS.white,
    ...FONTS.h3,
  },

  Container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp('5%'),
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  modalContainer: {
    flex: 1,
    width: wp('90%'),
    borderRadius: SIZES.base,
    backgroundColor: COLORS.white,
  },

  closeBtn: {
    height: wp('12.5%'),
    width: wp('90%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('5%'),
    borderRadius: SIZES.base,
    backgroundColor: COLORS.white,
  },

  btnText: {
    color: COLORS.black,
    ...FONTS.h2,
  },

  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.font,
    borderTopWidth: 1,
  },

  optionName: {
    ...FONTS.h3,
  },
});
