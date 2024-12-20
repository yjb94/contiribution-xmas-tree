import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
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

      <Animated.View entering={FadeIn.duration(1000).delay(4000)}>
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
});

export default StatsView;
