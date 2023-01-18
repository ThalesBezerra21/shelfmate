const noCover = "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg"

const getTitle = book => book.volumeInfo.title;
const getImage = book => book.volumeInfo.imageLinks? book.volumeInfo.imageLinks.thumbnail? book.volumeInfo.imageLinks.thumbnail: noCover: noCover
const getAuthor = book => book.volumeInfo.authors? book.volumeInfo.authors.join(", "): "";
const getPublisher = book => book.volumeInfo.publisher? book.volumeInfo.publisher: "";
const getPageCount = book => book.volumeInfo.pageCount? book.volumeInfo.pageCount + " pages": "";
const getDescription = book => book.volumeInfo.description? book.volumeInfo.description: "";

export { getTitle, getImage, getAuthor, getPublisher, getPageCount, getDescription }