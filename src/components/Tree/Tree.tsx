import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colorMap, gridWidth } from "../../const";
import { SnowCanvas } from "../Snow/SnowCanvas";
import {
  createEmptyGrid,
  generateContributionTree,
  generateDecorations,
} from "./lib";

const screenWidth = Dimensions.get("window").width;
const pixelSize = Math.floor((screenWidth - 10) / gridWidth);

const generateContributions = (days: number): number[] => {
  return Array.from({ length: days }, () => Math.floor(Math.random() * 12) + 1);
};

const ChristmasTree = () => {
  const [contributionDays, setContributionDays] = useState(100);
  const [step, setStep] = useState(1);
  const [decorationGrid, setDecorationGrid] = useState<(string | null)[][]>(
    createEmptyGrid()
  );
  const [contributionTreeData, setContributionTreeData] = useState<
    ReturnType<typeof generateContributionTree>
  >({
    grid: createEmptyGrid(),
    remainingContributions: 0,
    baseWidth: 0,
    trunkWidth: 0,
  });
  const [isSnowing, setIsSnowing] = useState(false);

  useEffect(() => {
    const contributions = generateContributions(contributionDays);
    setContributionTreeData(generateContributionTree(contributions));

    // remainin이 너무 작은 경우 고민
    setStep(1);
  }, [contributionDays]);

  const handleDaysChange = (text: string) => {
    const value = Math.max(0, Math.min(365, parseInt(text) || 0));
    setContributionDays(value);
  };

  const toStepOne = () => {
    setDecorationGrid(createEmptyGrid());
    setIsSnowing(false);
    setStep(1);
  };

  const handleDecorate = () => {
    const newDecorationGrid = generateDecorations(
      contributionTreeData.grid,
      contributionTreeData.remainingContributions,
      contributionDays,
      contributionTreeData.baseWidth,
      contributionTreeData.trunkWidth
    );
    setDecorationGrid(newDecorationGrid);
    setStep(2);
  };

  const startSnowing = useCallback(() => {
    setIsSnowing(true);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contribution 일수 (0-365):</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={String(contributionDays)}
          onChangeText={handleDaysChange}
          maxLength={3}
        />
      </View>
      <View style={styles.gridContainer}>
        {contributionTreeData.grid.map((row, rowIndex) => (
          <View key={`tree-${rowIndex}`} style={styles.row}>
            {row.map((cell, cellIndex) => (
              <View
                key={`tree-${rowIndex}-${cellIndex}`}
                style={[
                  styles.pixel,
                  {
                    backgroundColor: colorMap[cell],
                  },
                ]}
              />
            ))}
          </View>
        ))}

        <View style={StyleSheet.absoluteFill}>
          {decorationGrid.map((row, rowIndex) => (
            <View key={`decoration-${rowIndex}`} style={styles.row}>
              {row.map((color, cellIndex) => (
                <View
                  key={`decoration-${rowIndex}-${cellIndex}`}
                  style={[
                    styles.pixel,
                    color && { backgroundColor: color },
                    !color && { backgroundColor: "transparent" },
                  ]}
                />
              ))}
            </View>
          ))}
        </View>

        {isSnowing && (
          <SnowCanvas
            key={isSnowing ? "snow" : "no-snow"}
            count={365 - contributionDays}
            pixelSize={pixelSize}
          />
        )}
      </View>
      {step === 1 && (
        <TouchableOpacity style={styles.button} onPress={handleDecorate}>
          <Text style={styles.buttonText}>
            트리 꾸미기 ({contributionTreeData.remainingContributions}개)
          </Text>
        </TouchableOpacity>
      )}
      {step === 2 && !isSnowing && (
        <TouchableOpacity style={styles.button} onPress={startSnowing}>
          <Text style={styles.buttonText}>눈 내리기 시작</Text>
        </TouchableOpacity>
      )}
      {step === 2 && isSnowing && (
        <TouchableOpacity style={styles.button} onPress={toStepOne}>
          <Text style={styles.buttonText}>돌아가기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    marginRight: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    width: 80,
    textAlign: "center",
  },
  gridContainer: {
    backgroundColor: "black",
  },
  row: {
    flexDirection: "row",
  },
  pixel: {
    width: pixelSize,
    height: pixelSize,
    margin: 0.5,
    borderRadius: 2,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ChristmasTree;
