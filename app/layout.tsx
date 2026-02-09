import type { Metadata, Viewport } from "next";
import { Space_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono"
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sgunigpa.com"),
  title: {
    default: "SGUniGPA - Free GPA Calculator for NUS, NTU & SMU Students",
    template: "%s | SGUniGPA",
  },
  description:
    "Free online GPA calculator for Singapore university students. Calculate your NUS CAP with S/U options, NTU GPA, and SMU GPA instantly. Accurate grading scales, saves locally, no login required.",
  keywords: [
    "GPA calculator Singapore",
    "NUS CAP calculator",
    "NUS S/U calculator",
    "NTU GPA calculator",
    "SMU GPA calculator",
    "Singapore university GPA",
    "grade calculator NUS",
    "grade calculator NTU",
    "grade calculator SMU",
    "calculate CAP NUS",
    "calculate GPA Singapore",
    "university GPA tool",
    "NUS modular credits calculator",
    "free GPA calculator",
    "online GPA calculator",
  ],
  authors: [{ name: "Han Sheng", url: "https://www.hansheng.dev" }],
  creator: "Han Sheng",
  publisher: "SGUniGPA",
  alternates: {
    canonical: "https://sgunigpa.com",
  },
  openGraph: {
    title: "SGUniGPA - Free GPA Calculator for NUS, NTU & SMU",
    description:
      "Calculate your Singapore university GPA instantly. Supports NUS CAP with S/U options, NTU, and SMU grading systems. Free, accurate, and saves your data locally.",
    type: "website",
    url: "https://sgunigpa.com",
    siteName: "SGUniGPA",
    locale: "en_SG",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SGUniGPA - GPA Calculator for Singapore Universities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SGUniGPA - Free GPA Calculator for NUS, NTU & SMU",
    description:
      "Calculate your Singapore university GPA instantly. Supports NUS CAP with S/U, NTU, and SMU grading systems.",
    images: ["/og-image.png"],
    creator: "@hanshengdev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF9F6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="google-site-verification" content="your-verification-code-here" />
      </head>
      <body className={`${spaceMono.variable} ${instrumentSerif.variable} font-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}
