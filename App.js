import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';

import Tabs from './src/navigations/tabs';
import {
  Transactions,
  Payments,
  SplashScreen,
  Login,
  SignUp,
} from './src/screens';

const Stack = createStackNavigator();

{
  /* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */
}

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName={'SplashScreen'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
      {/* <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Transactions" component={Transactions} />
        <Stack.Screen name="Payments" component={Payments} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default App;
