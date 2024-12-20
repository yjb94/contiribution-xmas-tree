import { proxy } from "valtio";
import { Contribution } from "../api/fetchGithubContribution";
import {
  createEmptyGrid,
  generateContributionTree,
} from "../components/Grid/lib";

type ContributionState = {
  contributions?: number;
  contributionTreeData?: ReturnType<typeof generateContributionTree>;
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

export const setContributions = (contributions: Contribution[]) => {
  contributionState.contributions = contributions.reduce(
    (acc, cur) => acc + cur.count,
    0
  );
};
