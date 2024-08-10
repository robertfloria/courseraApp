import { useEffect, useState } from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { getImage } from "../utils/functions";

interface MenuItem {
    title: string;
    price: number;
    description: string;
    imageName: string
}

export const FoodItem = ({ title, price, description, imageName }: MenuItem) => {
    const [image, setImage] = useState<ImageSourcePropType>();

    useEffect(() => {
        if (imageName) {
            const imagePath = getImage(imageName)
            setImage(imagePath);
        }
    }, [imageName]);

    return (
        <View style={styles.menuItemContainer}>
            <View style={styles.menuItemDetailsContainer}>
                <Text style={styles.menuItemTitle}>{title}</Text>
                <Text style={styles.menuItemDescription}>{description}</Text>
                <Text style={styles.menuItemPrice}>${price}</Text>
            </View>
            <Image
                style={styles.menuItemImage}
                source={image}
                resizeMode='cover'
            />
        </View>
    )
};

const styles = StyleSheet.create({
    menuItemContainer: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    menuItemDetailsContainer: {
        flex: 1,
        display: 'flex',
        height: '100%',
        justifyContent: 'space-between',
    },
    menuItemTitle: {
        fontSize: 20,
        color: "white",
    },
    menuItemPrice: {
        fontSize: 20,
        color: "white",
    },
    menuItemDescription: {
        fontSize: 20,
        color: "grey",
    },
    menuItemImage: {
        width: 200,
        height: 200
    }
});