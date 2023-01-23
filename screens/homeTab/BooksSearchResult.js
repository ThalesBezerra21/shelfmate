import MainWrapper from "../../components/MainWrapper";
import { ActivityIndicator } from "react-native";
import { Searchbar } from "react-native-paper";
import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard";
import *  as lb from "../../lib/getInfoFromBooksJson";
import { Text } from "react-native";
import AlertCard from "../../components/AlertCard";

export default function BooksSearchResult({ route, navigation }) {

    const [searchQuery, setSearchQuery] = useState(null);
    const [searchResult, setSearchResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const onChangeSearch = query => setSearchQuery(query);

    const searchBooks = () => {
        const getSearchResults = async () => {
            const query = searchQuery.toLowerCase().split(" ").join("+")
            console.log("Query: " + query)
            return await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        }
        getSearchResults()
            .then(res => {
                try {
                    return res.json();
                } catch (error) {
                    console.log("Erro no fetch: " + error);
                }
            })
            .then(resJson => {
                try {
                    setLoading(false);
                    setSearchResult(resJson);
                } catch (error) {
                    console.log("Erro no json: " + error);
                }
            });
    }

    return (
        <MainWrapper title="Search results">
            <Searchbar
                style={{ marginTop: 20, backgroundColor: '#ececec' }}
                placeholder="+ Add Book"
                value={searchQuery}
                onChangeText={onChangeSearch}
                onSubmitEditing={() => {
                    setLoading(true)
                    searchBooks();
                }}
                onIconPress={() => {
                    setLoading(true)
                    searchBooks();
                }}
            />
            {
                ! loading?
                searchResult != null && typeof searchResult.items != 'undefined' ?
                    searchResult.items.map((book, idx) =>
                        <BookCard style={{ marginTop: 20 }}
                            title={lb.getTitle(book)}
                            author={lb.getAuthor(book)}
                            image_link={lb.getImage(book)}
                            message1={lb.getPublisher(book)}
                            message2={lb.getPageCount(book)}
                            onPress={() => navigation.navigate('Single book', { book: book })}
                            key = {idx}
                        />
                    ): <AlertCard style = {{marginTop: 20}} text="Search and add the books you're currently reading"/> 
                : <ActivityIndicator size="large" style={{ alignSelf: 'center', marginTop: 100 }} />
            }
        </MainWrapper>
    );
}