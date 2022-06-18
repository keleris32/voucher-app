import React from 'react';
import { Platform, StyleSheet, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Home, Transactions, Payments, Settings } from '../screens';
import {
  HOME,
  TRANSACTIONS,
  PAYMENTS,
  SETTINGS,
} from '../constants/routeNames';
import { COLORS } from '../constants';
import HomeStack from '../ScreenStacks/HomeStack';
import TransactionsStack from '../ScreenStacks/TransactionsStack';
import SettingsStack from '../ScreenStacks/SettingsStack';

const Tab = createBottomTabNavigator();

const { height, width } = Dimensions.get('window');

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
            } else if (route.name === SETTINGS) {
              iconName = 'settings';
            }

            // return Icons component
            return (
              <Icons name={iconName} style={styles.iconStyles} color={color} />
            );
          },
        })}
        tabBarOptions={{
          keyboardHidesTabBar: true,
          activeTintColor: COLORS.acomartBlue2,
          inactiveTintColor: COLORS.gray,
          showLabel: true,
          showIcon: true,
          labelStyle: {
            fontSize: hp('1.75%'),
            marginBottom: hp('1.25%'),
            marginTop: hp('-1.25%'),
          },
          style: {
            height:
              (Platform.OS === 'ios') & (height > 700) ? hp('15%') : hp('10%'),
          },
        }}>
        <Tab.Screen
          name={HOME}
          component={HomeStack}
          listeners={({ navigation }) => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate(HOME, { screen: HOME });
            },
          })}
        />
        <Tab.Screen name={TRANSACTIONS} component={TransactionsStack} />
        <Tab.Screen name={SETTINGS} component={SettingsStack} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  iconStyles: {
    fontSize: hp('4.75%'),
  },
});

export default TabNavigator;
