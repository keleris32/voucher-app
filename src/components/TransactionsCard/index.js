import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { format, parseISO } from 'date-fns';

import { COLORS, SIZES, FONTS } from '../../constants';

const TransactionsCard = props => {
  // format the date (e.g from 08/04/2021 20:46 => Aug 4th, 2021 20:46PM)
  const formattedDate = format(parseISO(props.date), 'MMM do, yyy HH:mm a');

  // Parse the meta data from string to JSON
  const metaObj = JSON.parse(props.meta);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ ...FONTS.body4, color: COLORS.black }}>
          {formattedDate}
        </Text>
        <Text style={{ ...FONTS.h4, color: COLORS.acomartBlue2 }}>
          {props.currency.toUpperCase()} ({props.price})
        </Text>
      </View>
      <View style={styles.descriptionWrapper}>
        <View style={styles.description}>
          <Text style={{ ...FONTS.h4 }}>Title: </Text>
          <Text style={{ color: COLORS.acomartBlue2, ...FONTS.body4 }}>
            {props.purpose === 'afrocinema_premier'
              ? props.model.title
              : props.model.name}
          </Text>
        </View>
        <View style={styles.description}>
          <Text style={{ ...FONTS.h4 }}>Payment purpose: </Text>
          <Text style={{ color: COLORS.acomartBlue2, ...FONTS.body4 }}>
            {props.purpose}
          </Text>
        </View>
        <View style={styles.description}>
          <Text style={{ ...FONTS.h4 }}>Customer's number: </Text>
          <Text style={{ color: COLORS.acomartBlue2, ...FONTS.body4 }}>
            {metaObj.customer_phone_number}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionsCard;

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    alignSelf: 'center',
    paddingVertical: wp('2.75%'),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: wp('2.5%'),
  },

  description: {
    flexDirection: 'row',
    marginBottom: wp('1.25%'),
  },
});
