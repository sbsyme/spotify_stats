import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
// import dynamic from "next/dynamic";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spotify Stats Dashboard",
  description: "View your Spotify listening statistics, top tracks, and artists.",
};


import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-900`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
