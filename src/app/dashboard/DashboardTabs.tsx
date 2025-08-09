"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Artist = {
    id: string;
    name: string;
    genres?: string[];
    images: { url: string }[];
};

type Track = {
    id: string;
    name: string;
    uri: string;
    artists: { name: string }[];
    album: {
        name: string;
        images: { url: string }[];
    };
};

const TIME_RANGES = [
    { value: "short_term", label: "Last 4 Weeks" },
    { value: "medium_term", label: "Last 6 Months" },
    { value: "long_term", label: "All Time" },
];

const [mounted, setMounted] = useState(false);
const [tab, setTab] = useState<"tracks" | "artists">("tracks");
const [timeRange, setTimeRange] = useState("medium_term");
const [limit, setLimit] = useState(10);
const [tracks, setTracks] = useState<Track[]>([]);
const [artists, setArtists] = useState<Artist[]>([]);
const [loading, setLoading] = useState(false);
const [creatingPlaylist, setCreatingPlaylist] = useState(false);
const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);

useEffect(() => {
    setMounted(true);
}, []);

useEffect(() => {
    if (!mounted) return;
    setLoading(true);
    const fetchData = async () => {
        if (tab === "tracks") {
            const res = await fetch(`/api/spotify/top-tracks?time_range=${timeRange}&limit=${limit}`);
            const data = await res.json();
            setTracks(data.items || []);
        } else {
            const res = await fetch(`/api/spotify/top-artists?time_range=${timeRange}&limit=${limit}`);
            const data = await res.json();
            setArtists(data.items || []);
        }
        setLoading(false);
    };
    fetchData();
}, [tab, timeRange, limit, mounted]);

if (!mounted) return null;

const handleCreatePlaylist = async () => {
    if (!tracks.length) return;
    setCreatingPlaylist(true);
    setPlaylistUrl(null);
    const res = await fetch("/api/spotify/create-playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: `Top Tracks (${timeRange.replace("_", " ")})`,
            trackUris: tracks.map(t => t.uri),
            description: `Your top Spotify tracks (${TIME_RANGES.find(r => r.value === timeRange)?.label}) from Spotify Stats`,
        }),
    });
    const data = await res.json();
    if (res.ok && data.playlistUrl) {
        setPlaylistUrl(data.playlistUrl);
    }
    setCreatingPlaylist(false);
};

return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 md:px-8">
        <div className="flex gap-4 mb-6 items-center">
            <button
                className={`px-5 py-2 rounded-t-lg font-bold shadow transition-all border-b-4 ${tab === "tracks" ? "bg-gradient-to-r from-green-400 via-green-500 to-lime-400 text-white border-green-600" : "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 text-green-700 dark:text-green-200 border-transparent"}`}
                onClick={() => setTab("tracks")}
            >
                🎵 Top Tracks
            </button>
            <button
                className={`px-5 py-2 rounded-t-lg font-bold shadow transition-all border-b-4 ${tab === "artists" ? "bg-gradient-to-r from-green-400 via-green-500 to-lime-400 text-white border-green-600" : "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 text-green-700 dark:text-green-200 border-transparent"}`}
                onClick={() => setTab("artists")}
            >
                🧑‍🎤 Top Artists
            </button>
            {tab === "tracks" && tracks.length > 0 && (
                <button
                    className="ml-4 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={handleCreatePlaylist}
                    disabled={creatingPlaylist}
                >
                    {creatingPlaylist ? "Creating..." : "Create Playlist"}
                </button>
            )}
            {playlistUrl && (
                <a
                    href={playlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 px-3 py-2 rounded-lg bg-green-100 text-green-800 font-semibold border border-green-300 hover:bg-green-200 transition-colors"
                >
                    View Playlist
                </a>
            )}
        </div>
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center bg-gradient-to-r from-green-50 via-lime-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 p-4 rounded-xl shadow-inner">
            <div>
                <label htmlFor="time_range" className="mr-2 font-semibold text-green-700 dark:text-green-300">Time Range:</label>
                <select
                    id="time_range"
                    value={timeRange}
                    onChange={e => setTimeRange(e.target.value)}
                    className="border-2 border-green-300 dark:border-green-700 rounded px-2 py-1 bg-white dark:bg-gray-900 text-green-800 dark:text-green-200 font-semibold shadow-sm focus:ring-2 focus:ring-green-400"
                >
                    {TIME_RANGES.map(r => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="limit" className="mr-2 font-semibold text-green-700 dark:text-green-300">Limit:</label>
                <input
                    id="limit"
                    type="number"
                    min={1}
                    max={50}
                    value={limit}
                    onChange={e => setLimit(Number(e.target.value))}
                    className="border-2 border-green-300 dark:border-green-700 rounded px-2 py-1 w-20 bg-white dark:bg-gray-900 text-green-800 dark:text-green-200 font-semibold shadow-sm focus:ring-2 focus:ring-green-400"
                />
            </div>
        </div>
        {loading ? (
            <div className="flex justify-center items-center py-8">
                <span className="inline-block w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin" aria-label="Loading" />
            </div>
        ) : tab === "tracks" ? (
            <ol className="space-y-3 bg-gradient-to-br from-green-100 via-lime-50 to-green-200 dark:from-gray-900 dark:via-green-900 dark:to-gray-900 p-4 rounded-xl shadow-lg">
                {tracks.length ? tracks.map((track, idx) => (
                    <li key={track.id} className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-white via-green-50 to-lime-100 dark:from-gray-800 dark:via-green-950 dark:to-gray-900 hover:scale-[1.02] hover:shadow-md transition-all border border-green-100 dark:border-green-800">
                        <span className="text-2xl font-extrabold text-green-600 w-8 text-center drop-shadow">{idx + 1}</span>
                        <Image src={track.album.images[2]?.url || "/next.svg"} alt={track.name} width={56} height={56} className="rounded shadow-md border-2 border-green-200 dark:border-green-700" />
                        <div className="flex-1">
                            <div className="font-bold text-lg text-green-900 dark:text-green-200">{track.name}</div>
                            <div className="text-sm text-green-700 dark:text-green-300">{track.artists.map((a) => a.name).join(", ")}</div>
                        </div>
                        <div className="text-xs text-green-500 font-mono">{track.album.name}</div>
                    </li>
                )) : <li className="text-center text-green-400">No data</li>}
            </ol>
        ) : (
            <ol className="space-y-3 bg-gradient-to-br from-green-100 via-lime-50 to-green-200 dark:from-gray-900 dark:via-green-900 dark:to-gray-900 p-4 rounded-xl shadow-lg">
                {artists.length ? artists.map((artist, idx) => (
                    <li key={artist.id} className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-white via-green-50 to-lime-100 dark:from-gray-800 dark:via-green-950 dark:to-gray-900 hover:scale-[1.02] hover:shadow-md transition-all border border-green-100 dark:border-green-800">
                        <span className="text-2xl font-extrabold text-green-600 w-8 text-center drop-shadow">{idx + 1}</span>
                        <Image src={artist.images[2]?.url || "/next.svg"} alt={artist.name} width={56} height={56} className="rounded-full shadow-md border-2 border-green-200 dark:border-green-700" />
                        <div className="flex-1">
                            <div className="font-bold text-lg text-green-900 dark:text-green-200">{artist.name}</div>
                            <div className="text-sm text-green-700 dark:text-green-300">{artist.genres?.slice(0, 2).join(", ")}</div>
                        </div>
                    </li>
                )) : <li className="text-center text-green-400">No data</li>}
            </ol>
        )}
    </div>
);
}
