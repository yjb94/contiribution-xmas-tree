import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { colorMap, pixelSize } from "../../const";
import { SnowCanvas } from "../Snow/SnowCanvas";
import { SnowflakeProps } from "../Snow/Snowflake";
import {
  createEmptyGrid,
  generateContributionTree,
  generateDecorations,
} from "./lib";

type GridProps = {
  contributionTreeData: ReturnType<typeof generateContributionTree>;
};

const Grid: React.FC<GridProps> = ({ contributionTreeData }) => {
  const [decorationGrid, setDecorationGrid] = useState<(string | null)[][]>(
    createEmptyGrid()
  );
  const [isSnowing, setIsSnowing] = useState(false);
  const [snowflakes, setSnowflakes] = useState<SnowflakeProps[]>();

  useEffect(() => {
    if (!contributionTreeData || contributionTreeData.contributionCount === 0)
      return;

    start();
  }, [contributionTreeData]);

  const start = () => {
    const decorationGrid = generateDecorations(
      contributionTreeData.grid,
      Math.max(
        contributionTreeData.remainingContributions,
        Math.floor(contributionTreeData.contributionCount * 0.05)
      ),
      contributionTreeData.contributionCount
    );
    setDecorationGrid(decorationGrid);
    setTimeout(() => {
      startSnowing();
    }, 300);
  };

  const startSnowing = () => {
    // setSnowflakes(
    //   Array.from(
    //     { length: 365 - contributionTreeData.contributionCount },
    //     (_, i) => ({
    //       id: i,
    //       initialPosition: vec(
    //         Math.random() * gridWidth * pixelSize,
    //         -20 - Math.random() * gridHeight * pixelSize * 0.5
    //       ),
    //     })
    //   )
    // );
    setIsSnowing(true);
  };

  return (
    <View style={styles.container}>
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
              {row.map((color, cellIndex) => {
                return (
                  <View
                    key={`decoration-${rowIndex}-${cellIndex}`}
                    style={[
                      styles.pixel,
                      color && { backgroundColor: color },
                      !color && { backgroundColor: "transparent" },
                    ]}
                  />
                );
              })}
            </View>
          ))}
        </View>

        {isSnowing && (
          <SnowCanvas count={365 - contributionTreeData.contributionCount} />
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

export default Grid;