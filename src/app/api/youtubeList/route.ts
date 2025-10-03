import { NextRequest, NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser'; // Anda perlu menginstal ini

// Definisikan tipe untuk video yang akan dikembalikan
interface YouTubeVideo {
  id: string;
  title: string;
  // Anda bisa menambahkan properti lain seperti thumbnail jika diperlukan
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const channelId = searchParams.get('channelId');
    const maxResults = parseInt(searchParams.get('maxResults') || '6', 10);

    if (!channelId) {
      return NextResponse.json({ error: 'Parameter "channelId" wajib diisi' }, { status: 400 });
    }

    // URL RSS feed untuk channel YouTube
    const rssFeedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    // 1. Mengambil data XML dari RSS feed YouTube
    const response = await fetch(rssFeedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', // Menyamar sebagai bot yang sopan
        'Accept': 'application/xml',
      },
      // Cache response untuk durasi tertentu di Vercel (misal, 1 jam)
      // Ini membantu menghindari terlalu sering fetch ke YouTube jika banyak user
      next: { revalidate: 3600 }, 
    });

    if (!response.ok) {
      console.error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
      return NextResponse.json({ error: 'Gagal mengambil data feed YouTube' }, { status: 500 });
    }

    const xmlText = await response.text();

    // 2. Mem-parsing XML
    // const parser = new XMLParser({
    //   ignoreAttributes: false, // Penting agar atribut seperti 'url' bisa diambil
    //   attributeValueProcessor: (attrName, attrValue, jPath) => attrValue, // Gunakan fungsi sesuai signature yang benar
    //   tagValueProcessor: (tagName, tagValue) => tagName === 'media_description' ? tagValue.trim() : tagValue,
    // //   cdataProp: true, // Untuk menangani CDATA di XML
    //   trimValues: true,
    //   textNodeName: "_text", // Memberi nama khusus untuk text node
    // });
    const parser = new XMLParser({
      ignoreAttributes: true, // Kita tidak butuh atribut untuk kasus ini
      trimValues: true,
    });
    const parsedXml = parser.parse(xmlText);

    if (!parsedXml || !parsedXml.feed || !parsedXml.feed.entry) {
      return NextResponse.json({ error: 'Struktur feed XML tidak ditemukan atau kosong' }, { status: 500 });
    }

    // 3. Mengekstrak ID dan Judul video
    const videos: YouTubeVideo[] = parsedXml.feed.entry
      .slice(0, maxResults) // Ambil hanya sejumlah video yang diminta
      .map((entry: unknown) => {
        const e = entry as { id: string; title: string };
        const videoIdFromEntry = e.id.split(':').pop(); // Cth: "yt:video:abcde" -> "abcde"

        return {
          id: videoIdFromEntry || '', // Pastikan ada nilai default
          title: e.title || 'Judul Tidak Tersedia',
        };
      });

    return NextResponse.json({ videos });

  } catch (error) {
    console.error('API /youtube-rss Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}