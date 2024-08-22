import { WaveSvg } from "@/components/svg/WaveSvg";
import { ThemedSearchBar } from "@/components/ThemedSearchBar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Image, StyleSheet, View } from "react-native";
import { presentationDescription } from "../utils/constants";
import { appName } from "@/utils/constants";

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
        <View style={styles.descriptionContainer}>
          <ThemedText
            type="subtitle"
            lightColor={Colors.light.text}
            darkColor={Colors.light.text}
          >
            {appName}
          </ThemedText>
          <ThemedText
            type="default"
            lightColor={Colors.light.text}
            darkColor={Colors.light.text}
          >
            {presentationDescription}
          </ThemedText>
        </View>
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
    paddingHorizontal: 15,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  descriptionContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    gap: 5,
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
