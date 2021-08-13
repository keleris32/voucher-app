import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/MaterialIcons';

import { COLORS, SIZES, FONTS } from '../../constants';

const SearchBar = ({ searchValue, searchFilterFunction, placeholder }) => {
  return (
    <View style={styles.container}>
      <Icons name="search" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        style={styles.input}
        value={searchValue}
        onChangeText={text => searchFilterFunction(text)}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: wp('10%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.radius,
    marginBottom: wp('5%'),
    borderRadius: SIZES.padding,
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
  },

  icon: {
    fontSize: wp('5%'),
    color: COLORS.gray,
    marginRight: SIZES.base,
  },

  input: {
    flex: 1,
    color: COLORS.black,
    ...FONTS.h4,
  },
});
