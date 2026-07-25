"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Same size as the mounted button, so hydration doesn't shift the header.
    if (!mounted) {
        return (
            <button
                aria-hidden="true"
                tabIndex={-1}
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background"
            />
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-pressed={isDark}
            aria-label={isDark ? "Dark theme, switch to light" : "Light theme, switch to dark"}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted"
        >
            {/* CSS crossfade — this button was the last thing pulling
                framer-motion into the root layout. */}
            <span className="relative block h-4 w-4">
                <Sun
                    className="absolute inset-0 h-4 w-4 transition-all duration-200"
                    style={{ opacity: isDark ? 0 : 1, transform: `scale(${isDark ? 0 : 1})` }}
                />
                <Moon
                    className="absolute inset-0 h-4 w-4 transition-all duration-200"
                    style={{ opacity: isDark ? 1 : 0, transform: `scale(${isDark ? 1 : 0})` }}
                />
            </span>
        </button>
    );
}
