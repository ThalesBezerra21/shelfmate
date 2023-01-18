import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/homeTab/HomeScreen';
import BookStack from './screens/booksTab/BookStack';
import "./global.js"
import { useFonts } from 'expo-font';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
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
        barStyle={{ backgroundColor: '#455A64' }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="My Books"
          component={BookStack}
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