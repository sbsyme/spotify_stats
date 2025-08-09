import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const accessToken = req.cookies.get('spotify_access_token')?.value;
    if (!accessToken) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch user info' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
}
