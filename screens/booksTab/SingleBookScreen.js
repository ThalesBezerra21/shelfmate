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

export default function SingleBookScreen({ route, navigation }) {
    const book = route.params.book;

    const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
    const [open, setOpen] = useState(false);
    const [selectedBookType, setSelectedBookType] = useState('Physical');

    const onDismiss = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirm = useCallback(
        ({ startDate, endDate }) => {
            setOpen(false);
            setRange({ startDate, endDate });
        },
        [setOpen, setRange]
    );

    const goToDescription  = () => navigation.navigate("Book description", 
        {cover: lb.getImage(book), description: lb.getDescription(book), title: lb.getTitle(book), author: lb.getAuthor(book)})

    return (
        <MainWrapper title={book.volumeInfo.title}>
            <BookCard
                title={lb.getTitle(book)}
                author={lb.getAuthor(book)}
                image_link={lb.getImage(book)}
                message1={lb.getPublisher(book)}
                message2={lb.getPageCount(book)}
                style={{ marginTop: 30 }} />
            <Button mode = "outlined" style = {{marginTop: 30, alignSelf: 'center'}} onPress = {goToDescription}>
                + See description
            </Button>
            <View style={styles.roundedCard} elevation={3}>
                <Text style={[styles.text, { color: 'black', flex: 3, marginHorizontal: 10 }]}>
                    {
                        typeof range.startDate == 'undefined' || typeof range.endDate == 'undefined' ?
                            "Select the dates you started and finished the book" : `${readableDate(range.startDate)}\n${readableDate(range.endDate)}`
                    }
                </Text>
                <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined" style = {{flex: 1}}>
                    Dates
                </Button>
            </View>
            <View style={styles.roundedCard} elevation={3}>
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
            <DatePickerModal
                locale="en"
                mode="range"
                visible={open}
                onDismiss={onDismiss}
                startDate={range.startDate}
                endDate={range.endDate}
                onConfirm={onConfirm}
            />
        </MainWrapper>
    );
}