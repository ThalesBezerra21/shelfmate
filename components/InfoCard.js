import { ImageBackground, Text, Pressable } from 'react-native';
import { Card } from 'react-native-paper';
import styles from "../styles.js";

export default function InfoCard({text1, text2, text3, style, onPress=undefined}) {
    return (
        <Card elevation = {3} style={[styles.cardContainer, style]}>
            <ImageBackground source={require("../assets/readingBook.jpg")} resizeMode='cover' styles={styles.image}>
                <Pressable 
                    style = {styles.card} 
                    onPress = {onPress} 
                    android_ripple={onPress != undefined? {color: "#f3f3f3"}: null}
                >
                    <Text style = {styles.text} >{text1}</Text>
                    <Text style = {styles.textLarge} >{text2}</Text>
                    <Text style = {styles.text}>{text3}</Text>
                </Pressable>
            </ImageBackground>
        </Card>
    );
}