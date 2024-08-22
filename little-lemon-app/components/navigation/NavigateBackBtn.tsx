import { useRouter } from "expo-router";
import ThemedButton from "../ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";

export const NavigateBackBtn = () => {
  const router = useRouter();

  const firstColor = useThemeColor({}, 'firstColor');

  const handleBack = () => {
    router.back();
  };
  return (
    <ThemedButton textColor={firstColor} lightColor="transparent" darkColor="transparent" onPress={handleBack}>
      Back
    </ThemedButton>
  )
};
