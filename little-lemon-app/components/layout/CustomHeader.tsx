import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { ComponentType } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
interface CustomHeaderProps {
  LeftComponent?: ComponentType<any>;
  RightComponent?: ComponentType<any>;
  hasDrawer?: boolean;
}

export default function CustomHeader({
  RightComponent,
  LeftComponent,
  hasDrawer = true,
}: CustomHeaderProps) {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.leftItemContainer}>
          {hasDrawer && (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <MaterialIcons name="menu" size={24} color="black" />
            </TouchableOpacity>
          )}
          {LeftComponent && <LeftComponent />}
        </View>
        <View style={styles.titleContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/images/little-lemon-logo.png")}
            resizeMode="contain"
          />
          <Text>LIttle Lemon</Text>
        </View>
        <View style={styles.rightItemContainer}>
          {RightComponent && <RightComponent />}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  titleContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  leftItemContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  rightItemContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  image: {
    width: 50,
    height: 50,
  },
});
