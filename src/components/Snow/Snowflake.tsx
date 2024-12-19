import { Rect, type SkPoint } from "@shopify/react-native-skia";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { colorMap, gridHeight, pixelSize } from "../../const";

export interface SnowflakeProps {
  id: number;
  initialPosition: SkPoint;
}

export const Snowflake = ({ id, initialPosition }: SnowflakeProps) => {
  const speed = useSharedValue(1 + Math.random() * 1.5);
  const wind = useSharedValue((Math.random() - 0.5) * 2);
  const isSettled = useSharedValue(false);

  const positionX = useSharedValue(initialPosition.x);
  const positionY = useSharedValue(initialPosition.y);

  const animatedY = useDerivedValue(() => {
    if (isSettled.value) return positionY.value;

    const nextY = positionY.value + speed.value;

    const floorPosition = (gridHeight - 1) * (pixelSize + 1);

    if (nextY >= floorPosition) {
      isSettled.value = true;
      positionY.value = floorPosition;
      return positionY.value;
    }

    positionY.value = nextY;
    return positionY.value;
  });

  const animatedX = useDerivedValue(() => {
    if (isSettled.value) return positionX.value;

    positionX.value += Math.sin(Date.now() / 1000 + id) * wind.value;

    return positionX.value;
  });

  return (
    <Rect
      x={animatedX}
      y={animatedY}
      width={pixelSize}
      height={pixelSize}
      color={colorMap[0]}
      opacity={0.8}
    />
  );
};
