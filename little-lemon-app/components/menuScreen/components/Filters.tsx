import ThemedButton from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

type FiltersProps = {
  onChange: (arg: any) => any;
  selections: any;
  sections: Array<any>;
};

const Filters = ({ onChange, selections, sections }: FiltersProps) => {
  const opacityGrey = useThemeColor({}, "opacityGrey");
  const firstColor = useThemeColor({}, "firstColor");
  const thirdColor = useThemeColor({}, "thirdColor");

  return (
    <ThemedView style={{ width: "100%" }}>
      <FlatList
        data={sections}
        horizontal
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        renderItem={({ item, index }) => (
          <ThemedButton
            lightColor={selections[index] ? firstColor : opacityGrey}
            darkColor={selections[index] ? firstColor : opacityGrey}
            onPress={() => {
              onChange(index);
            }}
            textColor={selections[index] ? thirdColor : firstColor}
            style={styles.button}
          >
            {item.toLowerCase()}
          </ThemedButton>
        )}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    gap: 15,
  },
  button: {
    borderRadius: 30,
    display: "flex",
    padding: 10,
  },
});

export default Filters;
