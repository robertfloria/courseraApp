import { Stack } from "expo-router";
import ProfileScreenButton from "./components/ProfileScreenButton";
import CustomHeader from "@/components/layout/CustomHeader";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => <CustomHeader RightComponent={ProfileScreenButton} />,
        }}
      />
    </Stack>
  );
}
