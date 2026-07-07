import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import { SiteJsonLd } from "@/components/seo/json-ld";
import { MotionProvider } from "@/components/providers/motion-provider";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://karanrajkr.vercel.app"),
  title: {
    default: 'Karan Raj KR | AI Engineer & Backend Developer',
    template: '%s | Karan Raj KR'
  },
  description: 'Karan Raj KR is an AI Engineer and Backend Developer building with Python, FastAPI, and Next.js. Founder of KĀRYO and NIAT Alumni.',
  keywords: ['Karan Raj KR', 'Karan Raj AI Engineer', 'Karan Raj Portfolio', 'Karan Raj KR', 'Karan Raj NIAT', 'Karan NIAT', 'Backend Developer', 'AI', 'FastAPI'],
  authors: [{ name: 'Karan Raj KR' }],
  creator: 'Karan Raj KR',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Karan Raj KR | AI Engineer & Backend Developer',
    description: 'AI Engineer and Backend Developer. Founder of KĀRYO. NIAT Alumni.',
    url: 'https://karanrajkr.vercel.app',
    siteName: 'Karan Raj KR Portfolio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Karan Raj KR - AI Engineer' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karan Raj KR | AI Engineer & Backend Developer',
    description: 'AI Engineer and Backend Developer. Founder of KĀRYO. NIAT Alumni.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  manifest: "/manifest.json",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  }
};

import { ThemeProvider } from "@/components/theme-provider";
import { BottomNav } from "@/components/layout/bottom-nav";

const geist = Geist({subsets:['latin'],variable:'--font-sans', display: 'swap'});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <meta name="google-site-verification" content="0W3wPYuowx9ekB31u-YSCyuTTf0GQeRXilZ3nagT-BM" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Karan Raj KR",
              "alternateName": "Karan Raj",
              "url": "https://karanrajkr.vercel.app",
              "jobTitle": "AI Developer & Founder",
              "worksFor": {
                "@type": "Organization",
                "name": "KĀRYO"
              },
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "NIAT–S-VYASA University"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bengaluru",
                "addressCountry": "IN"
              },
              "sameAs": [
                "https://github.com/Karan-Raj-KR",
                "https://linkedin.com/in/karanrajkr",
                "https://twitter.com/karan_raj_kr",
                "https://instagram.com/karan.rajkr",
                "https://karanrajkr.hashnode.dev",
                "https://dev.to/karanrajkr"
              ]
            })
          }}
        />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased text-foreground selection:bg-foreground selection:text-background overflow-x-hidden",
        outfit.variable
      )}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
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
            <div className="pb-[64px] lg:pb-0">
              {children}
            </div>
            <BottomNav />
          </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
