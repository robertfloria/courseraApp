import ThemedButton from "@/components/ThemedButton";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";

type FiltersProps = {
  onChange: (arg: any) => any;
  selections: any;
  sections: Array<any>;
};
const Filters = ({ onChange, selections, sections }: FiltersProps) => {
  const background = useThemeColor({}, "secondColor");
  const backgroundSelected = useThemeColor({}, "firstColor");
  const textColor = Colors.dark.text;

  return (
    <ThemedView style={{ width: '100%' }}>
      <ThemedScrollView
        contentContainerStyle={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {sections.map((section, index) => (
          <ThemedButton
            lightColor={selections[index] ? background : 'transparent'}
            darkColor={selections[index] ? background : 'transparent'}
            onPress={() => {
              onChange(index);
            }}
            style={[{ borderWidth: 2, borderColor: backgroundSelected }, styles.button]}
            key={index}
            textColor={backgroundSelected}
          >
            {section}
          </ThemedButton>
        ))}
      </ThemedScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    gap: 5,
    padding: 5,
    width: '100%',
    maxWidth: 'auto',
  },
  button: {
    width: 'auto',
  },
});

export default Filters;
