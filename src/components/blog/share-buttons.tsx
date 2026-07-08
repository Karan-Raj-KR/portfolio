"use client";

import { Linkedin, MessageCircle, Share2 } from "lucide-react";
import { Article } from "@/data/publications";

const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function ShareButtons({ article }: { article: Article }) {
  const canonicalUrl = article.canonicalUrl || article.platforms[0]?.url || "";

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: canonicalUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback if Web Share API is not supported
      alert("Sharing is not supported on this browser.");
    }
  };

  const handleLink = (url: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const encodedUrl = encodeURIComponent(canonicalUrl);
  const encodedTitle = encodeURIComponent(article.title);

  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;

  return (
    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border relative z-20">
      <span className="text-xs font-medium text-muted-foreground mr-2">Share:</span>
      <button
        onClick={handleLink(twitterUrl)}
        className="text-muted-foreground hover:text-foreground transition-colors p-1"
        aria-label="Share on X (Twitter)"
      >
        <XIcon className="h-4 w-4" />
      </button>
      <button
        onClick={handleLink(linkedinUrl)}
        className="text-muted-foreground hover:text-foreground transition-colors p-1"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </button>
      <button
        onClick={handleLink(whatsappUrl)}
        className="text-muted-foreground hover:text-foreground transition-colors p-1"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
      </button>
      <button
        onClick={handleShare}
        className="text-muted-foreground hover:text-foreground transition-colors p-1 sm:hidden ml-auto"
        aria-label="Native Share"
      >
        <Share2 className="h-4 w-4" />
      </button>
    </div>
  );
}
