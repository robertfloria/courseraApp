import { WaveSvg } from "@/components/svg/WaveSvg";
import { ThemedSearchBar } from "@/components/ThemedSearchBar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Image, StyleSheet } from "react-native";

type Props = {
  setSearchBarText: (arg: any) => any;
  searchBarText: string;
};

export default function Presentation({
  setSearchBarText,
  searchBarText,
}: Props) {
  const handleSearchChange = (text: string) => {
    setSearchBarText(text);
  };

  const background = useThemeColor({}, "secondColor");
  const thirdColor = useThemeColor({}, "thirdColor");

  return (
    <ThemedView
      lightColor={background}
      darkColor={background}
      style={styles.container}
    >
      <ThemedView style={styles.presentationContainer}>
        <ThemedText lightColor={Colors.light.text} darkColor={Colors.light.text} style={{ flex: 1 }}>
          asldsmsaldsajk sandlsakndlaskdklasdnka asnkdaslkdaslknd akndaslkdnas
        </ThemedText>
        <Image
          style={styles.image}
          source={require("../../../assets/images/presentationImage.jpg")}
          resizeMode="contain"
        />
      </ThemedView>
      <ThemedSearchBar
        placeholder="Search"
        onChangeText={handleSearchChange}
        value={searchBarText}
      />
      <WaveSvg color={thirdColor} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    gap: 10,
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  presentationContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
});
