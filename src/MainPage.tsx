import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { fetchGithubContributions } from "./api/fetchGithubContribution";
import Button from "./components/Button";
import { generateContributionTree } from "./components/Grid/lib";
import { contributionState } from "./store/contribution";

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [userName, setUserName] = useState<string>();

  const fetchContributions = async () => {
    if (!userName) return;
    setIsLoading(true);

    try {
      const contributions = await fetchGithubContributions(userName);
      contributionState.contributions = contributions.reduce(
        (acc, cur) => acc + cur.count,
        0
      );
      contributionState.contributionTreeData =
        generateContributionTree(contributions);
      router.push("tree");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Github Username</Text>
        <TextInput
          style={styles.input}
          defaultValue={userName}
          onChangeText={setUserName}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={fetchContributions}
        />
        <Button
          isLoading={isLoading}
          onPress={fetchContributions}
          title="Make my tree"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 24,
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
});

export { MainPage };
