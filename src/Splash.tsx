import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

import { LoadSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import { SplashScreen } from "expo-router";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

SplashScreen.preventAutoHideAsync();

export type SplashProps = PropsWithChildren;

function Splash({ children }: SplashProps) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoadingSkia, setIsLoadingSkia] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync();

    const prepare = async () => {
      try {
        if (Platform.OS === "web") {
          await LoadSkiaWeb({ locateFile: () => "/canvaskit.wasm" });
          setIsLoadingSkia(true);
        }
      } finally {
        setAppIsReady(true);
        setIsLoadingSkia(false);
      }
    };

    prepare();
  }, []);

  const onLayoutSplashView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    if (isLoadingSkia) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Loading Skia...</Text>
          <ActivityIndicator />
        </View>
      );
    }

    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutSplashView}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Splash;
