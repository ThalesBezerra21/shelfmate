import MainWrapper from "../../components/MainWrapper";
import BookCard from "../../components/BookCard";
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

export default function SingleBookScreen({ route, navigation }) {
    const book = route.params.book;

    const [date, setDate] = useState(undefined);;
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
        <MainWrapper title={book.volumeInfo.title}>
            <BookCard
                title={lb.getTitle(book)}
                author={lb.getAuthor(book)}
                image_link={lb.getImage(book)}
                message1={lb.getPublisher(book)}
                message2={lb.getPageCount(book)}
                style={{ marginTop: 30 }} />
            <Button mode="outlined" style={{ marginTop: 30, alignSelf: 'center' }} onPress={goToDescription}>
                + See description
            </Button>
            <View style={styles.roundedCard} elevation={3}>
                <Text style={[styles.text, { color: 'black', flex: 3, marginHorizontal: 10 }]}>
                    {
                        typeof date == 'undefined' ?
                            "Set date you started the book" : `${readableDate(date)}}`
                    }
                </Text>
                <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined" style={{ flex: 1 }}>
                    Dates
                </Button>
            </View>
            <View style={[styles.roundedCard, {marginTop: 10}]} elevation={3}>
                <Text style={[styles.text, { color: 'black', flex: 3, marginHorizontal: 10 }]}>
                    What was the type of the book?
                </Text>
                <Picker
                    style={{ flex: 3 }}
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
                    onPress={() => addBookToCurrentBooks(book).then(() => navigation.navigate("Home"))}>
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
        </MainWrapper>
    );
}