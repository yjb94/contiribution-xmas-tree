import { Rect, type SkPoint } from "@shopify/react-native-skia";
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { colorMap, gridHeight } from "../../const";

interface SnowflakeProps {
  id: number;
  initialPosition: SkPoint;
  pixelSize: number;
}

export const Snowflake = ({
  id,
  initialPosition,
  pixelSize,
}: SnowflakeProps) => {
  const speed = useSharedValue(1 + Math.random() * 1.5);
  const wind = useSharedValue((Math.random() - 0.5) * 2);
  const isSettled = useSharedValue(false);
  const isVisible = useSharedValue(true);

  const positionX = useSharedValue(initialPosition.x);
  const positionY = useSharedValue(initialPosition.y);

  const animatedY = useDerivedValue(() => {
    "worklet";
    if (!isVisible.value || isSettled.value) return positionY.value;

    const nextY = positionY.value + speed.value;

    const floorPosition = (gridHeight - 1) * (pixelSize + 1);

    if (nextY >= floorPosition) {
      isSettled.value = true;
      positionY.value = withSpring(floorPosition);
      return positionY.value;
    }

    positionY.value = nextY;
    return positionY.value;
  });

  const animatedX = useDerivedValue(() => {
    if (!isVisible.value || isSettled.value) return positionX.value;

    positionX.value += Math.sin(Date.now() / 1000 + id) * wind.value;

    return positionX.value;
  });

  if (!isVisible.value) return null;

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
