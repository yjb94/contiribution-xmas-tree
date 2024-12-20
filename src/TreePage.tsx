import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { fetchGithubContributions } from "./api/fetchGithubContribution";
import Grid from "./components/Grid/Grid";
import { generateContributionTree } from "./components/Grid/lib";
import StatsView from "./components/Stats/StatsView";
import { screenWidth } from "./const";
import { contributionState, setContributions } from "./store/contribution";

const TreePage = () => {
  const local = useLocalSearchParams();

  const [showStatistics, setShowStatistics] = useState(false);

  const loadTree = async () => {
    if (!local.userName) {
      return;
    }
    const contributions = await fetchGithubContributions(
      local.userName as string
    );
    setContributions(contributions);
    contributionState.contributionTreeData =
      generateContributionTree(contributions);
  };

  useEffect(() => {
    if (contributionState.contributions === undefined) {
      loadTree();
    }

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
      <Grid />
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
