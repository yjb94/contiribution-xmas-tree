import { Canvas, Group } from "@shopify/react-native-skia";
import React from "react";
import { StyleSheet } from "react-native";
import { Snowflake, SnowflakeProps } from "./Snowflake";

interface SnowCanvasProps {
  snowflakes: SnowflakeProps[];
}

const SnowCanvas = ({ snowflakes }: SnowCanvasProps) => {
  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Group>
        {snowflakes.map((snowflake) => (
          <Snowflake key={snowflake.id} {...snowflake} />
        ))}
      </Group>
    </Canvas>
  );
};

export default React.memo(SnowCanvas);
