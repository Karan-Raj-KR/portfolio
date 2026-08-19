"use client";

import { useEffect, useState } from "react";
import { formatRelative, formatShortDate } from "../lib/format";

interface RelativeTimeProps {
    time: string;
}

export function RelativeTime({ time }: RelativeTimeProps) {
    const [label, setLabel] = useState<string | null>(null);

    useEffect(() => {
        const update = () => setLabel(formatRelative(time));
        update();
        const id = window.setInterval(update, 60_000);
        return () => window.clearInterval(id);
    }, [time]);

    return <time dateTime={time}>{label ?? formatShortDate(time)}</time>;
}