import { getReadBooks } from './ayncStorage'

const booksRead = async () => {
    const books = await getReadBooks();
    if (books != null)
        return books.length;
    return 0;
}

const booksReadInYear = async (year) => {
    const books = await getReadBooks();
    return books == null ? 0 :
        books.filter(book => (new Date(book.dateFinished)).getFullYear() == year).length
}

const pageCountInAYear = async (year) => {
    try {
        const books = await getReadBooks();
        if (Array.isArray(books)) {
            let total = 0;
            for (let book of books) {
                if (typeof book.info.volumeInfo.pageCount !== "undefined" &&
                    new Date(book.dateFinished).getFullYear() == year) {
                    total += book.info.volumeInfo.pageCount;
                }
            }
            return total;
        }
        return 0;
    } catch (error) {
        console.log(error)
    }
}

export { booksRead, booksReadInYear, pageCountInAYear }