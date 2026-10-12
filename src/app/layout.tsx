import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import { SiteJsonLd } from "@/components/seo/json-ld";
import { MotionProvider } from "@/components/providers/motion-provider";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.karanrajkr.com"),
  title: {
    default: "Karan Raj KR | Founder, KĀRYO",
    template: "%s | Karan Raj KR",
  },
  description:
    "Karan Raj KR is a developer and founder based in Bengaluru, India, building AI applications, backend systems and technology products. Explore his projects, open-source work, achievements and articles.",
  keywords: [
    "Karan Raj KR",
    "Karan Raj KR",
    "Karan Raj",
    "AI Engineer",
    "Backend Developer",
    "KĀRYO",
    "FastAPI",
    "Python",
    "Next.js",
    "Bengaluru",
  ],
  authors: [{ name: "Karan Raj KR", url: "https://www.karanrajkr.com" }],
  creator: "Karan Raj KR",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Karan Raj KR | Founder, KĀRYO",
    description:
      "Karan Raj KR is a developer and founder based in Bengaluru, India, building AI applications, backend systems and technology products. Explore his projects, open-source work, achievements and articles.",
    url: "https://www.karanrajkr.com",
    siteName: "Karan Raj KR",
    images: [
      {
        url: "https://www.karanrajkr.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Karan Raj KR — Founder, KĀRYO",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan Raj KR | Founder, KĀRYO",
    description:
      "Karan Raj KR is a developer and founder based in Bengaluru, India, building AI applications, backend systems and technology products. Explore his projects, open-source work, achievements and articles.",
    creator: "@karan_raj_kr",
    images: ["https://www.karanrajkr.com/og-image.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "0W3wPYuowx9ekB31u-YSCyuTTf0GQeRXilZ3nagT-BM",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

import { ThemeProvider } from "@/components/theme-provider";
import { BottomNav } from "@/components/layout/bottom-nav";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <meta name="google-site-verification" content="0W3wPYuowx9ekB31u-YSCyuTTf0GQeRXilZ3nagT-BM" />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased text-foreground selection:bg-foreground selection:text-background overflow-x-hidden",
        outfit.variable
      )}>
        {process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        )}
        <SiteJsonLd />
        <MotionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <ScrollProgress />
            <div className="pb-[64px] lg:pb-0">
              {children}
            </div>
            <BottomNav />
          </ThemeProvider>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
