import ThemedButton from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

type FiltersProps = {
  onChange: (arg: any) => any;
  selections: any;
  sections: Array<any>;
};
const Filters = ({ onChange, selections, sections }: FiltersProps) => {

  const background = useThemeColor({}, "secondColor");
  const backgroundSelected = useThemeColor({}, "firstColor");

  return (
    <ThemedView style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <ThemedButton
          lightColor={selections[index] ? background : backgroundSelected}
          darkColor={selections[index] ? background : backgroundSelected}
          onPress={() => {
            onChange(index);
          }}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 0,
          }}
          key={index}
        >
          {section}
        </ThemedButton>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
});

export default Filters;
