import { View } from "react-native";
import { Button } from "react-native-paper";
import styles from "../../styles";
import { clearAll } from "../../lib/ayncStorage";
import { useState } from "react";
import MainWrapper from '../../components/MainWrapper';
import CustomDialog from "../../components/CustomDialog";

export default function UserScreen({ navigation }) {

    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const clearAllAction = () => clearAll().then(navigation.navigate("HomeStack"));

    return (
        <MainWrapper title='Settings'>
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', width: '100%' }]}>
                <Button mode='outlined' onPress={showDialog}>Clear all data</Button>
                <CustomDialog 
                    text='Do you want to clear all your data? This action is irreversable.'
                    labelAction='Clear all data'
                    action={clearAllAction} visible={visible} setVisible={setVisible}    
                />
            </View>
        </MainWrapper>
    );
}