import { vec } from "@shopify/react-native-skia";
import React, { memo, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { colorMap, gridHeight, gridWidth, pixelSize } from "../../const";
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
  const [snowflakes, setSnowflakes] = useState<SnowflakeProps[]>();

  console.log("Grid render");

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
    setSnowflakes(
      Array.from(
        { length: 365 - contributionTreeData.contributionCount },
        (_, i) => ({
          id: i,
          initialPosition: vec(
            Math.random() * gridWidth * pixelSize,
            -20 - Math.random() * gridHeight * pixelSize * 0.5
          ),
        })
      )
    );
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

        {!!snowflakes && <SnowCanvas snowflakes={snowflakes} />}
      </View>
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
});

export default memo(Grid);
