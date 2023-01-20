import { Text } from 'react-native';
import { Button } from 'react-native-paper';
import styles from "../../styles.js"
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
            <Text style={[styles.textLarge, { color: 'black', marginTop: 30, marginLeft: 15 }]}>Recently finished</Text>
            {
                readBooks != null ?
                    readBooks.reverse().map((bk) =>
                        <BookCard style={{ marginTop: 30 }}
                            image_link={lb.getImage(bk.info)} title={lb.getTitle(bk.info)}
                            author={lb.getAuthor(bk.info)}
                            message1={"Finished at " + readableDate(new Date(bk.dateFinished))}
                            message2={lb.getPageCount(bk.info)}
                            onPress={() => navigation.navigate('Read book info', {book: bk})}
                        />)
                    : null
            }
            <Button mode = 'outlined' style = {{alignSelf: 'center', marginTop: 30}}>+ See all books finished</Button>
        </MainWrapper>
    );
}
