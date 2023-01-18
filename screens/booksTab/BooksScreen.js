import MainWrapper from "../../components/MainWrapper";
import { useState } from "react";
import { View } from "react-native";
import { Text, Searchbar } from "react-native-paper";
import InfoCard from "../../components/InfoCard";
import BookCard from "../../components/BookCard";
import { Picker } from '@react-native-picker/picker';
import styles from "../../styles";

export default function BooksScreen() {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState(2023);

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <MainWrapper title='My Books'>
            <View elevation = {1} style={{ borderWidth: 0, width: '100%', height: 50, marginBottom: 30, marginTop: 30 }}>
                <Picker
                    style={{ flex: 1 }}
                    selectedValue={selectedYear}
                    onValueChange={(itemValue) =>
                        setSelectedYear(itemValue)
                    }>
                    <Picker.Item label="2023" value={2023} />
                    <Picker.Item label="2022" value={2022} />
                </Picker>
            </View>

            <InfoCard text1="You have read" text2='21 books' text3='this year' />
            <Searchbar
                style={{ marginTop: 20 }}
                placeholder="+ Add Book"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <Text style={[styles.textLarge, { color: 'black', marginTop: 30, marginLeft: 15 }]}>January</Text>
            <BookCard style={{ marginTop: 30, marginBottom: 20 }} />
        </MainWrapper>
    );
}
