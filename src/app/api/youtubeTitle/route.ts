import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get('videoId');

    if (!videoId) {
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
    }

    // Panggil oEmbed API dari backend
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch video data from YouTube' }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({ title: data.title });

  } catch (error) {
    console.error('API /youtube-title Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}