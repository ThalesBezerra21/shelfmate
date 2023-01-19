import { ImageBackground, View, Text, ScrollView } from "react-native";
import styles from "../../styles";
import riverBook from '../../assets/readingBook.jpg'

export default function BookDescription({route}) {
    return (
        <ImageBackground resizeMode='cover' style = {styles.image} source = {{uri: route.params.cover}}>
            <ScrollView style={{flex: 1, width: '100%'}} contentContainerStyle={{flexGrow: 1}}>
            <View style = {[styles.container, {flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', width: '100%', paddingHorizontal: 30, paddingBottom: 30}]}>
                <Text style = {[styles.title]}>{route.params.title}</Text>
                <Text style = {[styles.title, {fontSize: 20}]}>{route.params.author}</Text>
                <Text style = {[styles.text, {marginTop: 30, lineHeight: 30, textAlign: 'justify'}]}>{route.params.description}</Text>
            </View>
            </ScrollView>
        </ImageBackground>
    );
}