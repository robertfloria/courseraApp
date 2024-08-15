import CustomHeader from "@/components/layout/CustomHeader";
import { NavigateBackBtn } from "@/components/navigation/NavigateBackBtn";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => <CustomHeader LeftComponent={NavigateBackBtn} />,
        }}
      />
    </Stack>
  );
}
