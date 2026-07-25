import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import { SiteJsonLd } from "@/components/seo/json-ld";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.karanrajkr.com"),
  title: {
    default: 'Karan Raj KR | AI Engineer & Backend Developer',
    template: '%s | Karan Raj KR'
  },
  description: 'Karan Raj KR is an AI Engineer and Backend Dev building with Python, FastAPI and Next.js. Founder of KĀRYO. B.Tech CSE (AI/ML) at NIAT–S-VYASA, Bengaluru.',
  keywords: ['Karan Raj KR', 'Karan Raj AI Engineer', 'Karan Raj Portfolio', 'Karan Raj KR', 'Karan Raj NIAT', 'Karan NIAT', 'Backend Developer', 'AI', 'FastAPI'],
  authors: [{ name: 'Karan Raj KR' }],
  creator: 'Karan Raj KR',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Karan Raj KR | AI Engineer & Backend Developer',
    description: 'Karan Raj KR is an AI Engineer and Backend Dev building with Python, FastAPI and Next.js. Founder of KĀRYO. B.Tech CSE (AI/ML) at NIAT–S-VYASA, Bengaluru.',
    url: 'https://www.karanrajkr.com',
    siteName: 'Karan Raj KR Portfolio',
    images: [{ url: 'https://www.karanrajkr.com/og-image.png', width: 1200, height: 630, alt: 'Karan Raj KR - AI Engineer and Backend Developer, Founder of KĀRYO' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karan Raj KR | AI Engineer & Backend Developer',
    description: 'Karan Raj KR is an AI Engineer and Backend Dev building with Python, FastAPI and Next.js. Founder of KĀRYO. B.Tech CSE (AI/ML) at NIAT–S-VYASA, Bengaluru.',
    images: ['https://www.karanrajkr.com/og-image.png'],
  },
  verification: {
    // Was also hardcoded as a second <meta> in <head>, which emitted two
    // conflicting tags whenever the env var was set.
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ?? '0W3wPYuowx9ekB31u-YSCyuTTf0GQeRXilZ3nagT-BM',
  },
  // icon.png and apple-icon.png in src/app are picked up automatically.
  manifest: "/manifest.json",
};

import { ThemeProvider } from "@/components/theme-provider";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const geist = Geist({subsets:['latin'],variable:'--font-sans', display: 'swap'});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased text-foreground selection:bg-foreground selection:text-background overflow-x-hidden",
        outfit.variable
      )}>
        {process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        )}
        <SiteJsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ScrollProgress />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
          >
            Skip to main content
          </a>
          <Header />
          <div className="pb-[calc(80px+env(safe-area-inset-bottom))] lg:pb-0">
            {children}
          </div>
          <Footer />
          <BottomNav />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
