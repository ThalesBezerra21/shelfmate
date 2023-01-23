import { getReadBooks } from './ayncStorage'


const booksReadInYear = async (year) => {
    const books = await getReadBooks();
    return books == null ? null :
        books.filter(book => (new Date(book.dateFinished)).getFullYear() == year)
}

const countBooksReadInYear = async (year) => {
    const books = await booksReadInYear(year);
    return books == null ? 0 : books.length;
}

const pageCountInAYear = async (year) => {
    const books = await booksReadInYear(year);
    if (Array.isArray(books)) {
        let total = 0;
        for (let book of books) {
            if (typeof book.info.volumeInfo.pageCount !== "undefined")
                total += book.info.volumeInfo.pageCount;
        }
        return total;
    }
    return 0;
}

const countOfAuthorsInAYear = async (year) => {
    try {
        const books = await booksReadInYear(year);
        const authors = {};
        if (Array.isArray(books)) {
            for (let book of books) {
                if (typeof book.info.volumeInfo.authors !== "undefined") {
                    for (let author of book.info.volumeInfo.authors) {
                        if (authors[author]) {
                            authors[author] += 1
                        } else {
                            authors[author] = 1
                        }
                    }
                }
            }
        }
        return authors;
    } catch (error) {
        console.log(error)
    }
}

const favouriteAuthorInYear = async (year) => {
    const authors = await countOfAuthorsInAYear(year);
    if (authors.length == 0) return null;
    const arr = Object.entries(authors);
    let mostRead = ["", 0];
    for (let author of arr)
        if (author[1] > mostRead[1])
            mostRead = author;
    return mostRead
}

const booksByLengthInYear = async (year) => {
    try {
        const books = await booksReadInYear(year);
        const booksLength = {};
        if (Array.isArray(books)) {
            for (let book of books) {
                if (typeof book.info.volumeInfo.pageCount !== 'undefined') {
                    booksLength[book.info.volumeInfo.title] = book.info.volumeInfo.pageCount;
                }
            }
        }
        return booksLength;
    } catch (error) {
        console.log("Erro in getting books length: " + e);
    }

}

const getLargestBookInYear = async (year) => {
    const books = await booksByLengthInYear(year);
    let largest = ["", 0];
    const arr = Object.entries(books);
    for (let book of arr)
        if (book[1] > largest[1])
            largest = book;
    return largest;
}

export { booksReadInYear, countBooksReadInYear, pageCountInAYear, countOfAuthorsInAYear, favouriteAuthorInYear, getLargestBookInYear }