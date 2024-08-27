import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  counter: number;
  setCounter: (arg: any) => any;
};

export default function ItemCounter({ counter, setCounter }: Props) {
  const color = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "opacityGrey");

  const decrease = () => setCounter((prevState: number) => prevState - 1);
  const increase = () => setCounter((prevState: number) => prevState + 1);

  const isButtonDisabled = counter <= 1;

  return (
    <View style={styles.container}>
      <Pressable
        style={[{ backgroundColor: backgroundColor }, styles.button]}
        onPress={decrease}
        disabled={isButtonDisabled}
      >
        <MaterialIcons name="exposure-minus-1" size={20} color={color} />
      </Pressable>
      <ThemedText style={{ fontSize: 60, lineHeight: 0 }}>{counter}</ThemedText>
      <Pressable
        style={[{ backgroundColor: backgroundColor }, styles.button]}
        onPress={increase}
      >
        <MaterialIcons name="exposure-plus-1" size={20} color={color} />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 15,
  },
  button: {
    borderRadius: 100,
    padding: 10,
  },
});
