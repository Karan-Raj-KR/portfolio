"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Tracks which in-page section is currently centred in the viewport.
 * Returns "" when off the home page (where these sections don't exist).
 */
export function useActiveSection(sectionIds: string[]) {
    const pathname = usePathname();
    const [active, setActive] = useState("");

    // Stable dep: the caller's array is a new identity on every render.
    const sectionKey = sectionIds.join(",");

    useEffect(() => {
        if (pathname !== "/") return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            // Triggers once a section reaches the middle band of the viewport.
            { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
        );

        for (const id of sectionKey.split(",")) {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        }

        return () => observer.disconnect();
    }, [pathname, sectionKey]);

    // Derived rather than reset inside the effect, which avoids a cascading render.
    return pathname === "/" ? active : "";
}
