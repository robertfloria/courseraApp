import { ComponentType } from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
interface CustomHeaderProps {
    LeftComponent?: ComponentType<any>,
    RightComponent?: ComponentType<any>
}

export default function CustomHeader({ LeftComponent, RightComponent }: CustomHeaderProps) {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                {
                    LeftComponent && <LeftComponent />
                }
                <View style={styles.titleContainer}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/little-lemon-logo.png')}
                        resizeMode='contain'
                    />
                    <Text>LIttle Lemon</Text>
                </View>
                {RightComponent && <RightComponent />}
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Space between components
        paddingHorizontal: 15,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 50,
        height: 50,
    }
});