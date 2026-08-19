const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572a5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Java: "#b07219",
    "Jupyter Notebook": "#da5b0b",
    Go: "#00ADD8",
    Rust: "#dea584",
    Ruby: "#701516",
    PHP: "#4F5D95",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    Shell: "#89e051",
    Kotlin: "#A97BFF",
    Swift: "#F05138",
    Dart: "#00B4AB",
    Lua: "#000080",
    Scala: "#c22d40",
    Zig: "#ec915c",
};

export const FALLBACK_LANGUAGE_COLOR = "#67e8f9";

export function languageColor(language: string | null): string {
    if (!language) return FALLBACK_LANGUAGE_COLOR;
    return LANGUAGE_COLORS[language] ?? FALLBACK_LANGUAGE_COLOR;
}