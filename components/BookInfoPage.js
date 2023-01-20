import MainWrapper from "./MainWrapper";
import BookCard from "./BookCard";
import *  as lb from "../lib/getInfoFromBooksJson";

export default function BookInfoPage({ book, children }) {
    return (
        <MainWrapper title={book.volumeInfo.title}>
            <BookCard
                title={lb.getTitle(book)}
                author={lb.getAuthor(book)}
                image_link={lb.getImage(book)}
                message1={lb.getPublisher(book)}
                message2={lb.getPageCount(book)}
                style={{ marginTop: 30 }} />
            {children}
        </MainWrapper>
    );
}