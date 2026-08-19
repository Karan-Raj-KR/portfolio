import "server-only";

import { buildFallbackStats } from "./fallback";
import type {
    ActivityItem,
    GitHubCommit,
    GitHubEvent,
    GitHubPullRequest,
    GitHubRepo,
    GitHubStats,
    GitHubUser,
    LanguageStat,
} from "./types";

export const GITHUB_USERNAME = "Karan-Raj-KR";
export const GITHUB_REVALIDATE = 3600;

const API_ORIGIN = "https://api.github.com";
const REQUEST_TIMEOUT_MS = 8000;
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function apiHeaders(): Record<string, string> {
    const token = process.env.GITHUB_TOKEN;
    return {
        Accept: "application/vnd.github+json",
        "User-Agent": "karanrajkr-portfolio",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}

async function getGitHub<T>(path: string): Promise<T> {
    const response = await fetch(`${API_ORIGIN}${path}`, {
        headers: apiHeaders(),
        cache: "force-cache",
        next: { revalidate: GITHUB_REVALIDATE },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!response.ok) {
        throw new Error(`GitHub API ${response.status}: ${path}`);
    }
    return (await response.json()) as T;
}

async function safeGetGitHub<T>(path: string): Promise<T | null> {
    try {
        return await getGitHub<T>(path);
    } catch {
        return null;
    }
}

const toTime = (iso: string): number => new Date(iso).getTime();

function repoShortName(fullName: string): string {
    const parts = fullName.split("/");
    return parts[parts.length - 1] ?? fullName;
}

export async function getGitHubStats(): Promise<GitHubStats> {
    try {
        return await fetchGitHubStats();
    } catch {
        return buildFallbackStats();
    }
}

async function fetchGitHubStats(): Promise<GitHubStats> {
    const cutoff = Date.now() - THIRTY_DAYS_MS;
    const cutoffIso = new Date(cutoff).toISOString();

    const [user, repos, assignedEvents] = await Promise.all([
        safeGetGitHub<GitHubUser>(`/users/${GITHUB_USERNAME}`),
        safeGetGitHub<GitHubRepo[]>(`/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`),
        safeGetGitHub<GitHubEvent[]>(`/users/${GITHUB_USERNAME}/events/public?per_page=100&page=1`),
    ]);

    if (!user || !repos) throw new Error("GitHub user or repos unavailable");

    const eventsPages = await Promise.all([
        assignedEvents,
        safeGetGitHub<GitHubEvent[]>(`/users/${GITHUB_USERNAME}/events/public?per_page=100&page=2`),
    ]);
    const events = (eventsPages.filter(Boolean) as GitHubEvent[][]).flat();

    const ownedRepos = repos.filter((repo) => !repo.fork);
    const candidateRepos = ownedRepos.filter(
        (repo) => repo.pushed_at && toTime(repo.pushed_at) > cutoff,
    );

    const repoByFullName = new Map<string, GitHubRepo>(ownedRepos.map((repo) => [repo.full_name, repo]));

    const commitPages = await Promise.all(
        candidateRepos.flatMap((repo) => [
            safeGetGitHub<GitHubCommit[]>(
                `/repos/${repo.full_name}/commits?since=${cutoffIso}&per_page=100&page=1`,
            ),
            safeGetGitHub<GitHubCommit[]>(
                `/repos/${repo.full_name}/commits?since=${cutoffIso}&per_page=100&page=2`,
            ),
        ]),
    );

    const commitsByRepo = new Map<string, GitHubCommit[]>();
    candidateRepos.forEach((repo, index) => {
        const commits: GitHubCommit[] = [];
        for (const page of [commitPages[index * 2], commitPages[index * 2 + 1]]) {
            if (page) commits.push(...page);
        }
        if (commits.length > 0) commitsByRepo.set(repo.full_name, commits);
    });

    const commits30d = [...commitsByRepo.values()].reduce((sum, commits) => sum + commits.length, 0);

    const prEventRepoNames = Array.from(
        new Set(
            events
                .filter((event) => event.type === "PullRequestEvent")
                .map((event) => event.repo.name),
        ),
    );

    const pullPages = await Promise.all(
        prEventRepoNames.map((repoName) =>
            safeGetGitHub<GitHubPullRequest[]>(
                `/repos/${repoName}/pulls?state=all&sort=updated&direction=desc&per_page=100`,
            ),
        ),
    );

    const pullsByRepo = new Map<string, Map<number, GitHubPullRequest>>();
    prEventRepoNames.forEach((repoName, index) => {
        const page = pullPages[index];
        if (page) pullsByRepo.set(repoName, new Map(page.map((pr) => [pr.number, pr])));
    });

    const pullLists = [...pullsByRepo.values()];
    const prsOpened30d = pullLists.reduce(
        (sum, prs) =>
            sum +
            [...prs.values()].filter((pr) => toTime(pr.created_at) > cutoff).length,
        0,
    );
    const prsMerged30d = pullLists.reduce(
        (sum, prs) =>
            sum +
            [...prs.values()].filter((pr) => pr.merged_at && toTime(pr.merged_at) > cutoff).length,
        0,
    );

    const languageTotals = new Map<string, number>();
    let languageTotalBytes = 0;
    for (const repo of ownedRepos) {
        if (!repo.language || !repo.size) continue;
        const bytes = repo.size * 1024;
        languageTotals.set(repo.language, (languageTotals.get(repo.language) ?? 0) + bytes);
        languageTotalBytes += bytes;
    }
    const languages: LanguageStat[] = [...languageTotals.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, bytes]) => ({
            name,
            bytes,
            percent: languageTotalBytes > 0 ? (bytes / languageTotalBytes) * 100 : 0,
        }));

    const commitItems: ActivityItem[] = [];
    for (const repo of candidateRepos) {
        const commits = commitsByRepo.get(repo.full_name) ?? [];
        for (const commit of commits) {
            const firstLine = (commit.commit.message.split("\n")[0] ?? "").trim();
            commitItems.push({
                id: `commit-${commit.sha}`,
                type: "commit",
                repo: repo.full_name,
                repoName: repo.name,
                repoUrl: repo.html_url,
                message: firstLine || "push",
                url: commit.html_url,
                createdAt: commit.commit.author?.date ?? commit.commit.committer?.date ?? repo.pushed_at,
                language: repo.language,
                branch: repo.default_branch,
            });
        }
    }

    const prItems: ActivityItem[] = [];
    for (const event of events) {
        if (event.type !== "PullRequestEvent") continue;
        const action = event.payload.action;
        const number = event.payload.pull_request?.number;
        if (!number) continue;
        const pr = pullsByRepo.get(event.repo.name)?.get(number);
        if (action === "opened") {
            prItems.push({
                id: `pr-opened-${event.id}`,
                type: "pr-opened",
                repo: event.repo.name,
                repoName: repoShortName(event.repo.name),
                repoUrl: `https://github.com/${event.repo.name}`,
                message: pr ? `PR #${number} — ${pr.title}` : `open PR #${number}`,
                url: pr?.html_url ?? `https://github.com/${event.repo.name}/pulls/${number}`,
                createdAt: event.created_at,
                language: repoByFullName.get(event.repo.name)?.language ?? null,
                branch: null,
            });
        } else if (action === "closed" && pr?.merged_at) {
            prItems.push({
                id: `pr-merged-${event.id}`,
                type: "pr-merged",
                repo: event.repo.name,
                repoName: repoShortName(event.repo.name),
                repoUrl: `https://github.com/${event.repo.name}`,
                message: pr.title ? `PR #${number} — ${pr.title}` : `merge PR #${number}`,
                url: pr.html_url,
                createdAt: event.created_at,
                language: repoByFullName.get(event.repo.name)?.language ?? null,
                branch: null,
            });
        }
    }

    const createdItems: ActivityItem[] = [];
    for (const event of events) {
        if (event.type !== "CreateEvent" || event.payload.ref_type !== "repository") continue;
        createdItems.push({
            id: `repo-created-${event.id}`,
            type: "repo-created",
            repo: event.repo.name,
            repoName: repoShortName(event.repo.name),
            repoUrl: `https://github.com/${event.repo.name}`,
            message: "create repository",
            url: `https://github.com/${event.repo.name}`,
            createdAt: event.created_at,
            language: repoByFullName.get(event.repo.name)?.language ?? null,
            branch: null,
        });
    }

    let activities = [...commitItems, ...prItems, ...createdItems].sort(
        (a, b) => toTime(b.createdAt) - toTime(a.createdAt),
    );

    if (activities.length === 0) {
        activities = candidateRepos
            .sort((a, b) => toTime(b.pushed_at) - toTime(a.pushed_at))
            .slice(0, 5)
            .map((repo) => ({
                id: `pushed-${repo.full_name}`,
                type: "commit" as const,
                repo: repo.full_name,
                repoName: repo.name,
                repoUrl: repo.html_url,
                message: "push",
                url: repo.html_url,
                createdAt: repo.pushed_at,
                language: repo.language,
                branch: repo.default_branch,
            }));
    }

    const latestCommit = commitItems.length
        ? [...commitItems].sort((a, b) => toTime(b.createdAt) - toTime(a.createdAt))[0]
        : undefined;

    const lastCommitAt = latestCommit?.createdAt ?? [...candidateRepos].sort(
        (a, b) => toTime(b.pushed_at) - toTime(a.pushed_at),
    )[0]?.pushed_at ?? new Date().toISOString();

    const lastCommitSha = latestCommit?.url?.split("/").pop() ?? fallbackShaFromPush(events);

    return {
        username: user.login,
        profileUrl: `https://github.com/${user.login}`,
        followers: user.followers,
        publicRepos: user.public_repos,
        totalStars: repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0),
        commits30d,
        activeRepos30d: candidateRepos.length,
        prsOpened30d,
        prsMerged30d,
        languages,
        activities: activities.slice(0, 5),
        lastCommitAt,
        lastCommitSha,
    };
}

function fallbackShaFromPush(events: GitHubEvent[]): string | null {
    const newestPush = events
        .filter((event) => event.type === "PushEvent" && event.payload.head)
        .sort((a, b) => toTime(b.created_at) - toTime(a.created_at))[0];
    return newestPush?.payload.head ?? null;
}