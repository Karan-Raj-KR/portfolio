import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: 'Karan Raj — Backend Developer & Founder of KĀRYO',
  description: 'Karan Raj is a backend developer and B.Tech CSE student building with Python and FastAPI. Founder of KĀRYO, a digital studio helping local businesses get online.',
  alternates: {
    canonical: 'https://karanrajkr.vercel.app',
  },
  openGraph: {
    title: 'Karan Raj — Backend Developer & Founder of KĀRYO',
    description: 'Backend developer, builder, and co-founder of KĀRYO digital studio. Based in Bengaluru, India.',
    url: 'https://karanrajkr.vercel.app',
    siteName: 'Karan Raj',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karan Raj — Backend Developer & Founder of KĀRYO',
    images: ['/og-image.jpg'],
  },
};

import { ThemeProvider } from "@/components/theme-provider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Karan Raj",
  url: "https://karanrajkr.vercel.app",
  image: "https://karanrajkr.vercel.app/og-image.jpg",
  jobTitle: "Backend Developer & Founder",
  worksFor: {
    "@type": "Organization",
    name: "KĀRYO"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Karan Raj",
  url: "https://karanrajkr.vercel.app"
};


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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personSchema, websiteSchema]) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
