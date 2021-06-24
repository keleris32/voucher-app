import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialIcons';
import 

import {Home, Transactions, Payments, Settings} from '../screens';
import {COLORS, icons, images} from '../constants';

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
          return <Icons name={iconName} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        showLabel: true,
        showIcon: true,
        labelStyle: {
          fontSize: 12,
          marginBottom: 10,
          marginTop: -10,
        },
        style: {
          height: 80,
        },
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Transactions" component={Transactions} />
      <Tab.Screen name="Payments" component={Payments} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default Tabs;
