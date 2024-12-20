import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSnapshot } from "valtio";
import Grid from "./components/Grid/Grid";
import StatsView from "./components/Stats/StatsView";
import { screenWidth } from "./const";
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
    backgroundColor: "#dfdfdf",
    width: screenWidth,
  },
  contentContainer: {
    paddingBottom: 40,
  },
});

export { TreePage };
