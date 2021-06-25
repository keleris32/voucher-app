import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const CustomInput = ({placeholder, inputStyle}) => {
  return (
    <View>
      <TextInput placeholder={placeholder} style={inputStyle} />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
