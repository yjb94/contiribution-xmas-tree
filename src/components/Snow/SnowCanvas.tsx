import { Canvas, Group, vec } from "@shopify/react-native-skia";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { gridHeight, gridWidth } from "../../const";
import { Snowflake } from "./Snowflake";

interface SnowCanvasProps {
  count: number;
  pixelSize: number;
}

export const SnowCanvas = ({ count, pixelSize }: SnowCanvasProps) => {
  const totalWidth = gridWidth * (pixelSize + 1);
  const totalHeight = gridHeight * (pixelSize + 1);

  const [snowflakes] = useState(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      initialPosition: vec(
        Math.random() * totalWidth,
        -20 - Math.random() * totalHeight * 0.5
      ),
    }))
  );

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Group>
        {snowflakes.map(({ id, initialPosition }) => (
          <Snowflake
            key={id}
            id={id}
            initialPosition={initialPosition}
            pixelSize={pixelSize}
          />
        ))}
      </Group>
    </Canvas>
  );
};
