import { ThemedSearchBar } from "@/components/ThemedSearchBar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Image, StyleSheet } from "react-native";

type Props = {
    setSearchBarText: (arg: any) => any,
    searchBarText: string
};

export default function Presentation({ setSearchBarText, searchBarText }: Props) {
    const handleSearchChange = (text: string) => {
        setSearchBarText(text);
    };

    const background = useThemeColor({}, "secondColor");

    return (
        <ThemedView lightColor={background} darkColor={background} style={styles.container}>
            <ThemedView style={styles.presentationContainer}>
                <ThemedText style={{ flex: 1 }}>asldsmsaldsajk sandlsakndlaskdklasdnka asnkdaslkdaslknd akndaslkdnas</ThemedText>
                <Image
                    style={styles.image}
                    source={require('../../../assets/images/presentationImage.jpg')}
                    resizeMode="contain"
                />
            </ThemedView>
            <ThemedSearchBar
                placeholder="Search"
                onChangeText={handleSearchChange}
                value={searchBarText}
            />
        </ThemedView>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        gap: 10,
        padding: 10
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8
    },
    presentationContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'transparent'
    }
});
