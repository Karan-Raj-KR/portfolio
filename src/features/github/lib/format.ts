const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

export function formatRelative(iso: string, now: number = Date.now()): string {
    const then = new Date(iso).getTime();
    if (Number.isNaN(then)) return "";
    const seconds = Math.max(0, Math.floor((now - then) / 1000));
    if (seconds < MINUTE) return "just now";
    if (seconds < HOUR) {
        const minutes = Math.floor(seconds / MINUTE);
        return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
    }
    if (seconds < DAY) {
        const hours = Math.floor(seconds / HOUR);
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }
    if (seconds < WEEK) {
        const days = Math.floor(seconds / DAY);
        return `${days} day${days === 1 ? "" : "s"} ago`;
    }
    const weeks = Math.floor(seconds / WEEK);
    return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
}

export function formatShortDate(iso: string): string {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    });
}

export function shortCommitSha(sha: string | null): string {
    if (!sha) return "";
    return sha.slice(0, 7);
}

export function truncateMessage(message: string, max = 60): string {
    const singleLine = message.replace(/\s+/g, " ").trim();
    if (singleLine.length <= max) return singleLine;
    return `${singleLine.slice(0, max - 1)}…`;
}