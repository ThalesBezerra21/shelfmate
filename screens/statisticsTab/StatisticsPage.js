import MainWrapper from "../../components/MainWrapper";
import { pageCountInAYear, countBooksReadInYear, favouriteAuthorInYear, getLargestBookInYear } from "../../lib/statistics";
import { setUserName } from "../../lib/ayncStorage";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import InfoCard from "../../components/InfoCard";
import InfoCardLarge from "../../components/InfoCardLarge";
import { TextInput, Text, Button, Divider } from "react-native-paper";
import { View } from "react-native";
import CustomDialog from "../../components/CustomDialog";
import styles from "../../styles";
import { clearAll } from "../../lib/ayncStorage";

export default function StatisticsPage({ navigation }) {

    const [booksRead, setBooksRead] = useState(0);
    const [pagesRead, setPagesRead] = useState(0);
    const [favouriteAuthor, setFavouriteAuthor] = useState(null);
    const [largestBook, setLargestBook] = useState(null);
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [text, setText] = useState("");
    const [visibleChangeUserDialog, setVisibleChangeUserDialog] = useState(false);

    const showDialog = () => setVisibleDialog(true);
    const clearAllAction = () => clearAll().then(navigation.navigate("HomeStack"));


    useFocusEffect(
        useCallback(() => {
            const year = new Date().getFullYear();
            countBooksReadInYear(year).then((res) => setBooksRead(res));
            pageCountInAYear(year).then((res) => setPagesRead(res));
            favouriteAuthorInYear(year).then((res) => setFavouriteAuthor(res));
            //getLargestBookInYear(year).then((res) => setLargestBook(res));
        })
    )

    return (
        <MainWrapper title="Statistics">
            <InfoCardLarge
                text1="You have read"
                text2={booksRead + " book" + (booksRead === 1 ? "" : "s")}
                text3={pagesRead + " page" + (pagesRead === 1 ? "" : "s")}
                text4='this year'
                style={{ marginTop: 30 }}
            />
            {
                favouriteAuthor != null && favouriteAuthor[1] != 0 ?
                    <InfoCard
                        text1="Your favourite author was"
                        text2={favouriteAuthor[0]}
                        text3={`with ${favouriteAuthor[1]} book${favouriteAuthor[1] == 1 ? "" : "s"} read`}
                        style={{ marginTop: 30 }}
                    /> : null
            }
            {
                largestBook != null && largestBook[1] != 0 ?
                    <InfoCard
                        text1="The largest book you read was"
                        text2={largestBook[0]}
                        text3={`with ${largestBook[1]} pages`}
                        style={{ marginTop: 30 }}
                    /> : null
            }
            <Divider horizontalInset={true}/>
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', width: '100%' }]}>
                <TextInput
                    label="User name"
                    mode='outlined'
                    style={{ width: '70%', marginTop: 70 }}
                    value={text}
                    onChangeText={text => setText(text)}
                />
                <Button mode='outlined' style={{ marginTop: 20 }} onPress={() => text == "" ? null : setVisibleChangeUserDialog(true)}>Change user name</Button>
                <Divider horizontalInset={true}/>
                <Button mode='outlined' style={{ marginTop: 70 }} onPress={showDialog}>Clear all data</Button>
                <CustomDialog
                    text={`Do you want to change your user name to "${text}"?`}
                    labelAction='Change user name'
                    action={() => setUserName(text)} visible={visibleChangeUserDialog} setVisible={setVisibleChangeUserDialog}
                />
                <CustomDialog
                    text='Do you want to clear all your data? This action is irreversable.'
                    labelAction='Clear all data'
                    action={clearAllAction} visible={visibleDialog} setVisible={setVisibleDialog}
                />
            </View>
        </MainWrapper>
    );
}