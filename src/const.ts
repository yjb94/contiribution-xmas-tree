import { Dimensions, Platform } from "react-native";

export const gridWidth = 40;
export const gridHeight = 55;

export const MAX_WIDTH = 540 as const;
export const screenWidth = Platform.select({
  web: Math.min(MAX_WIDTH, Dimensions.get("window").width),
  native: Dimensions.get("window").width,
});
export const pixelSize = Math.floor(screenWidth / gridWidth);
export const screenPixel = Math.ceil(
  Dimensions.get("window").height / pixelSize
);

export const colorMap = {
  "-1": "#25305d", // night
  0: "#ebedf0", // empty
  1: "#9be9a8", // light green
  2: "#40c463", // medium green
  3: "#30a14e", // darker green
  4: "#216e39", // darkest green
  5: "#795548", // brown (trunk)
};

export const decorationColors = ["#E53935", "#2979FF"];
export const starColor = "#FFD700";

export const treeBreakpoints = [
  { count: 10, narrowness: 1.1, widthRatio: 0.18 },
  { count: 20, narrowness: 1.12, widthRatio: 0.2 },
  { count: 30, narrowness: 1.15, widthRatio: 0.22 },
  { count: 40, narrowness: 1.17, widthRatio: 0.24 },
  { count: 50, narrowness: 1.2, widthRatio: 0.25 },
  { count: 60, narrowness: 1.23, widthRatio: 0.27 },
  { count: 70, narrowness: 1.26, widthRatio: 0.29 },
  { count: 80, narrowness: 1.29, widthRatio: 0.31 },
  { count: 90, narrowness: 1.32, widthRatio: 0.33 },
  { count: 100, narrowness: 1.35, widthRatio: 0.35 },
  { count: 110, narrowness: 1.37, widthRatio: 0.37 },
  { count: 120, narrowness: 1.39, widthRatio: 0.39 },
  { count: 130, narrowness: 1.41, widthRatio: 0.41 },
  { count: 140, narrowness: 1.44, widthRatio: 0.43 },
  { count: 150, narrowness: 1.47, widthRatio: 0.45 },
  { count: 160, narrowness: 1.49, widthRatio: 0.46 },
  { count: 170, narrowness: 1.51, widthRatio: 0.47 },
  { count: 180, narrowness: 1.53, widthRatio: 0.48 },
  { count: 190, narrowness: 1.54, widthRatio: 0.5 },
  { count: 200, narrowness: 1.55, widthRatio: 0.51 },
  { count: 210, narrowness: 1.56, widthRatio: 0.515 },
  { count: 220, narrowness: 1.57, widthRatio: 0.52 },
  { count: 230, narrowness: 1.58, widthRatio: 0.525 },
  { count: 240, narrowness: 1.59, widthRatio: 0.53 },
  { count: 250, narrowness: 1.61, widthRatio: 0.54 },
  { count: 260, narrowness: 1.62, widthRatio: 0.545 },
  { count: 270, narrowness: 1.63, widthRatio: 0.55 },
  { count: 280, narrowness: 1.64, widthRatio: 0.552 },
  { count: 290, narrowness: 1.65, widthRatio: 0.555 },
  { count: 300, narrowness: 1.67, widthRatio: 0.56 },
  { count: 310, narrowness: 1.68, widthRatio: 0.563 },
  { count: 320, narrowness: 1.69, widthRatio: 0.566 },
  { count: 330, narrowness: 1.7, widthRatio: 0.57 },
  { count: 340, narrowness: 1.7, widthRatio: 0.575 },
  { count: 350, narrowness: 1.71, widthRatio: 0.58 },
  { count: 360, narrowness: 1.72, widthRatio: 0.585 },
  { count: 365, narrowness: 1.72, widthRatio: 0.59 },
];

const createGridArray = (columns, rows) =>
  Array(rows)
    .fill(null)
    .map((_, rowIndex) => ({
      id: `row-${rowIndex}`,
      cells: Array(columns)
        .fill(null)
        .map((_, colIndex) => ({
          id: `${rowIndex}-${colIndex}`,
        })),
    }));
const columns = Math.ceil(screenWidth / pixelSize);
const rows = screenPixel + 10;

export const gridArray = createGridArray(columns, rows);

// Starting position for the text (can be adjusted)
const startX = 2;
const startY = 10;

