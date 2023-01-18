import MainWrapper from "../../components/MainWrapper";
import { Text, ActivityIndicator } from "react-native";
import { Searchbar } from "react-native-paper";
import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard";
const noCover = "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg"


export default function BooksSearchResult({ route }) {

    const [searchQuery, setSearchQuery] = useState(route.params.search);
    const [searchResult, setSearchResult] = useState(null);

    const onChangeSearch = query => setSearchQuery(query);

    useEffect(() => searchBooks(), []);

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
                    return setSearchResult(resJson);
                } catch (error) {
                    console.log("Erro no json: " + error);
                }
            });
    }

    return (
        <MainWrapper title="Search results">
            <Searchbar
                style={{ marginTop: 20 }}
                placeholder="+ Add Book"
                value={searchQuery}
                onChangeText={onChangeSearch}
                onSubmitEditing={() => {
                    setSearchResult(null);
                    searchBooks();
                }}
                onIconPress={() => {
                    setSearchResult(null);
                    searchBooks();
                }}
            />
            {
                searchResult != null && typeof searchResult.items != 'undefined' ?
                    searchResult.items
                    
                    .map((book) => {
                        return (<BookCard style={{ marginTop: 20 }}
                            title={book["volumeInfo"]["title"]} 
                            author = {book.volumeInfo.authors? book["volumeInfo"]["authors"].join(", "): ""}
                            image_link={book.volumeInfo.imageLinks? book.volumeInfo.imageLinks.thumbnail? book.volumeInfo.imageLinks.thumbnail: noCover: noCover}
                            message1={book.volumeInfo.publisher? book.volumeInfo.publisher: ""}
                            message2={book.volumeInfo.pageCount? book.volumeInfo.pageCount + " pages": ""}
                        />);
                    }
                    ) : <ActivityIndicator size="large" style={{alignSelf: 'center', marginTop: 100}}/>
            }
        </MainWrapper>
    );
}