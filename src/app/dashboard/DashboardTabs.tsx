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

export default function DashboardTabs() {
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
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 md:px-8 py-8">
            <div className="flex gap-4 mb-8 items-center">
                <button
                    className={`px-5 py-2 rounded-t-lg font-bold shadow transition-all border-b-4 ${tab === "tracks" ? "bg-gradient-to-r from-indigo-400 via-sky-400 to-purple-500 text-white border-indigo-600" : "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:from-slate-800 dark:via-indigo-900 dark:to-purple-900 text-indigo-700 dark:text-indigo-200 border-transparent"}`}
                    onClick={() => setTab("tracks")}
                >
                    🎵 Top Tracks
                </button>
                <button
                    className={`px-5 py-2 rounded-t-lg font-bold shadow transition-all border-b-4 ${tab === "artists" ? "bg-gradient-to-r from-indigo-400 via-sky-400 to-purple-500 text-white border-indigo-600" : "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:from-slate-800 dark:via-indigo-900 dark:to-purple-900 text-indigo-700 dark:text-indigo-200 border-transparent"}`}
                    onClick={() => setTab("artists")}
                >
                    🧑‍🎤 Top Artists
                </button>
                {tab === "tracks" && tracks.length > 0 && (
                    <button
                        className="ml-4 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
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
                        className="ml-2 px-3 py-2 rounded-lg bg-indigo-100 text-indigo-800 font-semibold border border-indigo-300 hover:bg-indigo-200 transition-colors"
                    >
                        View Playlist
                    </a>
                )}
            </div>
            <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center bg-gradient-to-r from-indigo-50 via-sky-50 to-purple-100 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 p-4 rounded-xl shadow-inner">
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
                <div className="flex justify-center items-center py-12">
                    <span className="inline-block w-10 h-10 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin" aria-label="Loading" />
                </div>
            ) : tab === "tracks" ? (
                <ol className="space-y-3 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-900 p-6 rounded-xl shadow-lg mt-8 mb-8">
                    {tracks.length ? tracks.map((track, idx) => (
                        <li key={track.id} className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-indigo-800 via-slate-900 to-purple-900 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-900 hover:scale-[1.02] hover:shadow-md transition-all border border-indigo-700 dark:border-indigo-900">
                            <span className="text-2xl font-extrabold text-indigo-300 w-8 text-center drop-shadow">{idx + 1}</span>
                            <Image src={track.album.images[2]?.url || "/next.svg"} alt={track.name} width={56} height={56} className="rounded shadow-md border-2 border-indigo-400 dark:border-indigo-700" />
                            <div className="flex-1">
                                <div className="font-bold text-lg text-indigo-100 dark:text-indigo-200">{track.name}</div>
                                <div className="text-sm text-indigo-300 dark:text-indigo-400">{track.artists.map((a) => a.name).join(", ")}</div>
                            </div>
                            <div className="text-xs text-indigo-400 font-mono">{track.album.name}</div>
                        </li>
                    )) : <li className="text-center text-indigo-400">No data</li>}
                </ol>
            ) : (
                <ol className="space-y-3 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-900 p-6 rounded-xl shadow-lg mt-8 mb-8">
                    {artists.length ? artists.map((artist, idx) => (
                        <li key={artist.id} className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-indigo-800 via-slate-900 to-purple-900 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-900 hover:scale-[1.02] hover:shadow-md transition-all border border-indigo-700 dark:border-indigo-900">
                            <span className="text-2xl font-extrabold text-indigo-300 w-8 text-center drop-shadow">{idx + 1}</span>
                            <Image src={artist.images[2]?.url || "/next.svg"} alt={artist.name} width={56} height={56} className="rounded-full shadow-md border-2 border-indigo-400 dark:border-indigo-700" />
                            <div className="flex-1">
                                <div className="font-bold text-lg text-indigo-100 dark:text-indigo-200">{artist.name}</div>
                                <div className="text-sm text-indigo-300 dark:text-indigo-400">{artist.genres?.slice(0, 2).join(", ")}</div>
                            </div>
                        </li>
                    )) : <li className="text-center text-indigo-400">No data</li>}
                </ol>
            )}
        </div>
    );
}
