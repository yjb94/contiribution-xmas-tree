import { proxy } from "valtio";
import {
  createEmptyGrid,
  generateContributionTree,
} from "../components/Grid/lib";

type ContributionState = {
  contributions?: number;
  contributionTreeData: ReturnType<typeof generateContributionTree>;
};

export const contributionState = proxy<ContributionState>({
  contributions: undefined,
  contributionTreeData: {
    grid: createEmptyGrid(),
    remainingContributions: 0,
    baseWidth: 0,
    trunkWidth: 0,
    contributionCount: 0,
  },
});
