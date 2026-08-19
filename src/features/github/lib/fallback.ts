import type { GitHubStats } from "./types";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

export function buildFallbackStats(): GitHubStats {
  const now = Date.now();
  return {
    username: "Karan-Raj-KR",
    profileUrl: "https://github.com/Karan-Raj-KR",
    followers: 14,
    publicRepos: 35,
    totalStars: 8,
    commits30d: 116,
    activeRepos30d: 3,
    prsOpened30d: 58,
    prsMerged30d: 40,
    languages: [
      { name: "TypeScript", bytes: 867805, percent: 59.9 },
      { name: "Python", bytes: 375132, percent: 25.9 },
      { name: "JavaScript", bytes: 183965, percent: 12.7 },
      { name: "HTML", bytes: 21731, percent: 1.5 },
    ],
    activities: [
      {
        id: "fb-commit-1",
        type: "commit",
        repo: "Karan-Raj-KR/crewai-recipes",
        repoName: "crewai-recipes",
        repoUrl: "https://github.com/Karan-Raj-KR/crewai-recipes",
        message: "chore(template): sync _template/llm.py with latest slice recipes",
        url: "https://github.com/Karan-Raj-KR/crewai-recipes/commit/d40a7ca",
        createdAt: new Date(now - 2 * HOUR).toISOString(),
        language: "Python",
        branch: "main",
      },
      {
        id: "fb-commit-2",
        type: "commit",
        repo: "Karan-Raj-KR/portfolio",
        repoName: "portfolio",
        repoUrl: "https://github.com/Karan-Raj-KR/portfolio",
        message: "Merge pull request #11 from Karan-Raj-KR/feat/portfolio-refresh-2026-08",
        url: "https://github.com/Karan-Raj-KR/portfolio/commit/1ab0966e",
        createdAt: new Date(now - 21 * HOUR).toISOString(),
        language: "TypeScript",
        branch: "main",
      },
      {
        id: "fb-commit-3",
        type: "commit",
        repo: "Karan-Raj-KR/Karan-Raj-KR",
        repoName: "Karan-Raj-KR",
        repoUrl: "https://github.com/Karan-Raj-KR/Karan-Raj-KR",
        message: "Update README.md",
        url: "https://github.com/Karan-Raj-KR/Karan-Raj-KR/commit/6ba159a",
        createdAt: new Date(now - 28 * HOUR).toISOString(),
        language: null,
        branch: "main",
      },
      {
        id: "fb-pr-1",
        type: "pr-opened",
        repo: "Karan-Raj-KR/portfolio",
        repoName: "portfolio",
        repoUrl: "https://github.com/Karan-Raj-KR/portfolio",
        message: "Open pull request #10 — portfolio refresh",
        url: "https://github.com/Karan-Raj-KR/portfolio/pull/10",
        createdAt: new Date(now - 2 * DAY).toISOString(),
        language: "TypeScript",
      },
      {
        id: "fb-pr-2",
        type: "pr-merged",
        repo: "Karan-Raj-KR/crewai-recipes",
        repoName: "crewai-recipes",
        repoUrl: "https://github.com/Karan-Raj-KR/crewai-recipes",
        message: "Merge pull request #198 — update docs",
        url: "https://github.com/Karan-Raj-KR/crewai-recipes/pull/198",
        createdAt: new Date(now - 3 * DAY).toISOString(),
        language: "Python",
      },
    ],
    lastCommitAt: new Date(now - 2 * HOUR).toISOString(),
    lastCommitUrl: "https://github.com/Karan-Raj-KR/crewai-recipes/commit/d40a7ca",
  };
}