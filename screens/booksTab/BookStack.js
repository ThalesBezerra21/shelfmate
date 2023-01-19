import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BooksScreen from './BooksScreen';
import BooksSearchResult from './BooksSearchResult';
import SingleBookScreen from './SingleBookScreen';
import BookDescription from './BookDescription';

const Stack = createNativeStackNavigator();

export default function BookStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerTitle: "",
                headerTintColor: 'white',
            }}
        >
            <Stack.Screen name="Books" component={BooksScreen} />
            <Stack.Screen name="Search result" component={BooksSearchResult} />
            <Stack.Screen name="Single book" component={SingleBookScreen} />
            <Stack.Screen name="Book description" component={BookDescription} />
        </Stack.Navigator>
    );
}