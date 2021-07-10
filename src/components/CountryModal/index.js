import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/FontAwesome';

import { COLORS, SIZES, FONTS } from '../../constants';

const CountryModal = ({ isModalVisible, setIsModalVisible }) => {
  // const [openModal, setOpenModal] = useState(false);
  const [countryCode, setCountryCode] = useState('');

  return (
    <View>
      <View style={styles.countryBar}>
        <Text style={styles.countryBarText}>Select your country</Text>
        <Icons name="chevron-circle-down" style={styles.icon} />
      </View>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}> */}
      {/* <View modalContainer={styles.modalContainer}>
        <Picker
          selectedValue={countryCode}
          onValueChange={(itemValue, itemIndex) => setCountryCode(itemValue)}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View> */}
      {/* </Modal> */}
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
    backgroundColor: COLORS.acomartBlue,
  },

  countryBarText: {
    color: COLORS.white,
    ...FONTS.h3,
  },

  icon: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  modalContainer: {
    flex: 1,
    //   height: 50,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});
