import {  StyleSheet } from 'react-native';
import "./global.js"

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
    },
  
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
    },
  
    titleContainer: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: global.width,
    },
  
    title: {
      fontFamily: 'Quicksand',
      fontWeight: '400',
      fontSize: 32,
      color: "#FFFFFF",
      textAlign: 'center',
      verticalAlign: 'middle',
      lineHeight: 120,
    },
  
    mainCard: {
      display: 'flex',
      flex: 5,
      width: global.width,
      backgroundColor: '#F5F5F5',
      boxShadow: '10px 10px 15px 5px rgba(0, 0, 0, 0.25)',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingLeft: '10%',
      paddingRight: '10%',
    },

    cardContainer: {
        width: global.width > 1000? 800: global.width*0.8,
        height: 180,
        display: 'flex',
        justifyContent: 'space-around',
        borderRadius: 25,
        overflow: 'hidden',
    },

    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: "100%", 
        height: "100%", 
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },

    text: {
        fontFamily: "Quicksand",
        fontSize: 15,
        color: 'white',
    },

    textLarge: {
        fontFamily: "Quicksand",
        fontSize: 28,
        color: 'white',
    },

    bookCard: {
        height: 180,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    bookCover: {
        flex: 2,
        backgroundColor: 'white',
    },

    bookCardContent: {
        flex: 3,
        display: 'flex',
        justifyContent: 'space-around',
        paddingLeft: 30,
    },

  });


  export default styles