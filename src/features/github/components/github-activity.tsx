import { ArrowUpRight, Github } from "lucide-react";
import { getGitHubStats } from "../lib/github";
import { ActivityFeed } from "./activity-feed";
import { LanguageBar } from "./language-bar";
import { RecencyIndicator } from "./recency-indicator";
import { StatCard } from "./stat-card";

const STAT_DESCRIPTIONS = [
    { label: "Commits", hint: "last 90 days" },
    { label: "Repos", hint: "last 90 days" },
    { label: "PRs opened", hint: "last 90 days" },
    { label: "PRs merged", hint: "last 90 days" },
] as const;

export async function GithubActivity() {
    const stats = await getGitHubStats();

    if (stats.unavailable) {
        return (
            <div className="mt-14 rounded-xl border border-border bg-muted/10 p-6 text-muted-foreground">
                <p>GitHub activity is temporarily unavailable.</p>
                <a href={stats.profileUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-foreground hover:underline">View GitHub <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
            </div>
        );
    }

    return (
        <div className="mt-14">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                    Open-source activity
                </span>
                <a
                    href={stats.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground"
                >
                    <Github aria-hidden="true" className="h-3.5 w-3.5" />
                    @{stats.username}
                    <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
                </a>
            </div>

            <dl className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                <StatCard
                    value={stats.commits90d}
                    label={STAT_DESCRIPTIONS[0].label}
                    hint={STAT_DESCRIPTIONS[0].hint}
                    index={0}
                />
                <StatCard
                    value={stats.activeRepos90d}
                    label={STAT_DESCRIPTIONS[1].label}
                    hint={STAT_DESCRIPTIONS[1].hint}
                    index={1}
                />
                <StatCard
                    value={stats.prsOpened90d}
                    label={STAT_DESCRIPTIONS[2].label}
                    hint={STAT_DESCRIPTIONS[2].hint}
                    index={2}
                />
                <StatCard
                    value={stats.prsMerged90d}
                    label={STAT_DESCRIPTIONS[3].label}
                    hint={STAT_DESCRIPTIONS[3].hint}
                    index={3}
                />
            </dl>

            <ActivityFeed items={stats.activities} />

            <LanguageBar languages={stats.languages} />

            <RecencyIndicator
                lastCommitAt={stats.lastCommitAt}
                commitUrl={stats.lastCommitUrl}
                profileUrl={stats.profileUrl}
                username={stats.username}
            />
        </div>
    );
}