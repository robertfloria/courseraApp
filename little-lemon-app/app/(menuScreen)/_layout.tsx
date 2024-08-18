import { Stack } from "expo-router";
import CustomHeader from "@/components/layout/CustomHeader";
import RightHeader from "./components/RightHeader/RightHeader";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => <CustomHeader RightComponent={RightHeader} />,
        }}
      />
    </Stack>
  );
}
