import { Portal, Dialog, Text, Button } from "react-native-paper";

export default function CustomDialog({visible, setVisible, action, labelAction, text}) {

    const hideDialog = () => setVisible(false);
    const onPress = () => {
        action();
        hideDialog();
    }

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Content>
                    <Text style={{ fontSize: 15 }}>{text}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancel</Button>
                    <Button onPress={onPress}>{labelAction}</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );

}