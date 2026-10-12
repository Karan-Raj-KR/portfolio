import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
  Youtube,
  Send,
  Code2,
  BookOpen,
  Facebook,
  ExternalLink,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SocialLink {
  name: string;
  icon: LucideIcon;
  href: string;
  info: string;
  category?: "primary" | "secondary";
}

/**
 * All verified public social profile URLs for Karan Raj KR
 * Used for Schema.org sameAs and centralized identity resolution.
 */
export const verifiedProfileUrls = {
  github: "https://github.com/Karan-Raj-KR",
  linkedin: "https://www.linkedin.com/in/karanrajkr/",
  x: "https://x.com/karan_raj_kr",
  youtube: "https://www.youtube.com/@KaranRajKR",
  stackoverflow: "https://stackoverflow.com/users/31432882/karan-raj-kr",
  medium: "https://medium.com/@karanrajkr2008",
  telegram: "https://t.me/karan_raj_kr",
  hashnode: "https://hashnode.com/@karanrajkr",
  facebook: "https://www.facebook.com/profile.php?id=61580316754426",
  instagram: "https://www.instagram.com/karan.rajkr/",
  email: "mailto:mail@karanrajkr.com",
} as const;

/**
 * Array of canonical profile URLs for Person structured data (sameAs)
 */
export const personSameAs: string[] = [
  verifiedProfileUrls.github,
  verifiedProfileUrls.linkedin,
  verifiedProfileUrls.x,
  verifiedProfileUrls.youtube,
  verifiedProfileUrls.stackoverflow,
  verifiedProfileUrls.medium,
  verifiedProfileUrls.telegram,
  verifiedProfileUrls.hashnode,
  verifiedProfileUrls.facebook,
];

/**
 * Primary social links for concise UI sections (Hero, Contact)
 * Preserves clean aesthetic without overwhelming the layout.
 */
export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    icon: Github,
    href: verifiedProfileUrls.github,
    info: "github.com/Karan-Raj-KR",
    category: "primary",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: verifiedProfileUrls.linkedin,
    info: "linkedin.com/in/karanrajkr",
    category: "primary",
  },
  {
    name: "X (Twitter)",
    icon: Twitter,
    href: verifiedProfileUrls.x,
    info: "@karan_raj_kr",
    category: "primary",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: verifiedProfileUrls.instagram,
    info: "@karan.rajkr",
    category: "primary",
  },
  {
    name: "Email",
    icon: Mail,
    href: verifiedProfileUrls.email,
    info: "mail@karanrajkr.com",
    category: "primary",
  },
];

/**
 * Extended social links for the About page and complete profile listing
 */
export const allSocialLinks: SocialLink[] = [
  ...socialLinks,
  {
    name: "YouTube",
    icon: Youtube,
    href: verifiedProfileUrls.youtube,
    info: "@KaranRajKR",
    category: "secondary",
  },
  {
    name: "Stack Overflow",
    icon: Code2,
    href: verifiedProfileUrls.stackoverflow,
    info: "karan-raj-kr",
    category: "secondary",
  },
  {
    name: "Hashnode",
    icon: ExternalLink,
    href: verifiedProfileUrls.hashnode,
    info: "@karanrajkr",
    category: "secondary",
  },
  {
    name: "Medium",
    icon: BookOpen,
    href: verifiedProfileUrls.medium,
    info: "@karanrajkr2008",
    category: "secondary",
  },
  {
    name: "Telegram",
    icon: Send,
    href: verifiedProfileUrls.telegram,
    info: "@karan_raj_kr",
    category: "secondary",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: verifiedProfileUrls.facebook,
    info: "Karan Raj KR",
    category: "secondary",
  },
];
