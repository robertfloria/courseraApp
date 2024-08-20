import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";

export default function ChangeThemeButton() {
    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPress={null} style={styles.button}><Text>CHANGE</Text></Pressable>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});