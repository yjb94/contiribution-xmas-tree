import { Stack } from "expo-router";
import { App } from "../App";

const RootLayout = () => {
  return (
    <App>
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
    </App>
  );
};

export default RootLayout;
