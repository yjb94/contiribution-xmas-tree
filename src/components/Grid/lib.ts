import { Contribution } from "../../api/fetchGithubContribution";
import {
  decorationColors,
  gridHeight,
  gridWidth,
  starColor,
  treeBreakpoints,
} from "../../const";

export const createEmptyGrid = () => {
  return Array.from({ length: gridHeight }, () => Array(gridWidth).fill(-1));
};

const calculateBaseTreeSize = (contributionCount: number) => {
  if (contributionCount <= 1) {
    return { baseWidth: 1, trunkWidth: 1, treeHeight: 1 };
  }
  if (contributionCount <= 2) {
    return { baseWidth: 1, trunkWidth: 1, treeHeight: 2 };
  }
  if (contributionCount <= 3) {
    return { baseWidth: 2, trunkWidth: 1, treeHeight: 2 };
  }

  const getTreeRatios = (contributionCount: number) => {
    const breakpoint = treeBreakpoints.find(
      (b) => contributionCount <= b.count
    );
    return breakpoint || treeBreakpoints[treeBreakpoints.length - 1];
  };
  const { widthRatio, narrowness } = getTreeRatios(contributionCount);

  const baseWidth = Math.min(
    Math.ceil(Math.sqrt(contributionCount) * 1.5),
    Math.floor(gridWidth * widthRatio)
  );

  const trunkWidth = Math.min(
    Math.max(1, Math.floor(Math.sqrt(contributionCount) / 3)),
    3
  );

  const treeHeight = Math.min(
    Math.max(4, Math.ceil(Math.sqrt(contributionCount) * narrowness)),
    gridHeight - 5
  );

  return { baseWidth, trunkWidth, treeHeight };
};

export const generateContributionTree = (contributions: Contribution[]) => {
  const grid: number[][] = Array.from({ length: gridHeight }, () =>
    Array(gridWidth).fill(-1)
  );

  const activeContributions = contributions.filter(
    (contribution) => contribution.count > 0
  );
  if (activeContributions.length === 0)
    return {
      grid,
      remainingContributions: 0,
      baseWidth: 0,
      trunkWidth: 0,
      contributionCount: 0,
    };

  const normalizedContributions = activeContributions.map((contribution) => {
    if (contribution.level === "FIRST_QUARTILE") return 1;
    if (contribution.level === "SECOND_QUARTILE") return 2;
    if (contribution.level === "THIRD_QUARTILE") return 3;
    if (contribution.level === "FOURTH_QUARTILE") return 4;
    return -1;
  });

  const centerX = Math.floor(gridWidth / 2);

  const { baseWidth, trunkWidth, treeHeight } = calculateBaseTreeSize(
    normalizedContributions.length
  );

  const trunkHeight = Math.max(Math.min(3, Math.floor(treeHeight / 4)), 1);

  const totalHeight = treeHeight + trunkHeight;
  const yOffset = gridHeight - totalHeight;

  const createTreeShape = () => {
    const positions: [number, number][] = [];
    let remainingContributions = normalizedContributions.length;
    const usedPositions = new Set<string>();

    for (let y = treeHeight - 1; y >= 0 && remainingContributions > 0; y--) {
      const heightRatio = (y + 1) / treeHeight;
      const currentMaxWidth = Math.max(
        1,
        Math.min(Math.floor(baseWidth * heightRatio), remainingContributions)
      );

      const startX = centerX - Math.floor(currentMaxWidth / 2);
      const rowPositions: [number, number][] = [];

      for (let offset = 0; offset < currentMaxWidth; offset++) {
        const x = startX + offset;
        if (x >= 0 && x < gridWidth) {
          let noiseX = x;
          if (y > 1 && (offset === 0 || offset === currentMaxWidth - 1)) {
            if (Math.random() > 0.5) {
              noiseX = offset === 0 ? x + 1 : x - 1;
            }
          }
          rowPositions.push([y + yOffset, noiseX]);
        }
      }

      rowPositions.forEach((pos) => {
        if (remainingContributions > 0) {
          if (!usedPositions.has(`${pos[0]},${pos[1]}`)) {
            positions.push(pos);
            usedPositions.add(`${pos[0]},${pos[1]}`);
            remainingContributions--;
          }
        }
      });
    }

    return { positions, remainingContributions };
  };

  const { positions: treePositions, remainingContributions } =
    createTreeShape();

  treePositions.forEach(([y, x], index) => {
    if (index < normalizedContributions.length) {
      grid[y][x] = normalizedContributions[index];
    }
  });

  const trunkStart = centerX - Math.floor(trunkWidth / 2);
  const lastLeafY = Math.max(...treePositions.map(([y]) => y));

  for (let y = lastLeafY + 1; y < gridHeight; y++) {
    for (
      let x = trunkStart;
      x < trunkStart + trunkWidth && x < gridWidth;
      x++
    ) {
      grid[y][x] = 5;
    }
  }

  return {
    grid,
    remainingContributions,
    baseWidth,
    trunkWidth,
    contributionCount: activeContributions.length,
  };
};

