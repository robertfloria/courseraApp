import { useRouter } from "expo-router";
import Button from "../Button";

export const NavigateBackBtn = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return <Button onPress={handleBack}>back</Button>;
};
