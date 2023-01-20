import MainWrapper from "../../components/MainWrapper";
import { booksReadInYear, pageCountInAYear } from "../../lib/statistics";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import InfoCard from "../../components/InfoCard";
import InfoCardLarge from "../../components/InfoCardLarge";

export default function StatisticsPage(){

    const [booksRead, setBooksRead] = useState(0);
    const [pagesRead, setPagesRead] = useState(0);
    
    useFocusEffect(
        useCallback(() => {
            booksReadInYear(new Date().getFullYear()).then((res) => setBooksRead(res))
            pageCountInAYear(new Date().getFullYear()).then((res) => setPagesRead(res));
        })
    )

    return (
        <MainWrapper title = "Statistics">
            <InfoCardLarge
                text1="You have read" 
                text2={booksRead + " book" + (booksRead === 1 ? "":"s")} 
                text3={pagesRead + " page" + (pagesRead === 1 ? "":"s")} 
                text4='this year' 
                style={{ marginTop: 30 }} 
            />
        </MainWrapper>  
    );
}