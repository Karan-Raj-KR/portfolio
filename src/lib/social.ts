import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SocialLink {
    name: string;
    icon: LucideIcon;
    href: string;
    info: string;
}

export const socialLinks: SocialLink[] = [
    {
        name: "GitHub",
        icon: Github,
        href: "https://github.com/Karan-Raj-KR",
        info: "github.com/Karan-Raj-KR",
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        href: "https://www.linkedin.com/in/karanrajkr/",
        info: "linkedin.com/in/karanrajkr",
    },
    {
        name: "Instagram",
        icon: Instagram,
        href: "https://www.instagram.com/karan.rajkr/",
        info: "@karan.rajkr",
    },
    {
        name: "Email",
        icon: Mail,
        href: "mailto:karanrajkr2008@gmail.com",
        info: "karanrajkr2008@gmail.com",
    },
];
