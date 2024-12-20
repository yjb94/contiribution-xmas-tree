import { Stack } from "expo-router";
import { App } from "../App";
import { MAX_WIDTH } from "../src/const";

const RootLayout = () => {
  return (
    <App>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#fafafa",
            flex: 1,
            alignSelf: "center",
            width: MAX_WIDTH,
          },
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
