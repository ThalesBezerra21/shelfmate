import BookInfoPage from "../../components/BookInfoPage";
import { View } from "react-native";
import { Button } from "react-native-paper";
import *  as lb from "../../lib/getInfoFromBooksJson";
import { deleteReadBookById, transferBookFromReadToCurrent } from "../../lib/ayncStorage";
import { StackActions } from '@react-navigation/native';

export default function ReadBookInfo({ route, navigation }) {
    
    const bk = route.params.book;

    const goToDescription = () => navigation.navigate("Book description",
        { cover: lb.getImage(bk.info), description: lb.getDescription(bk.info), title: lb.getTitle(bk.info), author: lb.getAuthor(bk.info) })

    const deleteBook = () => deleteReadBookById(bk.info.id).then(() => navigation.navigate('Home'))
    const markAsRead = () => transferBookFromReadToCurrent(bk.info.id)
        .then(() => {
            navigation.dispatch(StackActions.pop(1));
            navigation.navigate('HomeStack');
        })

    return (
        <BookInfoPage book={bk.info}>
            <View style={{ flexDirection: 'row', width: '100%', marginTop: 30, justifyContent: "space-around" }}>
                <Button mode="outlined" onPress={goToDescription}>
                    + See description
                </Button>
                <Button mode='outlined' onPress={deleteBook}>
                    Delete
                </Button>
            </View>
            <Button mode = 'outlined' onPress={markAsRead} style={{marginTop: 20, alignSelf: 'center'}}>Mark as unread</Button>
        </BookInfoPage>
    );
}