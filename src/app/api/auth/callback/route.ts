import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI!;

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    if (!code) {
        return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
    });

    const data = await response.json();
    if (!response.ok) {
        return NextResponse.json({ error: data.error || 'Token exchange failed' }, { status: 400 });
    }

    // Set tokens in secure, HTTP-only cookies
    const responseRedirect = NextResponse.redirect('http://127.0.0.1:3000/');
    responseRedirect.cookies.set('spotify_access_token', data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: data.expires_in,
        path: '/',
        sameSite: 'lax',
    });
    responseRedirect.cookies.set('spotify_refresh_token', data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    });
    return responseRedirect;
}
