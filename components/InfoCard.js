import { ImageBackground, Text, View, Pressable } from 'react-native';
import { Card, TouchableRipple } from 'react-native-paper';
import styles from "../styles.js";

export default function InfoCard({text1, text2, text3, style, onPress}) {
    return (
        <TouchableRipple elevation = {3} style={[styles.cardContainer, style]} onPress = {onPress}>
            <ImageBackground source={require("../assets/readingBook.jpg")} resizeMode='cover' styles={styles.image}>
                <View style = {styles.card}>
                    <Text style = {styles.text} >{text1}</Text>
                    <Text style = {styles.textLarge} >{text2}</Text>
                    <Text style = {styles.text}>{text3}</Text>
                </View>
            </ImageBackground>
        </TouchableRipple>
    );
}