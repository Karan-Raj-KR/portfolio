export interface GitHubUser {
    login: string;
    public_repos: number;
    followers: number;
    html_url: string;
}

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    language: string | null;
    size: number;
    pushed_at: string;
    stargazers_count: number;
    fork: boolean;
    default_branch: string;
}

interface GitHubCommitCommitter {
    date: string;
}

export interface GitHubCommit {
    sha: string;
    html_url: string;
    commit: {
        message: string;
        author: { date: string };
        committer?: GitHubCommitCommitter;
    };
    repository?: {
        full_name: string;
        languages_url: string;
    };
}

export interface GitHubPullRequest {
    number: number;
    state: "open" | "closed";
    title: string;
    html_url: string;
    created_at: string;
    merged_at: string | null;
    merged?: boolean;
    user: { login: string };
}

export interface GitHubEvent {
    id: string;
    type: string;
    created_at: string;
    repo: { id: number; name: string; url: string };
    payload: {
        action?: string;
        ref?: string | null;
        ref_type?: string | null;
        head?: string;
        pull_request?: { number: number; state?: string; merged?: boolean; html_url?: string };
    };
}

export type ActivityType =
    | "commit"
    | "pr-opened"
    | "pr-merged"
    | "repo-created";

export interface ActivityItem {
    id: string;
    type: ActivityType;
    repo: string;
    repoName: string;
    repoUrl: string;
    message: string;
    url: string;
    createdAt: string;
    language: string | null;
    branch?: string | null;
}

export interface LanguageStat {
    name: string;
    bytes: number;
    percent: number;
}

export interface GitHubStats {
    username: string;
    profileUrl: string;
    followers: number;
    publicRepos: number;
    totalStars: number;
    commits30d: number;
    activeRepos30d: number;
    prsOpened30d: number;
    prsMerged30d: number;
    languages: LanguageStat[];
    activities: ActivityItem[];
    lastCommitAt: string;
    lastCommitUrl: string | null;
}