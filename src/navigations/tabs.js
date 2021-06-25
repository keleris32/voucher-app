import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Home, Transactions, Payments, Settings} from '../screens';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-filled';
          } else if (route.name === 'Transactions') {
            iconName = 'history-toggle-off';
          } else if (route.name === 'Payments') {
            iconName = 'payment';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          // return Icons component
          return (
            <Icons name={iconName} style={styles.iconStyles} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        showLabel: true,
        showIcon: true,
        labelStyle: {
          fontSize: hp('1.75%'),
          marginBottom: hp('1.25%'),
          marginTop: hp('-1.25%'),
        },
        style: {
          height: hp('10%'),
        },
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Transactions" component={Transactions} />
      <Tab.Screen name="Payments" component={Payments} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconStyles: {
    fontSize: hp('4.75%'),
  },
});

export default Tabs;
