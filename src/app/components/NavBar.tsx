"use client";

import Link from "next/link";
import UserNav from "./UserNav";
import LoginButton from "./LoginButton";
import { useEffect, useState } from "react";


interface SpotifyUser {
    display_name: string;
    email: string;
    images?: { url: string }[];
    external_urls?: { spotify: string };
}

export default function NavBar() {
    const [user, setUser] = useState<SpotifyUser | null>(null);
    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("/api/spotify/me");
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            }
        }
        fetchUser();
    }, []);

    return (
        <nav className="w-full flex items-center justify-between gap-8 py-4 px-6 bg-gradient-to-r from-indigo-400 via-sky-400 to-purple-500 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 shadow-xl backdrop-blur border-b-2 border-indigo-300 dark:border-indigo-800 transition-all duration-300">
            <div className="flex items-center gap-8">
                {/* App logo/name with animation */}
                <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl text-white dark:text-indigo-200 tracking-tight hover:scale-110 hover:drop-shadow-lg transition-transform duration-200">
                    <svg className="w-8 h-8 animate-spin-slow text-white drop-shadow-lg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="navlogo-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#818cf8" />
                                <stop offset="1" stopColor="#a5b4fc" />
                            </linearGradient>
                        </defs>
                        <circle cx="16" cy="16" r="16" fill="url(#navlogo-gradient)" />
                        <rect x="10" y="10" width="4" height="12" rx="2" fill="#fff" />
                        <rect x="18" y="6" width="4" height="16" rx="2" fill="#fff" />
                    </svg>
                    <span className="bg-gradient-to-r from-indigo-100 via-white to-purple-100 bg-clip-text text-transparent drop-shadow">Spotify Stats</span>
                </Link>
                {/* Only show nav links if logged in */}
                {user && (
                    <>
                        <Link href="/" className="font-bold text-lg text-white dark:text-indigo-200 tracking-tight px-3 py-1 rounded hover:bg-white/20 dark:hover:bg-indigo-900/40 hover:scale-110 transition-all duration-150">Home</Link>
                        <Link href="/dashboard" className="font-bold text-lg text-white dark:text-indigo-200 tracking-tight px-3 py-1 rounded hover:bg-white/20 dark:hover:bg-indigo-900/40 hover:scale-110 transition-all duration-150">Dashboard</Link>
                    </>
                )}
            </div>
            <div className="flex items-center min-w-[120px] justify-end w-full sm:w-auto">
                {/* Show user nav if logged in, else show login button */}
                {user ? <UserNav /> : <LoginButton />}
            </div>
            <style jsx>{`
                @keyframes spin-slow {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                  animation: spin-slow 6s linear infinite;
                }
            `}</style>
        </nav>
    );
}
