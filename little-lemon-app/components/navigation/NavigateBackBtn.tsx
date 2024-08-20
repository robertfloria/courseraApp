import { useRouter } from "expo-router";
import ThemedButton from "../ThemedButton";

export const NavigateBackBtn = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return <ThemedButton onPress={handleBack}>back</ThemedButton>;
};
