import BookInfoPage from "../../components/BookInfoPage";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import *  as lb from "../../lib/getInfoFromBooksJson";
import { DatePickerModal } from 'react-native-paper-dates';
import { deleteCurrentBookById, transferBookFromCurrentToRead } from "../../lib/ayncStorage";
import { useState, useCallback } from "react";
import { readableDate } from "../../lib/date";
import styles from "../../styles";

export default function CurrentBookInfo({ route, navigation }) {
    
    const bk = route.params.book;

    const [date, setDate] = useState(new Date());;
    const [open, setOpen] = useState(false);

    const onDismissSingle = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = useCallback(
        (params) => {
            setOpen(false);
            setDate(params.date);
        },
        [setOpen, setDate]
    );

    const goToDescription = () => navigation.navigate("Book description",
        { cover: lb.getImage(bk.info), description: lb.getDescription(bk.info), title: lb.getTitle(bk.info), author: lb.getAuthor(bk.info) })

    const deleteBook = () => deleteCurrentBookById(bk.info.id).then(() => navigation.navigate('Home'))
    const markAsRead = () => transferBookFromCurrentToRead(bk.info.id, date).then(() => navigation.goBack())

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
            <View style={styles.roundedCard} elevation={3}>
                <Text style={[styles.text, { color: 'black', flex: 3, marginHorizontal: 10, textAlign: 'center' }]}>
                    Day you finished the book
                </Text>
                <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined" style={{ flex: 4 }}>
                    {readableDate(date)}
                </Button>
            </View>
            <DatePickerModal
                locale="en"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
            />
            <Button mode = 'outlined' onPress={markAsRead} style={{marginTop: 20, alignSelf: 'center'}}>Mark as read</Button>
        </BookInfoPage>
    );
}