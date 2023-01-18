import { StatusBar } from 'expo-status-bar';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import styles from "../styles.js"

export default function MainWrapper({title, children}) {
    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/page.jpg")} resizeMode='repeat' styles={styles.image}>
                <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
                    <View style={[styles.container, { backgroundColor: "rgba(0, 0, 0, 0.5)", flex: 1 }]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{title? title: "Booktracker.io"}</Text>
                        </View>
                        <View style={[styles.mainCard]}>
                            {children}
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
            <StatusBar style="auto" />
        </View>
    );
}
