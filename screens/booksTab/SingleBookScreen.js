import MainWrapper from "../../components/MainWrapper";
import BookCard from "../../components/BookCard";
import *  as lb from "../../lib/getInfoFromBooksJson";
import { Text } from "react-native";

export default function SingleBookScreen({route}) {
    const book = route.params.book;

    return (
        <MainWrapper title = {book.volumeInfo.title}>
            <BookCard 
                title = {lb.getTitle(book)} 
                author = {lb.getAuthor(book)} 
                image_link = {lb.getImage(book)} 
                message1 = {lb.getPublisher(book)} 
                message2 = {lb.getPageCount(book)} 
                style = {{marginTop: 30}}/>
            <Text>{lb.getDescription(book)}</Text>
        </MainWrapper>
    );
}