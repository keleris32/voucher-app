import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/FontAwesome';

import { COLORS, SIZES, FONTS } from '../../constants';
import { GlobalContext } from '../../context/Provider';
import axiosInstance from '../../helpers/axiosInterceptor';
import SearchBar from '../AfrocinemaComponent/SearchBar';

const CountryModal = props => {
  const [countryData, setCountryData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const isCurrent = useRef(true);

  const { getRetailerDispatch } = useContext(GlobalContext);

  // State variable for filtered search data
  const [filteredData, setFilteredData] = useState({});

  // Fetch data from the countries api and store in the countryData state variable
  const fetchCountryData = async () => {
    try {
      const request = await axiosInstance.get('countries');
      if (isCurrent.current) {
        setCountryData(request.data.data.countries);
        setFilteredData(request.data.data.countries);
      }
      props.setFetchError(false);
    } catch (err) {
      props.setFetchError(true);
    }
  };

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

  const searchFilterFunction = text => {
    // Check if inserted text is not empty
    if (text) {
      // If it isn't empty, filter afrocinemaData and update filteredData
      const newData = countryData.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchValue(text);
    } else {
      // if it is empty, update filteredData with afrocinemaData
      setFilteredData(countryData);
      setSearchValue(text);
    }
  };

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    fetchCountryData();
  }, []);

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
          <View style={{ width: '100%', paddingHorizontal: wp('5%') }}>
            <SearchBar
              searchValue={searchValue}
              searchFilterFunction={searchFilterFunction}
              placeholder="Search countries"
            />
          </View>
          <View style={styles.modalContainer}>
            <FlatList
              data={filteredData}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectedOption(item)}>
                  <View style={styles.optionContainer}>
                    <Text style={styles.optionName}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            {/* <ScrollView>
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
            </ScrollView> */}
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
    // flex: 1,
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
    // borderTopWidth: 1,
    borderBottomWidth: 1,
  },

  optionName: {
    ...FONTS.h3,
  },
});
