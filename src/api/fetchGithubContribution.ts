interface ContributionDay {
  contributionCount: number;
  contributionLevel: ContributionLevel;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: ContributionWeek[];
        };
      };
    };
  };
}

export interface Contribution {
  count: number;
  level: ContributionLevel;
}

// GitHub의 공식 contribution level 타입
export type ContributionLevel =
  | "NONE" // 0 contributions
  | "FIRST_QUARTILE" // 낮은 수준
  | "SECOND_QUARTILE" // 중간 수준
  | "THIRD_QUARTILE" // 높은 수준
  | "FOURTH_QUARTILE"; // 매우 높은 수준

export async function fetchGithubContributions(
  username: string
): Promise<Contribution[]> {
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const endpoint = "https://api.github.com/graphql";

  const query = `
    query userContributions($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    username,
    from: oneYearAgo.toISOString(),
    to: today.toISOString(),
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_GITHUB_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = (await response.json()) as GitHubResponse;

    const contributions =
      data.data.user.contributionsCollection.contributionCalendar.weeks
        .flatMap((week) => week.contributionDays)
        .map((day) => ({
          count: day.contributionCount,
          level: day.contributionLevel,
        }));

    return contributions;
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    throw error;
  }
}
