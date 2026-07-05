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
  keywords: ['Karan Raj KR', 'Karan Raj AI Engineer', 'Karan Raj Portfolio', 'Karan Raj K R', 'Karan Raj NIAT', 'Karan NIAT', 'Backend Developer', 'AI', 'FastAPI'],
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

const geist = Geist({subsets:['latin'],variable:'--font-sans', display: 'swap'});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased text-foreground selection:bg-foreground selection:text-background",
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
            {children}
          </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
