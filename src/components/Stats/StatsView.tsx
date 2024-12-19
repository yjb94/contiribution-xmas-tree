import { router } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSnapshot } from "valtio";
import { contributionState } from "../../store/contribution";
import Button from "../Button";

const StatsView = () => {
  const { contributionTreeData, contributions } =
    useSnapshot(contributionState);

  return (
    <View style={styles.statisticsContainer}>
      <Animated.Text
        style={styles.statisticsText}
        entering={Platform.select({
          web: undefined,
          default: FadeIn.duration(1000),
        })}
      >
        Total Contributions: {contributions}
      </Animated.Text>

      <Animated.Text
        style={styles.statisticsText}
        entering={Platform.select({
          web: undefined,
          default: FadeIn.duration(1000).delay(1000),
        })}
      >
        Green days: {contributionTreeData.contributionCount}
      </Animated.Text>

      <Animated.Text
        style={styles.statisticsText}
        entering={Platform.select({
          web: undefined,
          default: FadeIn.duration(1000).delay(2000),
        })}
      >
        Snowy days: {365 - contributionTreeData.contributionCount}
      </Animated.Text>

      <Animated.Text
        style={[styles.statisticsText, { fontWeight: "600" }]}
        entering={Platform.select({
          web: undefined,
          default: FadeIn.duration(1000).delay(3000),
        })}
      >
        Merry Chistmas!
      </Animated.Text>

      <Animated.View
        entering={Platform.select({
          web: undefined,
          default: FadeIn.duration(1000).delay(4000),
        })}
      >
        <Button style={styles.button} title="Go back" onPress={router.back} />
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    marginTop: 16,
  },
  statisticsContainer: {
    marginTop: 8,
    backgroundColor: "#fafafa",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  statisticsText: {
    fontSize: 16,
    color: "#404040",
    lineHeight: 24,
  },
});

export default StatsView;
