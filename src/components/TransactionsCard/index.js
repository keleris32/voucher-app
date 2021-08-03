import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { format, parseISO } from 'date-fns';

import { COLORS, SIZES, FONTS } from '../../constants';

const TransactionsCard = props => {
  const formattedDate = format(parseISO(props.date), 'MMM do, yyy HH:mm a');
  //   console.log(JSON.stringify(props.meta, null, 2));

  const newMeta = Object.values(props.meta);
  console.log(newMeta);

  //   props.meta.map((item, index) => console.log(item));

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
          <Text style={{ ...FONTS.h4 }}>Reference: </Text>
          <Text style={{ color: COLORS.acomartBlue2, ...FONTS.body4 }}>
            {props.reference}
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
            {props.purpose}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionsCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: wp('2.75%'),
    // marginBottom: wp('2.5%'),
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
