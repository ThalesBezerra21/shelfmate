import MainWrapper from "../../components/MainWrapper";
import { pageCountInAYear, countBooksReadInYear, favouriteAuthorInYear, getLargestBookInYear } from "../../lib/statistics";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import InfoCard from "../../components/InfoCard";
import InfoCardLarge from "../../components/InfoCardLarge";
import { Divider, Text } from "react-native-paper";

export default function StatisticsPage() {

    const [booksRead, setBooksRead] = useState(0);
    const [pagesRead, setPagesRead] = useState(0);
    const [favouriteAuthor, setFavouriteAuthor] = useState(null);
    const [largestBook, setLargestBook] = useState(null);

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
                favouriteAuthor != null && favouriteAuthor[1] != 0?
                    <InfoCard
                        text1="Your favourite author was"
                        text2={favouriteAuthor[0]}
                        text3={`with ${favouriteAuthor[1]} book${favouriteAuthor[1] == 1? "":"s"} read`}
                        style={{ marginTop: 30 }}
                    />:null
            }
            {
                largestBook != null && largestBook[1] != 0?
                <InfoCard
                    text1="The largest book you read was"
                    text2={largestBook[0]}
                    text3={`with ${largestBook[1]} pages`}
                    style={{ marginTop: 30 }}
                />:null
            }
        </MainWrapper>
    );
}