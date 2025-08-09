"use client";

export default function LoginButton() {
    return (
        <a
            href="/api/auth/login"
            className="inline-block px-4 py-2 bg-green-500 text-white font-semibold rounded-full shadow hover:bg-green-600 transition-colors"
        >
            Login with Spotify
        </a>
    );
}
