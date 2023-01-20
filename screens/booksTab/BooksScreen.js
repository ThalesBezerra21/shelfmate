import { Text } from 'react-native';
import styles from "../../styles.js"
import Card from '../../components/InfoCard.js'
import BookCard from '../../components/BookCard.js';
import MainWrapper from '../../components/MainWrapper';
import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getReadBooks } from '../../lib/ayncStorage.js';
import *  as lb from "../../lib/getInfoFromBooksJson";
import { readableDate } from '../../lib/date.js';

export default function HomeScreen({navigation}) {

    const [readBooks, setReadBooks] = useState(null)

    useFocusEffect(
        useCallback(() => {
            refreshReadBooks()
        })
    )

    const refreshReadBooks = () => getReadBooks().then((res) => setReadBooks(res));

    return (
        <MainWrapper title={"My books"}>
            <Card text1="You have read" text2='3 books' text3='this month' style={{ marginTop: 30 }} />
            <Card text1="You have read" text2='22360 pages' text3='this year' style={{ marginTop: 30 }} />
            <Text style={[styles.textLarge, { color: 'black', marginTop: 30, marginLeft: 15 }]}>Recent books</Text>
            {
                readBooks != null ?
                    readBooks.map((bk) =>
                        <BookCard style={{ marginTop: 30 }}
                            image_link={lb.getImage(bk.info)} title={lb.getTitle(bk.info)}
                            author={lb.getAuthor(bk.info)}
                            message1={"Started at " + readableDate(new Date(bk.dateStarted))}
                            message2={lb.getPageCount(bk.info)}
                            onPress={() => navigation.navigate('Read book info', {book: bk})}
                        />)
                    : null
            }
        </MainWrapper>
    );
}
