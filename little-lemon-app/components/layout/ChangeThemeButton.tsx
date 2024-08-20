import { ThemeType } from "@/constants/ThemeType";
import { ThemeContext } from "@/store/context/ThemeContext";
import { useContext } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";

export default function ChangeThemeButton() {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        if (theme == ThemeType.light) {
            setTheme(ThemeType.dark)
        }
        else {
            setTheme(ThemeType.light)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPress={toggleTheme} style={styles.button}><Text>CHANGE</Text></Pressable>
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