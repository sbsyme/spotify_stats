"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface SpotifyUser {
    display_name: string;
    email: string;
    images?: { url: string }[];
    external_urls?: { spotify: string };
}

export default function UserNav() {
    const [user, setUser] = useState<SpotifyUser | null>(null);
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("/api/spotify/me");
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch { }
        }
        fetchUser();
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClick);
        } else {
            document.removeEventListener("mousedown", handleClick);
        }
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    if (!user) return null;

    return (
        <div className="relative" ref={menuRef}>
            <button
                className="flex items-center gap-2 bg-white/80 dark:bg-black/40 rounded-full px-3 py-1 shadow border border-green-100 dark:border-green-900 hover:scale-105 transition-transform focus:outline-none"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={open}
            >
                <Image
                    src={user.images?.[0]?.url || "/next.svg"}
                    alt={user.display_name}
                    width={32}
                    height={32}
                    className="rounded-full border"
                />
                <span className="font-semibold text-green-700 dark:text-green-400 text-sm">
                    {user.display_name}
                </span>
                <svg className={`w-4 h-4 ml-1 transition-transform ${open ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-green-100 dark:border-green-900 z-50 animate-fade-in">
                    <a
                        href={user.external_urls?.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-950 rounded-t-lg"
                    >
                        View Profile
                    </a>
                    <button
                        onClick={() => { window.location.href = "/api/auth/logout"; }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-b-lg"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
