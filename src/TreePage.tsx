import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSnapshot } from "valtio";
import Button from "./components/Button";
import Grid from "./components/Grid/Grid";
import { contributionState } from "./store/contribution";

const TreePage = () => {
  const { contributionTreeData, contributions } =
    useSnapshot(contributionState);

  const [showStatistics, setShowStatistics] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowStatistics(true);
    }, 3000);
  }, []);
  console.log(`JB ~ TreePage ~ contributionTreeData:`, contributionTreeData);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Grid contributionTreeData={contributionTreeData} />
      {showStatistics && (
        <View style={styles.statisticsContainer}>
          <Animated.Text
            style={styles.statisticsText}
            entering={FadeIn.duration(1000)}
          >
            Total Contributions: {contributions}
          </Animated.Text>

          <Animated.Text
            style={styles.statisticsText}
            entering={FadeIn.duration(1000).delay(1000)}
          >
            Green days: {contributionTreeData.contributionCount}
          </Animated.Text>

          <Animated.Text
            style={styles.statisticsText}
            entering={FadeIn.duration(1000).delay(2000)}
          >
            Snowy days: {365 - contributionTreeData.contributionCount}
          </Animated.Text>

          <Animated.Text
            style={styles.statisticsText}
            entering={FadeIn.duration(1000).delay(3000)}
          >
            Merry Chistmas!
          </Animated.Text>

          <Animated.View entering={FadeIn.duration(1000).delay(4000)}>
            <Button
              style={styles.button}
              title="Go back"
              onPress={() => {
                router.back();
              }}
            />
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
    backgroundColor: "#fafafa",
    padding: 16,
    borderRadius: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#404040",
    marginBottom: 8,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#ffffff",
    fontSize: 16,
    color: "#1f2937",
  },
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

export { TreePage };
