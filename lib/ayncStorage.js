import AsyncStorage from '@react-native-async-storage/async-storage';

const getBooks = async (key, errorMessage) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(errorMessage + e);
    }
}

const storeBooks = async (books, key, errorMessage) => {
    try {
        const jsonValue = JSON.stringify(books);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log(errorMessage + e);
    }
}

const addBook = async (newBook, getCurrent, store, errorMessage) => {
    try {
        const currentBooks = await getCurrent();
        if (currentBooks != null && Array.isArray(currentBooks)) {
            currentBooks.push(newBook);
            await store(currentBooks);
        } else {
            await store([newBook]);
        }
    } catch (error) {
        console.log(errorMessage + error);
    }
}

const deleteBookById = async (id, get, store, errorMessage) => {
    try {
        const currentBooks = await get();
        const deletedBook = currentBooks.map(bk => bk.info.id == id? bk:-1).filter(bk => bk != -1)[0];
        currentBooks.splice(currentBooks.map((bk, idx) => bk.info.id == id? idx:-1).filter(x => x != -1)[0], 1);
        await store(currentBooks);
        return deletedBook
    } catch (error) {
        console.log(errorMessage + error);
    }
}

const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
        console.log("Failed clearing: " + e);
    }
    console.log('Done clearing.')
}

const getCurrentBooks = async () => await getBooks('@current_Books', "Error getting current books: ")
const storeCurrentBooks = async (books) => await storeBooks(books, '@current_Books', 'Error storing current books: ')  
const addBookToCurrentBooks = async(newBook) => await addBook(newBook, getCurrentBooks, storeCurrentBooks, "Error adding books to current books: ") 
const deleteCurrentBookById = async (id) => await deleteBookById(id, getCurrentBooks, storeCurrentBooks, "Error deleting book: ") 

const getReadBooks = async () => await getBooks('@read_Books', "Error getting read books: ")
const storeReadBooks = async (books) => await storeBooks(books, '@read_Books', 'Error storing read books: ')  
const addBookToReadBooks = async(newBook) => await addBook(newBook, getReadBooks, storeReadBooks, "Error adding book to read books: ") 
const deleteReadBookById = async (id) => await deleteBookById(id, getReadBooks, storeReadBooks, "Error deleting book: ") 

const transferBookFromCurrentToRead = async (id, dateFinished) => {
    const book = await deleteCurrentBookById(id)
    book.dateFinished = dateFinished;
    await addBookToReadBooks(book)
}

const transferBookFromReadToCurrent = async (id) => {
    const book = await deleteReadBookById(id);
    delete book.dateFinished; 
    await addBookToCurrentBooks(book);
}

export { addBookToCurrentBooks, getCurrentBooks, deleteCurrentBookById, clearAll, transferBookFromReadToCurrent,
         addBookToReadBooks, getReadBooks, deleteReadBookById, transferBookFromCurrentToRead};