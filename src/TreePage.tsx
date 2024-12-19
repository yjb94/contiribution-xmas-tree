import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSnapshot } from "valtio";
import Grid from "./components/Grid/Grid";
import StatsView from "./components/Stats/StatsView";
import { contributionState } from "./store/contribution";

const TreePage = () => {
  const { contributionTreeData } = useSnapshot(contributionState);

  const [showStatistics, setShowStatistics] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowStatistics(true);
    }, 3000);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* @ts-ignore */}
      <Grid contributionTreeData={contributionTreeData} />
      {showStatistics && <StatsView />}
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
