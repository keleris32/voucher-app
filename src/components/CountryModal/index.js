import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/FontAwesome';

import { COLORS, SIZES, FONTS } from '../../constants';

const CountryModal = ({
  openModal,
  setOpenModal,
  countryCode,
  setCountryCode,
  countryData,
}) => {
  return (
    <View>
      <View style={styles.countryBar}>
        <Text style={styles.countryBarText}>Select your country</Text>
        <Icons name="chevron-circle-down" style={styles.icon} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        <View style={styles.Container}>
          <TouchableOpacity>
            <View style={styles.closeBtn}>
              <Text style={styles.btnText}>X</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.modalContainer}></View>
          <Picker
            selectedValue={countryCode}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setCountryCode(itemValue)}>
            {/* <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" /> */}
          </Picker>
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

  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  closeBtn: {
    // position: 'absolute',
    top: hp('7%'),
    height: wp('15%'),
    width: wp('15%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('50%'),
    backgroundColor: COLORS.white,
  },

  btnText: {
    color: COLORS.acomartBlue,
    ...FONTS.h1,
  },

  modalContainer: {
    position: 'absolute',
    height: hp('70%'),
    width: wp('100%'),
    bottom: 0,
    backgroundColor: COLORS.white,
  },

  picker: {
    height: hp('40%'),
    width: wp('100%'),
    backgroundColor: COLORS.acomartBlue,
  },
});
