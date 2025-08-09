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
        <nav className="w-full flex items-center justify-between gap-8 py-4 px-6 bg-white/80 dark:bg-black/40 shadow-lg mb-12 backdrop-blur border-b border-green-200 dark:border-green-900">
            <div className="flex items-center gap-8">
                {/* App logo/name */}
                <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl text-green-700 dark:text-green-400 tracking-tight hover:scale-105 transition-transform">
                    <svg className="w-7 h-7 text-green-500" viewBox="0 0 32 32" fill="currentColor"><circle cx="16" cy="16" r="16" /></svg>
                    <span>Spotify Stats</span>
                </Link>
                {/* Only show nav links if logged in */}
                {user && (
                    <>
                        <Link href="/" className="font-bold text-lg text-green-600 dark:text-green-400 tracking-tight hover:scale-105 transition-transform">Home</Link>
                        <Link href="/dashboard" className="font-bold text-lg text-green-600 dark:text-green-400 tracking-tight hover:scale-105 transition-transform">Dashboard</Link>
                    </>
                )}
            </div>
            <div className="hidden sm:flex items-center min-w-[120px] justify-end">
                {/* Show user nav if logged in, else show login button */}
                {user ? <UserNav /> : <LoginButton />}
            </div>
        </nav>
    );
}
