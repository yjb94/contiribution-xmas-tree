import { Dimensions, Platform } from "react-native";

export const gridWidth = 40;
export const gridHeight = 55;

export const MAX_WIDTH = 540 as const;
export const screenWidth = Platform.select({
  web: Math.min(MAX_WIDTH, Dimensions.get("window").width),
  native: Dimensions.get("window").width,
});
export const pixelSize = Math.floor(screenWidth / gridWidth);

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
