"use client";

import { motion } from "framer-motion";
import { FolderPlus, GitCommitHorizontal, GitMerge, GitPullRequest } from "lucide-react";
import { languageColor } from "../lib/language-colors";
import { shortCommitSha } from "../lib/format";
import type { ActivityItem, ActivityType } from "../lib/types";
import { RelativeTime } from "./relative-time";

interface ActivityFeedProps {
    items: ActivityItem[];
}

const VERB: Record<ActivityType, string> = {
    commit: "push",
    "pr-opened": "open",
    "pr-merged": "merge",
    "repo-created": "create",
};

const ICON: Record<ActivityType, React.ComponentType<{ className?: string }>> = {
    commit: GitCommitHorizontal,
    "pr-opened": GitPullRequest,
    "pr-merged": GitMerge,
    "repo-created": FolderPlus,
};

function shaFromUrl(url: string): string {
    return url.split("/").pop() ?? "";
}

export function ActivityFeed({ items }: ActivityFeedProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className="mt-12">
            <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span className="text-live">$</span>
                <span>recent activity</span>
            </div>
            <ul className="divide-y divide-border/60 rounded-xl border border-border/60 bg-muted/10">
                {items.map((item, index) => {
                    const Icon = ICON[item.type];
                    const sha = item.type === "commit" ? shortCommitSha(shaFromUrl(item.url)) : null;
                    return (
                        <motion.li
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.28, delay: index * 0.04, ease: "easeOut" }}
                        >
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${VERB[item.type]} ${item.repo} — ${item.message}`}
                                className="group flex items-start gap-3 px-4 py-3 sm:items-center sm:px-5"
                            >
                                <span
                                    aria-hidden="true"
                                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full sm:mt-0"
                                    style={{ backgroundColor: languageColor(item.language) }}
                                />
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 font-mono text-xs">
                                        <Icon
                                            aria-hidden="true"
                                            className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                                        />
                                        <span className="shrink-0 uppercase tracking-wide text-live/90">
                                            {VERB[item.type]}
                                        </span>
                                        <span className="truncate text-muted-foreground">{item.repoName}</span>
                                        {item.branch && (
                                            <span className="hidden shrink-0 text-muted-foreground/60 md:inline">
                                                {item.branch}
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-1 truncate font-mono text-[13px] leading-snug text-foreground/95 group-hover:whitespace-normal group-hover:text-clip md:text-sm">
                                        {item.message}
                                    </p>
                                </div>
                                <div className="flex shrink-0 items-center gap-2 self-start font-mono text-xs text-muted-foreground sm:self-center">
                                    {sha && (
                                        <span className="hidden tabular-nums text-live/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:inline">
                                            {sha}
                                        </span>
                                    )}
                                    <RelativeTime time={item.createdAt} />
                                </div>
                            </a>
                        </motion.li>
                    );
                })}
            </ul>
        </div>
    );
}