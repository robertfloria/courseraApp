import { ComponentType } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
interface CustomHeaderProps {
  LeftComponent?: ComponentType<any>;
  RightComponent?: ComponentType<any>;
}

export default function CustomHeader({
  LeftComponent,
  RightComponent,
}: CustomHeaderProps) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.leftItemContainer}>
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
