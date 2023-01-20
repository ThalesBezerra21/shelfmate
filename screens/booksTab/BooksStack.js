import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './BooksScreen';
import ReadBookInfo from './ReadBookInfo';
import BookDescription from '../homeTab/BookDescription';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerTitle: "",
                headerTintColor: 'white',
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Read book info" component={ReadBookInfo} />
            <Stack.Screen name="Book description" component={BookDescription} />
        </Stack.Navigator>
    );
}