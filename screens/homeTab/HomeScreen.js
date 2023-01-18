import { Text } from 'react-native';
import styles from "../../styles.js"
import Card from '../../components/InfoCard.js'
import BookCard from '../../components/BookCard.js';
import MainWrapper from '../../components/MainWrapper';

export default function HomeScreen() {
    return (
        <MainWrapper>
            <Text style={[styles.title, { color: 'black', fontSize: 28, marginLeft: 15 }]}>Hello, Thales!</Text>
            <Card text1="You have read" text2='3 books' text3='this month' style={{ marginTop: 30 }}/>
            <Card text1="You have read" text2='22360 pages' text3='this year' style={{ marginTop: 30 }} />
            <Text style={[styles.textLarge, { color: 'black', marginTop: 30, marginLeft: 15 }]}>Most recent book</Text>
            <BookCard style={{ marginTop: 30, marginBottom: 20 }} 
                      image_link = "https://m.media-amazon.com/images/I/51EhcIq9VbL.jpg" title="Eragon"
                      author={"Christopher Paullini"} message1 = "Finished in March, 15" message2="466 pages"/>
        </MainWrapper>
    );
}
