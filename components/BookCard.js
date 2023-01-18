import { Image, ImageBackground, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import styles from "../styles.js";

export default function BookCard({style}) {
    return (
        <Card elevation = {5} style={[styles.cardContainer, style]}>
            <ImageBackground source={require("../assets/glassBook.jpg")} resizeMode='cover' styles={styles.image}>
                <View style={[styles.bookCard, {backgroundColor: 'rgba(0, 0, 0, 0.7)'}]}>
                    <Image style={styles.bookCover} resizeMode='cover' source={{ uri: 'https://m.media-amazon.com/images/I/51EhcIq9VbL.jpg' }} />
                    <View style={styles.bookCardContent}>
                        <View>
                            <Text style={[styles.textLarge, { fontSize: 17 }]}>Eragon</Text>
                            <Text style={[styles.text, { fontSize: 12 }]}>Christopher Paulline</Text>
                        </View>
                        <View>
                            <Text style={[styles.text, { fontSize: 12 }]}>Finished in May, 15</Text>
                            <Text style={[styles.text, { fontSize: 12 }]}>466 Pages</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </Card>
    )
}