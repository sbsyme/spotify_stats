
import Image from "next/image";
import { cookies } from "next/headers";

async function getSpotifyUser() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("spotify_access_token")?.value;
  if (!accessToken) return null;
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/spotify/me`, {
    headers: { Cookie: `spotify_access_token=${accessToken}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}


export default async function Home() {
  const user = await getSpotifyUser();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-900 transition-colors duration-500">
      <header className="w-full flex flex-col items-center gap-2 mt-2 mb-0">
        <div className="flex flex-col items-center gap-2 animate-fade-in">
          <span className="inline-flex items-center justify-center rounded-full bg-slate-800 dark:bg-slate-900 shadow-lg p-4">
            {/* Neutral bar chart/stats icon SVG with new color scheme */}
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="32" width="8" height="24" rx="2" fill="#818cf8" />
              <rect x="24" y="20" width="8" height="36" rx="2" fill="#38bdf8" />
              <rect x="40" y="12" width="8" height="44" rx="2" fill="#a78bfa" />
              <rect x="56" y="44" width="8" height="12" rx="2" fill="#f472b6" />
            </svg>
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-indigo-200 dark:text-indigo-200 text-center drop-shadow-lg tracking-tight">
            Spotify <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-purple-500 bg-clip-text text-transparent">Stats</span>
          </h1>
        </div>
        <p className="text-xl sm:text-2xl font-semibold text-indigo-100 dark:text-indigo-300 text-center max-w-2xl animate-fade-in delay-100">
          Discover your <span className="font-extrabold text-sky-300 dark:text-sky-400">Spotify</span> listening habits!<br />
          <span className="text-lg text-purple-200 dark:text-purple-300 font-medium">Log in to view your top tracks, artists, and more—beautifully visualized and always up to date.</span><br />
          <span className="text-base text-indigo-300 dark:text-indigo-400 font-normal">Built with Next.js, Tailwind CSS, and the Spotify API.</span>
        </p>
      </header>
      {/* No empty main card, minimal outer padding, and header margin reduced */}
    </div>
  );
}
