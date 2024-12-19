import { Canvas, Group, vec } from "@shopify/react-native-skia";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { gridHeight, gridWidth, pixelSize } from "../../const";
import { Snowflake } from "./Snowflake";

interface SnowCanvasProps {
  count: number;
}

export const SnowCanvas = ({ count }: SnowCanvasProps) => {
  const [snowflakes] = useState(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      initialPosition: vec(
        Math.random() * gridWidth * pixelSize,
        -20 - Math.random() * gridHeight * pixelSize * 0.5
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
