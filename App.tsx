import { PropsWithChildren } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Splash from "./src/Splash";

export type AppProps = PropsWithChildren;

export const App: React.FC<AppProps> = ({ children }) => {
  return (
    <SafeAreaProvider>
      <Splash>{children}</Splash>
    </SafeAreaProvider>
  );
};
