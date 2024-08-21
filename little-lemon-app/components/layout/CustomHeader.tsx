import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { ComponentType } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedSafeAreaView } from "../ThemedSafeAreaView";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import LemonIcon from "@/assets/icons/LemonIcon";

interface CustomHeaderProps {
  LeftComponent?: ComponentType<any>;
  RightComponent?: ComponentType<any>;
  hasDrawer?: boolean;
  backgroundColor?: string;
}

export default function CustomHeader({
  RightComponent,
  LeftComponent,
  hasDrawer = true,
  backgroundColor,
}: CustomHeaderProps) {
  const navigation = useNavigation();
  const color = useThemeColor({}, "text");

  return (
    <ThemedSafeAreaView
      lightColor={backgroundColor}
      darkColor={backgroundColor}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.leftItemContainer}>
          {hasDrawer && (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <MaterialIcons name="menu" size={24} color={color} />
            </TouchableOpacity>
          )}
          {LeftComponent && <LeftComponent />}
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <LemonIcon width={30} height={30} />
          <ThemedText>Little Lemon</ThemedText>
        </ThemedView>
        <ThemedView style={styles.rightItemContainer}>
          {RightComponent && <RightComponent />}
        </ThemedView>
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  titleContainer: {
    flex: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
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
