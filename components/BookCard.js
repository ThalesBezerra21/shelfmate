import { Image, ImageBackground, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import styles from "../styles.js";

export default function BookCard({style, image_link, title, author, message1, message2, onPress}) {
    return (
        <Card elevation = {5} style={[styles.cardContainer, style]} onPress={onPress}>
            <ImageBackground source={require("../assets/glassBook.jpg")} resizeMode='cover' styles={styles.image}>
                <View style={[styles.bookCard, {backgroundColor: 'rgba(0, 0, 0, 0.7)'}]}>
                    <Image style={styles.bookCover} resizeMode='cover' source={{ uri: image_link }} />
                    <View style={styles.bookCardContent}>
                        <View>
                            <Text style={[styles.textLarge, { fontSize: 17 }]}>{title}</Text>
                            <Text style={[styles.text, { fontSize: 12 }]}>{author}</Text>
                        </View>
                        <View>
                            <Text style={[styles.text, { fontSize: 12 }]}>{message1}</Text>
                            <Text style={[styles.text, { fontSize: 12 }]}>{message2}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </Card>
    )
}