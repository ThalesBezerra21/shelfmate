import { ImageBackground, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import styles from "../styles.js";

export default function InfoCardLarge({text1, text2, text3, text4, style}) {
    return (
        <Card elevation = {3} style={[styles.cardContainer, {height: 350}, style]}>
            <ImageBackground source={require("../assets/riverBook.jpg")} resizeMode='cover' styles={styles.image}>
                <View style = {styles.card}>
                    <Text style = {styles.text} >{text1}</Text>
                    <Text style = {styles.textLarge} >{text2}</Text>
                    <Text style = {styles.text} >and a total of</Text>
                    <Text style = {styles.textLarge} >{text3}</Text>
                    <Text style = {styles.text}>{text4}</Text>
                </View>
            </ImageBackground>
        </Card>
    );
}