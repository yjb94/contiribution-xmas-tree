import { vec } from "@shopify/react-native-skia";
import React, { memo, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSnapshot } from "valtio";
import { colorMap, gridHeight, gridWidth, pixelSize } from "../../const";
import { contributionState } from "../../store/contribution";
import { SnowCanvas } from "../Snow/SnowCanvas";
import { SnowflakeProps } from "../Snow/Snowflake";
import { createEmptyGrid, generateDecorations } from "./lib";

type GridProps = {};

const Grid: React.FC<GridProps> = ({}) => {
  const { contributions, contributionTreeData } =
    useSnapshot(contributionState);

  const [decorationGrid, setDecorationGrid] = useState<(string | null)[][]>(
    createEmptyGrid()
  );
  const [snowflakes, setSnowflakes] = useState<SnowflakeProps[]>();

  useEffect(() => {
    if (contributions !== undefined) {
      start();
    }
  }, [contributionTreeData]);

  const start = () => {
    if (!contributionTreeData) {
      return;
    }

    const decorationGrid = generateDecorations(
      // @ts-ignore
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
