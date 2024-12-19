import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="tree"
        options={{
          animation: "fade",
        }}
      />
    </Stack>
  );
};

export default RootLayout;
