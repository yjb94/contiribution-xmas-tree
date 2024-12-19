import { Canvas, Group } from "@shopify/react-native-skia";
import { StyleSheet } from "react-native";
import { Snowflake, SnowflakeProps } from "./Snowflake";

interface SnowCanvasProps {
  snowflakes: SnowflakeProps[];
}

export const SnowCanvas = ({ snowflakes }: SnowCanvasProps) => {
  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Group>
        {snowflakes.map(({ id, initialPosition }) => (
          <Snowflake key={id} id={id} initialPosition={initialPosition} />
        ))}
      </Group>
    </Canvas>
  );
};
