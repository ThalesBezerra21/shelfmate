import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BooksScreen from './BooksScreen';

const Stack = createNativeStackNavigator();

export default function BookStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Books" component={BooksScreen} />
        </Stack.Navigator>
    );
}