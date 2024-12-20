import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSnapshot } from "valtio";
import { contributionState } from "../../store/contribution";
import Button from "../Button";

const StatsView = () => {
  const { contributionTreeData, contributions } =
    useSnapshot(contributionState);

  const [isCopied, setIsCopied] = React.useState(false);

  function getCleanUrl() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    for (const param of params.keys()) {
      if (param.startsWith("__EXPO_ROUTER_key")) {
        params.delete(param);
      }
    }

    return `${url.origin}${url.pathname}${
      params.toString() ? "?" + params.toString() : ""
    }`;
  }

  const handleShareLinkPress = async () => {
    try {
      await Clipboard.setStringAsync(getCleanUrl());
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <View style={styles.statisticsContainer}>
      <Animated.Text
        style={styles.statisticsText}
        entering={FadeIn.duration(1000)}
      >
        <Text style={styles.bold}>Total Contributions: </Text>
        {contributions}
      </Animated.Text>

      <Animated.Text
        style={styles.statisticsText}
        entering={FadeIn.duration(1000).delay(1000)}
      >
        <Text style={styles.bold}>Green days: </Text>
        {contributionTreeData.contributionCount}
      </Animated.Text>

      <Animated.Text
        style={styles.statisticsText}
        entering={FadeIn.duration(1000).delay(2000)}
      >
        <Text style={styles.bold}>Snowy days: </Text>
        {365 - contributionTreeData.contributionCount}
      </Animated.Text>

      <Animated.Text
        style={styles.merryChristamsText}
        entering={FadeIn.duration(1000).delay(3000)}
      >
        Merry Chistmas! 🎄
      </Animated.Text>

      {Platform.OS === "web" && (
        <Animated.View entering={FadeIn.duration(1000).delay(4000)}>
          <Button
            style={styles.button}
            title={!isCopied ? "Share Link" : "Successfully Copied!"}
            onPress={handleShareLinkPress}
          />
        </Animated.View>
      )}

      <Animated.View entering={FadeIn.duration(1000).delay(4000)}>
        <Button
          style={styles.button}
          title="Go back"
          variant="secondary"
          onPress={handleBackPress}
        />
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  statisticsContainer: {
    marginTop: 8,
    padding: 16,
    gap: 12,
  },
  bold: {
    fontWeight: "600",
  },
  statisticsText: {
    fontSize: 16,
    color: "#2c2c2c",
    lineHeight: 24,
  },
  merryChristamsText: {
    marginTop: 8,
    fontSize: 18,
    color: "#2c2c2c",
    lineHeight: 28,
    fontWeight: "600",
  },
  button: {
    marginTop: 16,
  },
});

export default StatsView;
