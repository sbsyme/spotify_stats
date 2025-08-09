import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const accessToken = req.cookies.get('spotify_access_token')?.value;
    if (!accessToken) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') || '10';
    const time_range = searchParams.get('time_range') || 'medium_term';

    const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${time_range}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch top tracks' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
}
