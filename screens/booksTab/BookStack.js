import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BooksScreen from './BooksScreen';
import BooksSearchResult from './BooksSearchResult';

const Stack = createNativeStackNavigator();

export default function BookStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Books" component={BooksScreen} />
            <Stack.Screen name="Search result" component={BooksSearchResult} />
        </Stack.Navigator>
    );
}