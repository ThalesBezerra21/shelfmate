import * as React from 'react';
import { Avatar } from 'react-native-paper';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import styles from '../styles';

export default function AlertCard({text, style}) {
    return (
        <View elevation={1} style = {[styles.alertCard, style]}>
            <Avatar.Icon size = {48} icon = 'information'/>
            <Text style = {{color: 'black', fontFamily: 'Quicksand', textAlign: 'justify', marginHorizontal: 30}}>{text}</Text>
        </View>
    );
}

