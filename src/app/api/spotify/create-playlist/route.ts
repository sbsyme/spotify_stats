import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const accessToken = req.cookies.get("spotify_access_token")?.value;
        if (!accessToken) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const { name, trackUris, description } = await req.json();
        if (!name || !Array.isArray(trackUris) || trackUris.length === 0) {
            return NextResponse.json({ error: "Missing playlist name or tracks" }, { status: 400 });
        }

        // Get user ID
        const userRes = await fetch("https://api.spotify.com/v1/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!userRes.ok) {
            const err = await userRes.text();
            console.error("Failed to fetch user info:", err);
            return NextResponse.json({ error: "Failed to fetch user info" }, { status: 500 });
        }
        const user = await userRes.json();

        // Create playlist
        const playlistRes = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                description: description || "Created with Spotify Stats",
                public: false,
            }),
        });
        if (!playlistRes.ok) {
            const err = await playlistRes.text();
            console.error("Failed to create playlist:", err);
            return NextResponse.json({ error: "Failed to create playlist" }, { status: 500 });
        }
        const playlist = await playlistRes.json();

        // Add tracks
        const addTracksRes = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uris: trackUris }),
        });
        if (!addTracksRes.ok) {
            const err = await addTracksRes.text();
            console.error("Failed to add tracks:", err);
            return NextResponse.json({ error: "Failed to add tracks" }, { status: 500 });
        }

        return NextResponse.json({ playlistUrl: playlist.external_urls.spotify });
    } catch (err) {
        console.error("Unexpected error in create-playlist:", err);
        return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
    }
}
