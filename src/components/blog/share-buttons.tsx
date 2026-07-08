"use client";

import { Twitter, Linkedin, MessageCircle, Share2 } from "lucide-react";
import { Publication } from "@/data/publications";

export function ShareButtons({ publication }: { publication: Publication }) {
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (navigator.share) {
      try {
        await navigator.share({
          title: publication.title,
          text: publication.excerpt,
          url: publication.url,
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

  const encodedUrl = encodeURIComponent(publication.url);
  const encodedTitle = encodeURIComponent(publication.title);

  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;

  return (
    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border z-20 relative">
      <span className="text-xs font-medium text-muted-foreground mr-2">Share:</span>
      <button
        onClick={handleLink(twitterUrl)}
        className="text-muted-foreground hover:text-foreground transition-colors p-1"
        aria-label="Share on X (Twitter)"
      >
        <Twitter className="h-4 w-4" />
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
