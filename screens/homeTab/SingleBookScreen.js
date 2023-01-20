import *  as lb from "../../lib/getInfoFromBooksJson";
import { Text, View } from "react-native";
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { useState, useCallback } from "react";
import { Picker } from '@react-native-picker/picker';
import 'intl';
import 'intl/locale-data/jsonp/en';
import styles from "../../styles";
import { readableDate } from "../../lib/date";
import { addBookToCurrentBooks } from "../../lib/ayncStorage";
import BookInfoPage from "../../components/BookInfoPage";

export default function SingleBookScreen({ route, navigation }) {
    const book = route.params.book;

    const [date, setDate] = useState(new Date());;
    const [open, setOpen] = useState(false);
    const [selectedBookType, setSelectedBookType] = useState('Physical');

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
        { cover: lb.getImage(book), description: lb.getDescription(book), title: lb.getTitle(book), author: lb.getAuthor(book) })

    return (
        <BookInfoPage book = {book}>
            <Button mode="outlined" style={{ marginTop: 30, alignSelf: 'center' }} onPress={goToDescription}>
                + See description
            </Button>
            <View style={styles.roundedCard} elevation={3}>
                <Text style={[styles.text, { color: 'black', flex: 3, marginHorizontal: 10, textAlign: 'center' }]}>
                    Day you started the book
                </Text>
                <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined" style={{ flex: 4 }}>
                    {readableDate(date)}
                </Button>
            </View>
            <View style={[styles.roundedCard, { marginTop: 10 }]} elevation={3}>
                <Text style={[styles.text, { color: 'black', flex: 3, marginHorizontal: 10, textAlign: "center" }]}>
                    What was the type of the book?
                </Text>
                <Picker
                    style={{ flex: 4 }}
                    selectedValue={selectedBookType}
                    onValueChange={(itemValue) =>
                        setSelectedBookType(itemValue)
                    }>
                    <Picker.Item label="Physical" value="Physical" />
                    <Picker.Item label="Ebook" value="Ebook" />
                    <Picker.Item label="Audio" value="Audio" />
                </Picker>
            </View>
            <Button mode="outlined" style={{ marginTop: 30, alignSelf: 'center' }}
                onPress={() => addBookToCurrentBooks({ dateStarted: date, bookType: selectedBookType, info: book })
                    .then(() => navigation.navigate("Home"))}>
                + Add book
            </Button>
            <DatePickerModal
                locale="en"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
            />
        </BookInfoPage>
    );
}