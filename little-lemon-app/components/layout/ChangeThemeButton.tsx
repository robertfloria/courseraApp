import { ThemeType } from "@/constants/ThemeType";
import { ThemeContext } from "@/store/context/ThemeContext";
import { useContext } from "react";
import { Pressable, SafeAreaView, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export default function ChangeThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  const firstColor = useThemeColor({}, "firstColor");

  const toggleTheme = () => {
    if (theme == ThemeType.light) {
      setTheme(ThemeType.dark);
    } else {
      setTheme(ThemeType.light);
    }
  };

  const toggleIcon = () =>
    theme == ThemeType.light ? "dark-mode" : "light-mode";

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={toggleTheme}
        style={[{ backgroundColor: firstColor }, styles.button]}
      >
        <MaterialIcons name={toggleIcon()} size={35} color={Colors.dark.text} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
