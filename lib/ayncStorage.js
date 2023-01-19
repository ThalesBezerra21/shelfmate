import AsyncStorage from '@react-native-async-storage/async-storage';

const storeCurrentBooks = async (books) => {
    try {
        const jsonValue = JSON.stringify(books);
        await AsyncStorage.setItem('@current_Books', jsonValue);
    } catch (e) {
        console.log("Error storing books: " + e);
    }
}

const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
        console.log("Failed clearing: " + e);
    }
    console.log('Done.')
}

const getCurrentBooks = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@current_Books')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log("Error getting books: " + e);
    }
}

const addBookToCurrentBooks = async (newBook) => {
    try {
        const currentBooks = await getCurrentBooks();
        if (currentBooks != null && Array.isArray(currentBooks)) {
            currentBooks.push(newBook);
            await storeCurrentBooks(currentBooks);
        } else {
            await storeCurrentBooks([newBook]);
        }
    } catch (error) {
        console.log("Error adding books: " + error);
    }
}

export { addBookToCurrentBooks, getCurrentBooks, clearAll };