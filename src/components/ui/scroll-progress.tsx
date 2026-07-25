// Scroll-driven CSS animation (see .scroll-progress in globals.css) — no JS,
// no client boundary, and framer-motion stays off the root layout.
export function ScrollProgress() {
    return <div className="scroll-progress" aria-hidden="true" />;
}
