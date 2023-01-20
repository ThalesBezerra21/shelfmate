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
import { View } from "react-native";

export default function BooksScreen({ navigation }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [currentBooks, setCurrentBooks] = useState(null)

    const onChangeSearch = query => setSearchQuery(query);
    const onSubmitSearch = () => navigation.navigate('Search result', { search: searchQuery })

    useFocusEffect(
        useCallback(() => {
            refreshCurrentBooks()
        })
    )

    const refreshCurrentBooks = () => getCurrentBooks().then((res) => setCurrentBooks(res));

    return (
        <MainWrapper title='Hello, Thales!'>
            <InfoCard text1="You have read" text2='21 books' text3='this year' style={{ marginTop: 30 }} />
            <Searchbar
                style={{ marginTop: 20 }}
                placeholder="+ Add Books"
                onChangeText={onChangeSearch}
                value={searchQuery}
                onSubmitEditing={onSubmitSearch}
                onIconPress={onSubmitSearch}
            />
            <Text style={[styles.textLarge, { color: 'black', marginTop: 30, marginLeft: 15 }]}>Current books</Text>
            {
                currentBooks != null ?
                    currentBooks.map((bk) => 
                        <BookCard style={{ marginTop: 30 }}
                            image_link={lb.getImage(bk.info)} title={lb.getTitle(bk.info)}
                            author={lb.getAuthor(bk.info)} 
                            message1={"Started at " + readableDate(new Date(bk.dateStarted))} 
                            message2={lb.getPageCount(bk.info)}
                            onPress={() => navigation.navigate("Current book info", {book: bk})}
                        />
                    ): null
            }
        </MainWrapper>
    );
}
