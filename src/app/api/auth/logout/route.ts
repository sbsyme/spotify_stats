import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    // Clear the Spotify auth cookies
    const response = NextResponse.redirect(new URL('/', req.url));
    response.cookies.set('spotify_access_token', '', { path: '/', maxAge: 0 });
    response.cookies.set('spotify_refresh_token', '', { path: '/', maxAge: 0 });
    return response;
}
