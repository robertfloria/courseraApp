import Button from "@/components/Button";
import CustomHeader from "@/components/layout/CustomHeader";
import { Stack, useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();

  const GoBackButton = () => {
    const handleBack = () => {
      router.back();
    };
    return <Button onPress={handleBack}>back</Button>;
  };
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => <CustomHeader LeftComponent={GoBackButton} />,
        }}
      />
    </Stack>
  );
}
