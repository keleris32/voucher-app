import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Home, Transactions, Payments, Settings } from '../screens';
import { HOME, TRANSACTIONS, PAYMENTS } from '../constants/routeNames';
import { COLORS } from '../constants';
import AnimatedBottomSheet from '../components/AnimatedBottomSheet';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === HOME) {
              iconName = 'home-filled';
            } else if (route.name === TRANSACTIONS) {
              iconName = 'history-toggle-off';
            } else if (route.name === PAYMENTS) {
              iconName = 'payment';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            }

            // return Icons component
            return (
              <Icons name={iconName} style={styles.iconStyles} color={color} />
            );
          },
          tabBarVisible: false,
        })}
        tabBarOptions={{
          activeTintColor: COLORS.red,
          inactiveTintColor: COLORS.gray,
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
        <Tab.Screen name={HOME} component={Home} />
        <Tab.Screen name={TRANSACTIONS} component={Transactions} />
        <Tab.Screen name={PAYMENTS} component={Payments} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
      {/* <AnimatedBottomSheet /> */}
    </>
  );
};

const styles = StyleSheet.create({
  iconStyles: {
    fontSize: hp('4.75%'),
  },
});

export default TabNavigator;
