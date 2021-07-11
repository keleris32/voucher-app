import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CustomPicker = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  open();

  return (
    <View>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item>James</Picker.Item>
        <Picker.Item>John</Picker.Item>
      </Picker>
    </View>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({});
