import { StyleSheet, View } from "react-native";
import { colorMap, gridArray, pixelSize } from "../../const";
import { isPixelFilled } from "./lib";

const PixelText = () => {
  return gridArray.map((row, rowIndex) => (
    <View key={row.id} style={styles.row}>
      {row.cells.map((cell, colIndex) => {
        const isFilled = isPixelFilled(colIndex, rowIndex);

        return (
          <View
            key={cell.id}
            style={[
              styles.pixel,
              {
                backgroundColor: isFilled ? colorMap[5] : "#ddd",
              },
            ]}
          />
        );
      })}
    </View>
  ));
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  pixel: {
    width: pixelSize,
    height: pixelSize,
    margin: 0.5,
  },
});

export default PixelText;