const generateStar = (
  treeGrid: number[][],
  decorationGrid: (string | null)[][],
  contributionCount: number
) => {
  const starSize = Math.max(
    1,
    Math.min(5, Math.floor(contributionCount / 100))
  );

  let topY = -1;
  let centerX = Math.floor(gridWidth / 2);

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      if (treeGrid[y][x] >= 1 && treeGrid[y][x] <= 4) {
        if (topY === -1) {
          topY = y;

          const rowLeaves = [];
          for (let i = 0; i < gridWidth; i++) {
            if (treeGrid[y][i] >= 1 && treeGrid[y][i] <= 4) {
              rowLeaves.push(i);
            }
          }
          if (rowLeaves.length > 0) {
            centerX = Math.floor(
              (Math.min(...rowLeaves) + Math.max(...rowLeaves)) / 2
            );
          }
          break;
        }
      }
    }
    if (topY !== -1) break;
  }

  if (topY === -1) return decorationGrid;

  const startY = Math.max(0, topY - starSize);
  const startX = Math.max(0, centerX - Math.floor(starSize / 2));
  if (starSize === 3) {
    const crossPattern = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ];

    for (let y = 0; y < starSize; y++) {
      for (let x = 0; x < starSize; x++) {
        const gridY = startY + y;
        const gridX = startX + x;

        if (
          gridY >= 0 &&
          gridY < gridHeight &&
          gridX >= 0 &&
          gridX < gridWidth &&
          crossPattern[y][x] === 1
        ) {
          decorationGrid[gridY][gridX] = starColor;
        }
      }
    }
  } else {
    for (let y = 0; y < starSize; y++) {
      for (let x = 0; x < starSize; x++) {
        const gridY = startY + y;
        const gridX = startX + x;

        if (
          gridY >= 0 &&
          gridY < gridHeight &&
          gridX >= 0 &&
          gridX < gridWidth
        ) {
          decorationGrid[gridY][gridX] = starColor;
        }
      }
    }
  }

  return decorationGrid;
};

export const generateDecorations = (
  treeGrid: number[][],
  count: number,
  contributionCount: number
) => {
  const decorationGrid = createEmptyGrid();
  const availableSpots: [number, number][] = [];

  treeGrid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell >= 1 && cell <= 4) {
        availableSpots.push([y, x]);
      }
    });
  });

  const decoratedGrid = generateStar(
    treeGrid,
    decorationGrid,
    contributionCount
  );

  for (let i = 0; i < count && availableSpots.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availableSpots.length);
    const [y, x] = availableSpots.splice(randomIndex, 1)[0];

    if (decoratedGrid[y][x] == "-1") {
      const decorationColor = decorationColors[i % decorationColors.length];
      decoratedGrid[y][x] = decorationColor;
    }
  }

  return decoratedGrid;
};
