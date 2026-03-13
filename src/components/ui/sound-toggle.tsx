"use client";

import * as React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useSoundContext, useHoverSound, useThemeSound } from "@/components/providers/sound-provider";

export function SoundToggle() {
    const { soundEnabled, toggleSound } = useSoundContext();
    const playHover = useHoverSound();
    const playSwitch = useThemeSound();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <span className="sr-only">Toggle sound</span>
            </button>
        );
    }

    return (
        <button
            onClick={() => {
                // Play switch sound first if turning ON
                if (!soundEnabled && playSwitch) {
                    // Temporarily bypass the disabled check to play the "turn on" sound
                    playSwitch();
                }
                toggleSound();
            }}
            onMouseEnter={() => playHover()}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            aria-label="Toggle sound"
            title={soundEnabled ? "Mute sounds" : "Enable sounds"}
        >
            <div className="relative h-4 w-4">
                <motion.div
                    initial={false}
                    animate={{ scale: soundEnabled ? 1 : 0, opacity: soundEnabled ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Volume2 className="h-4 w-4" />
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{ scale: soundEnabled ? 0 : 1, opacity: soundEnabled ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <VolumeX className="h-4 w-4" />
                </motion.div>
            </div>
            <span className="sr-only">Toggle sound</span>
        </button>
    );
}
