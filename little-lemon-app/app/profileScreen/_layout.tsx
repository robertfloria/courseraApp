import Button from "@/components/Button";
import NavigationHeader from "@/components/layout/NavigationHeader";
import { Stack, useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();

  const GoBackButton = () => {
    const handleBack = () => { router.back() };
    return (
      <Button onPress={handleBack}>back</Button>
    )
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitle: (props) => <NavigationHeader />,
        headerLeft: () => <GoBackButton />
      }} />
    </Stack>
  );
}
