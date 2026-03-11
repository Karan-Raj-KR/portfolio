"use client";

import ClickSpark from "@/components/ClickSpark";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ClickSparkWrapper({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();
    const isClient = typeof window !== 'undefined';
    const sparkColor = isClient && theme === "light" ? "#000000" : "#ffffff";

    return (
        <ClickSpark
            sparkColor={sparkColor}
            sparkSize={12}
            sparkRadius={25}
            sparkCount={9}
            duration={350}
            easing="ease-out"
            extraScale={1.3}
        >
            {children}
        </ClickSpark>
    );
}
