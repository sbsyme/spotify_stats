import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI!;
const SCOPES = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-read-recently-played',
    'user-library-read',
    'playlist-modify-private',
    'playlist-modify-public',
].join(' ');

export async function GET(req: NextRequest) {
    const state = Math.random().toString(36).substring(2, 15);
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPES,
        redirect_uri: REDIRECT_URI,
        state,
    });
    const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
    return NextResponse.redirect(url);
}
