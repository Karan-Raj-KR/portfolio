import type { GitHubStats } from "./types";

// Never present invented statistics or timestamps as live activity.
export function buildFallbackStats(): GitHubStats {
  return {
    unavailable: true,
    username: "Karan-Raj-KR",
    profileUrl: "https://github.com/Karan-Raj-KR",
    followers: 0,
    publicRepos: 0,
    totalStars: 0,
    commits30d: 0,
    activeRepos30d: 0,
    prsOpened30d: 0,
    prsMerged30d: 0,
    languages: [],
    activities: [],
    lastCommitAt: "",
    lastCommitUrl: null,
  };
}
