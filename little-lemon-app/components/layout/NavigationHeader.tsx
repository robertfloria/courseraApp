import { Image, StyleSheet, Text, View } from "react-native";

export default function NavigationHeader() {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Image
                    style={styles.image}
                    source={require('../../assets/images/little-lemon-logo.png')}
                    resizeMode='contain'
                />
                <Text>LIttle Lemon</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 50,
        height: 50
    }
});