
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
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-green-100 via-lime-100 to-green-300 dark:from-gray-900 dark:via-green-950 dark:to-black transition-colors duration-500">
      <header className="w-full flex flex-col items-center gap-2 mt-2 mb-0">
        <div className="flex flex-col items-center gap-2 animate-fade-in">
          <span className="inline-flex items-center justify-center rounded-full bg-white dark:bg-gray-900 shadow-lg p-4">
            {/* Neutral bar chart/stats icon SVG with improved contrast */}
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="32" width="8" height="24" rx="2" fill="#4ade80" />
              <rect x="24" y="20" width="8" height="36" rx="2" fill="#facc15" />
              <rect x="40" y="12" width="8" height="44" rx="2" fill="#38bdf8" />
              <rect x="56" y="44" width="8" height="12" rx="2" fill="#f472b6" />
            </svg>
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-green-700 dark:text-green-400 text-center drop-shadow-lg tracking-tight">
            Spotify <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-700 bg-clip-text text-transparent">Stats</span>
          </h1>
        </div>
        <p className="text-xl sm:text-2xl font-semibold text-green-900 dark:text-green-200 text-center max-w-2xl animate-fade-in delay-100">
          Discover your <span className="font-extrabold text-green-600 dark:text-green-400">Spotify</span> listening habits!<br />
          <span className="text-lg text-green-700 dark:text-green-300 font-medium">Log in to view your top tracks, artists, and more—beautifully visualized and always up to date.</span><br />
          <span className="text-base text-gray-700 dark:text-gray-300 font-normal">Built with Next.js, Tailwind CSS, and the Spotify API.</span>
        </p>
      </header>
      {/* No empty main card, minimal outer padding, and header margin reduced */}
    </div>
  );
}
