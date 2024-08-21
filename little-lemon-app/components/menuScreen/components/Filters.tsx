import ThemedButton from "@/components/ThemedButton";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type FiltersProps = {
  onChange: (arg: any) => any;
  selections: any;
  sections: Array<any>;
};
const Filters = ({ onChange, selections, sections }: FiltersProps) => {
  const secondColor = useThemeColor({}, "secondColor");
  const firstColor = useThemeColor({}, "firstColor");
  const thirdColor = useThemeColor({}, "thirdColor");
  const textColor = Colors.dark.text;

  return (
    <ThemedView style={{ width: '100%' }}>
      <ThemedScrollView
        contentContainerStyle={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {sections.map((section, index) => (
          <LinearGradient
            colors={[secondColor, firstColor]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientButton}
            key={index}
          >
            <ThemedButton
              lightColor={selections[index] ? 'transparent' : thirdColor}
              darkColor={selections[index] ? 'transparent' : thirdColor}
              onPress={() => {
                onChange(index);
              }}
              textColor={firstColor}
            >
              {section.toLowerCase()}
            </ThemedButton>
          </LinearGradient>
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
    gap: 25,
    padding: 5,
  },
  gradientButton: {
    width: "auto",
    height: "auto",
    borderRadius: 8,
    padding:2,
  },
});

export default Filters;
