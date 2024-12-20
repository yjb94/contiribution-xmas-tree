import { vec } from "@shopify/react-native-skia";
import { router } from "expo-router";
import { useState } from "react";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { fetchGithubContributions } from "./api/fetchGithubContribution";
import Button from "./components/Button";
import { generateContributionTree } from "./components/Grid/lib";
import PixelText from "./components/Grid/PixelText";
import { SnowCanvas } from "./components/Snow/SnowCanvas";
import { gridHeight, gridWidth, pixelSize } from "./const";
import { contributionState } from "./store/contribution";

const snowflakes = Array.from({ length: 365 }, (_, i) => ({
  id: i,
  initialPosition: vec(
    Math.random() * gridWidth * pixelSize,
    -20 - Math.random() * gridHeight * pixelSize * 0.5
  ),
  infinite: true,
}));

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
      setUserName("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <PixelText />
      </View>
      <SnowCanvas snowflakes={snowflakes} />
      <View style={styles.inputContainer}>
        <Animated.View entering={FadeIn.duration(1000).delay(300)}>
          <Text style={styles.label}>Github Username</Text>
          <TextInput
            style={styles.input}
            defaultValue={userName}
            onChangeText={setUserName}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={fetchContributions}
          />
        </Animated.View>
        <Animated.View entering={FadeIn.duration(1000).delay(1300)}>
          <Button
            isLoading={isLoading}
            onPress={fetchContributions}
            title="🎄Let it snow!"
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    overflow: "hidden",
    justifyContent: "center",
  },
  introMessage: {
    fontSize: 24,
    fontWeight: "500",
    color: "#404040",
    marginBottom: 8,
  },
  inputContainer: {
    marginTop: Platform.select({
      native: -20,
      web: 80,
    }),
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
