import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import BooksSearchResult from './BooksSearchResult';
import SingleBookScreen from './SingleBookScreen';
import BookDescription from './BookDescription';
import CurrentBookInfo from './CurrentBookInfo';

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
            <Stack.Screen name="Search result" component={BooksSearchResult} />
            <Stack.Screen name="Single book" component={SingleBookScreen} />
            <Stack.Screen name="Book description" component={BookDescription} />
            <Stack.Screen name="Current book info" component={CurrentBookInfo} />
        </Stack.Navigator>
    );
}