import MainWrapper from "../../components/MainWrapper";
import { useState, useCallback, useEffect } from "react";
import { Text, Searchbar } from "react-native-paper";
import InfoCard from "../../components/InfoCard";
import BookCard from "../../components/BookCard";
import styles from "../../styles";
import { getCurrentBooks } from "../../lib/ayncStorage";
import { useFocusEffect } from "@react-navigation/native";
import *  as lb from "../../lib/getInfoFromBooksJson";
import { readableDate } from "../../lib/date"
import { Button } from "react-native-paper";
import AlertCard from "../../components/AlertCard";
import  { countBooksReadInYear } from "../../lib/statistics"

export default function BooksScreen({ navigation }) {
    const [currentBooks, setCurrentBooks] = useState(null)
    const [booksRead, setBooksRead] = useState(0);

    useFocusEffect(
        useCallback(() => {
            refreshCurrentBooks()
            countBooksReadInYear(new Date().getFullYear()).then((res) => setBooksRead(res))
        })
    )

    const refreshCurrentBooks = () => getCurrentBooks().then((res) => setCurrentBooks(res));

    return (
        <MainWrapper title='Hello, Thales!'>
            <InfoCard 
                text1="You have read" 
                text2={booksRead + " book" + (booksRead === 1 ? "":"s")} 
                text3='this year' 
                style={{ marginTop: 30 }} />
            <Button 
                mode="outlined" 
                onPress={() => navigation.navigate('Search result')}
                style = {{marginTop: 30, width: '70%'}}    
            >
                    + Add books
            </Button>
            <Text style={[styles.textLarge, { color: 'black', marginTop: 30, marginLeft: 15 }]}>Current books</Text>
            {
                currentBooks != null && !(Array.isArray(currentBooks) && currentBooks.length === 0)?
                    currentBooks.reverse().map((bk, idx) => 
                        <BookCard style={{ marginTop: 30 }}
                            image_link={lb.getImage(bk.info)} title={lb.getTitle(bk.info)}
                            author={lb.getAuthor(bk.info)} 
                            message1={"Started at " + readableDate(new Date(bk.dateStarted))} 
                            message2={lb.getPageCount(bk.info)}
                            onPress={() => navigation.navigate("Current book info", {book: bk})}
                            key={idx}
                        />
                    ): <AlertCard text="You don't have any books added" style = {{marginTop: 30}}/>
            }
        </MainWrapper>
    );
}
