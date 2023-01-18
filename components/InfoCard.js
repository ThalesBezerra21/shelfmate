import { ImageBackground, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import styles from "../styles.js";

export default function InfoCard({text1, text2, text3, style}) {
    return (
        <Card elevation = {3} style={[styles.cardContainer, style]}>
            <ImageBackground source={require("../assets/readingBook.jpg")} resizeMode='cover' styles={styles.image}>
                <View style = {styles.card}>
                    <Text style = {styles.text} >{text1}</Text>
                    <Text style = {styles.textLarge} >{text2}</Text>
                    <Text style = {styles.text}>{text3}</Text>
                </View>
            </ImageBackground>
        </Card>
    );
}