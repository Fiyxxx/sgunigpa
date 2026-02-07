import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SGUniGPA — GPA Calculator for NUS, NTU & SMU Students",
  description:
    "Free GPA calculator for Singapore university students. Supports NUS CAP (with S/U), NTU, and SMU grading systems. Calculate your GPA instantly in your browser.",
  keywords: [
    "GPA calculator",
    "NUS CAP calculator",
    "NTU GPA calculator",
    "SMU GPA calculator",
    "Singapore university",
    "S/U calculator",
    "grade calculator",
  ],
  authors: [{ name: "SGUniGPA" }],
  openGraph: {
    title: "SGUniGPA — GPA Calculator for Singapore Universities",
    description:
      "Calculate your GPA for NUS, NTU, or SMU. Supports S/U options, accurate grading scales, and saves your data locally.",
    type: "website",
    url: "https://sgunigpa.com",
    siteName: "SGUniGPA",
  },
  twitter: {
    card: "summary_large_image",
    title: "SGUniGPA — GPA Calculator for Singapore Universities",
    description:
      "Calculate your GPA for NUS, NTU, or SMU. Supports S/U options, accurate grading scales, and saves your data locally.",
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
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
