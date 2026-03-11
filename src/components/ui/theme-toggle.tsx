"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useHoverSound, useThemeSound } from "@/components/providers/sound-provider";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    
    const playHover = useHoverSound();
    const playSwitch = useThemeSound();

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <span className="sr-only">Toggle theme</span>
            </button>
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => {
                playSwitch();
                setTheme(isDark ? "light" : "dark");
            }}
            onMouseEnter={() => playHover()}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
            <div className="relative h-4 w-4">
                <motion.div
                    initial={false}
                    animate={{ scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Sun className="h-4 w-4" />
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{ scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Moon className="h-4 w-4" />
                </motion.div>
            </div>
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
