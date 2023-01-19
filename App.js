import * as React from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BooksStack from './screens/booksTab/BooksStack';
import HomeStack from './screens/homeTab/HomeStack';
import "./global.js"
import { useFonts } from 'expo-font';
import {
  en,
  registerTranslation,
} from 'react-native-paper-dates'
registerTranslation('en', en)

const Tab = createMaterialBottomTabNavigator();

export default function App() {

  NavigationBar.setBackgroundColorAsync("#455A64");

  const [fontsLoaded] = useFonts({
    'Quicksand': require('./assets/fonts/Quicksand-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
        inactiveColor="#CFD8DC"
        activeColor="#212121"
        labeled={false}
        barStyle={{ backgroundColor: '#455A64', height: 70 }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="BooksStack"
          component={BooksStack}
          options={{
            tabBarLabel: 'Books',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="book" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
