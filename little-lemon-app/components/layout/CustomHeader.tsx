import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { ComponentType } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import LemonIcon from "@/assets/icons/LemonIcon";

interface CustomHeaderProps {
  LeftComponent?: ComponentType<any>;
  RightComponent?: ComponentType<any>;
  hasDrawer?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

export default function CustomHeader({
  RightComponent,
  LeftComponent,
  hasDrawer = true,
  backgroundColor,
  textColor,
}: CustomHeaderProps) {
  const navigation = useNavigation();
  const color = useThemeColor({}, "text");

  return (
    <ThemedView lightColor={backgroundColor} darkColor={backgroundColor}>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.leftItemContainer}>
            {hasDrawer && (
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <MaterialIcons
                  name="menu"
                  size={24}
                  color={textColor ?? color}
                />
              </TouchableOpacity>
            )}
            {LeftComponent && <LeftComponent />}
          </View>
          <View style={styles.titleContainer}>
            <LemonIcon width={30} height={30} />
            <ThemedText lightColor={textColor} darkColor={textColor}>
              Little Lemon
            </ThemedText>
          </View>
          <View style={styles.rightItemContainer}>
            {RightComponent && <RightComponent />}
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
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