export const pixelText = {
  // Github
  github: [
    // G (111|100|111)
    [startX, startY],
    [startX + 1, startY],
    [startX + 2, startY],
    [startX, startY + 1],
    [startX, startY + 2],
    [startX + 2, startY + 2],
    [startX, startY + 3],
    [startX + 2, startY + 3],
    [startX, startY + 4],
    [startX + 1, startY + 4],
    [startX + 2, startY + 4],
    // i (010)
    [startX + 4, startY + 1],
    [startX + 4, startY + 3],
    [startX + 4, startY + 4],
    // t (111|010|010)
    [startX + 7, startY + 1],
    [startX + 6, startY + 2],
    [startX + 7, startY + 2],
    [startX + 8, startY + 2],
    [startX + 7, startY + 3],
    [startX + 7, startY + 4],
    // h (100|111|101)
    [startX + 10, startY],
    [startX + 10, startY + 1],
    [startX + 10, startY + 2],
    [startX + 10, startY + 3],
    [startX + 10, startY + 4],
    [startX + 11, startY + 2],
    [startX + 12, startY],
    [startX + 12, startY + 1],
    [startX + 12, startY + 2],
    [startX + 12, startY + 3],
    [startX + 12, startY + 4],
    // u (101|101|111)
    [startX + 14, startY + 2],
    [startX + 16, startY + 2],
    [startX + 14, startY + 3],
    [startX + 16, startY + 3],
    [startX + 14, startY + 4],
    [startX + 15, startY + 4],
    [startX + 16, startY + 4],
    // b (100|111|101)
    [startX + 18, startY],
    [startX + 18, startY + 1],
    [startX + 18, startY + 2],
    [startX + 19, startY + 2],
    [startX + 20, startY + 2],
    [startX + 18, startY + 3],
    [startX + 20, startY + 3],
    [startX + 18, startY + 4],
    [startX + 19, startY + 4],
    [startX + 20, startY + 4],
  ],

  // Christmas
  christmas: [
    // C (111|100|111)
    [startX, startY + 7],
    [startX + 1, startY + 7],
    [startX + 2, startY + 7],
    [startX, startY + 8],
    [startX, startY + 9],
    [startX, startY + 10],
    [startX, startY + 11],
    [startX + 1, startY + 11],
    [startX + 2, startY + 11],
    // h (100|111|101)
    [startX + 4, startY + 7],
    [startX + 4, startY + 8],
    [startX + 4, startY + 9],
    [startX + 4, startY + 10],
    [startX + 4, startY + 11],
    [startX + 5, startY + 9],
    [startX + 6, startY + 9],
    [startX + 6, startY + 10],
    [startX + 6, startY + 11],
    // r (11|10|10)
    [startX + 8, startY + 9],
    [startX + 8, startY + 10],
    [startX + 8, startY + 11],
    [startX + 9, startY + 9],
    // i (010)
    [startX + 11, startY + 7],
    [startX + 11, startY + 9],
    [startX + 11, startY + 10],
    [startX + 11, startY + 11],
    // s (101|111|011)
    [startX + 14, startY + 8],
    [startX + 13, startY + 9],
    [startX + 14, startY + 10],
    [startX + 13, startY + 11],
    [startX + 14, startY + 11],
    // t (111|010|010)
    [startX + 17, startY + 8],
    [startX + 16, startY + 9],
    [startX + 17, startY + 9],
    [startX + 18, startY + 9],
    [startX + 17, startY + 10],
    [startX + 17, startY + 11],
    // m (010|111|010|010)
    [startX + 20, startY + 9],
    [startX + 20, startY + 10],
    [startX + 20, startY + 11],
    [startX + 21, startY + 9],
    [startX + 22, startY + 9],
    [startX + 22, startY + 10],
    [startX + 22, startY + 11],
    [startX + 23, startY + 9],
    [startX + 24, startY + 9],
    [startX + 24, startY + 10],
    [startX + 24, startY + 11],
    // a (01010|10101|10101)
    [startX + 27, startY + 9],
    [startX + 28, startY + 9],
    [startX + 26, startY + 10],
    [startX + 28, startY + 10],
    [startX + 26, startY + 11],
    [startX + 27, startY + 11],
    [startX + 28, startY + 11],
    // s (011|101|111)
    [startX + 31, startY + 8],
    [startX + 30, startY + 9],
    [startX + 31, startY + 10],
    [startX + 30, startY + 11],
    [startX + 31, startY + 11],
  ],

  // Tree
  tree: [
    // T (111|010|010)
    [startX, startY + 14],
    [startX + 1, startY + 14],
    [startX + 2, startY + 14],
    [startX + 1, startY + 15],
    [startX + 1, startY + 16],
    [startX + 1, startY + 17],
    // r (11|10|10)
    [startX + 4, startY + 15],
    [startX + 5, startY + 15],
    [startX + 4, startY + 16],
    [startX + 4, startY + 17],
    // e (111|110|111)
    [startX + 7, startY + 15],
    [startX + 8, startY + 15],
    [startX + 7, startY + 16],
    [startX + 7, startY + 17],
    [startX + 8, startY + 17],
    // e (111|110|111)
    [startX + 10, startY + 15],
    [startX + 11, startY + 15],
    [startX + 10, startY + 16],
    [startX + 10, startY + 17],
    [startX + 11, startY + 17],
  ],
};
