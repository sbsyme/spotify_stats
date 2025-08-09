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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 dark:from-gray-950 dark:via-gray-900 dark:to-green-950`}>
        <NavBar />
        {children}
        <footer className="w-full py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-green-200 dark:border-green-900 bg-white/70 dark:bg-black/30 mt-12">
          <span>
            Built by <a href="https://scottsyme.com" target="_blank" rel="noopener noreferrer" className="text-green-700 dark:text-green-400 hover:underline font-semibold">Scott Syme</a>
            {" | "}
            <a href="https://github.com/scottsyme" target="_blank" rel="noopener noreferrer" className="text-green-700 dark:text-green-400 hover:underline font-semibold">GitHub</a>
          </span>
        </footer>
      </body>
    </html>
  );
}
