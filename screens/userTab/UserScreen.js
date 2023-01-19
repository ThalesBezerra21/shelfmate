import { View } from "react-native";
import { Button } from "react-native-paper";
import styles from "../../styles";
import { clearAll } from "../../lib/ayncStorage";

export default function UserScreen({navigation}){
    return (
        <View style = {[styles.container, {justifyContent: 'center'}]}>
            <Button mode = 'outlined' onPress={() => clearAll().then(navigation.navigate("HomeStack"))}>Clear all data</Button>
        </View>
    );
}