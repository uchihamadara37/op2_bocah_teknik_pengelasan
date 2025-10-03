'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { X } from 'lucide-react'; // Ikon untuk tombol close
import { CarouselItem } from './ui/carousel';
import { Button } from './ui/button';
import { FaYoutube } from 'react-icons/fa';

// Daftar video YouTube [id, judul]
const youtubeVideos = [
    "dQw4w9WgXcQ", // Ganti dengan ID video Anda
    "3JZ_D3ELwOQ", // Ganti dengan ID video Anda
    "L_LUpnjgPso", // Ganti dengan ID video Anda
    "8-tH6p-2-oI", // Ganti dengan ID video Anda
    "u_Fz1z11kAw", // Ganti dengan ID video Anda
];

export function YoutubeCarousel() {
    // State untuk menyimpan ID video yang sedang aktif di popup
    const [selectedVideo, setSelectedVideo] = useState<string | null>("");
    // const [videoTitles, setVideoTitles] = useState<string[]>([]);
    const [videos, setVideos] = useState<{ id: string; title: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLatestVideos = async () => {
            try {
                const channelId = "UC01xU9Mdk3MSK5UsKhhSU3Q";
                if (!channelId) {
                    throw new Error("YouTube Channel ID is not configured.");
                }

                const maxVideos = 9; // Ambil 6 video terbaru
                const response = await fetch(`/api/youtubeList?channelId=${channelId}&maxResults=${maxVideos}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Gagal mengambil video dari RSS');
                }

                setVideos(data.videos || []);
                console.log("Video yang berhasil diambil:", data.videos);
            } catch (err: unknown) {
                console.error("Gagal mengambil video terbaru:", err);
                setError(err instanceof Error ? err.message : "Gagal memuat video YouTube.");
                setVideos([]); // Pastikan array kosong jika error
            } finally {
                setIsLoading(false);
            }
        };
        fetchLatestVideos();
    }, []);

    // useEffect(() => {
    //     const fetchVideoTitles = async () => {
    //         try {
    //             // Promise.all akan mengembalikan array berisi semua hasil fetch
    //             const titles = await Promise.all(
    //                 youtubeVideos.map(async (videoId) => {
    //                     try {
    //                         // Panggil API route Anda sendiri, bukan YouTube langsung
    //                         const response = await fetch(`/api/youtubeTitle?videoId=${videoId}`);

    //                         if (!response.ok) {
    //                             console.error(`Gagal mengambil judul untuk video ${videoId}`);
    //                             return 'Judul Tidak Tersedia'; // Nilai default jika gagal
    //                         }

    //                         const data = await response.json();
    //                         return data.title || 'Judul Tidak Tersedia';
    //                     } catch (error) {
    //                         console.error(`Error saat fetch video ${videoId}:`, error);
    //                         return 'Judul Tidak Tersedia';
    //                     }
    //                 })
    //             );

    //             console.log("Judul yang berhasil diambil:", titles);
    //             setVideoTitles(titles);
    //             // Di sini Anda bisa set state dengan array 'titles' yang sudah jadi
    //             // setVideoTitles(titles); 

    //         } catch (error) {
    //             console.error("Gagal menjalankan semua fetch:", error);
    //         }
    //     };

    //     fetchVideoTitles();
    // }, []);

    // Fungsi untuk membuka popup
    const openVideoPopup = (videoId: string) => {
        setSelectedVideo(videoId);
    };

    // Fungsi untuk menutup popup
    const closeVideoPopup = () => {
        setSelectedVideo(null);
    };

    return (
        <section className="container mx-auto pt-16 pb-6 px-4">
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Galeri Video Pengerjaan</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Berikut adalah beberapa feed video short dari <span className='text-blue-500 font-semibold'>pengerjaan terbaru</span> kami. Klik pada gambar untuk memutar video.
                </p>
            </div>

            {/* Galeri Video menggunakan Flexbox */}
            <div className="flex flex-wrap justify-center gap-0">
                {videos.map((video, index) => (
                    <div key={index} onClick={() => openVideoPopup(video.id)} className="basis-1/3 sm:basis-1/3 md:basis-1/3 cursor-pointer group">
                        <div className="p-1">
                            <div className="p-0 overflow-hidden rounded-lg">
                                {/* Kontainer untuk menjaga rasio aspek 16:9 */}
                                <div className="relative aspect-video w-full">
                                    <div className="absolute top-1 left-1 right-1 md:top-2 md:left-3 md:right-3 drop-shadow-2xl text-white text-[9px] sm:text-xs md:text-sm lg:text-base font-semibold z-3">
                                        {video.title || 'Memuat...'}
                                    </div>
                                    <div className="absolute inset-0 bg-black/20 z-2 transition-opacity duration-300 group-hover:bg-opacity-20"></div>
                                    <img
                                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                                        alt={`Thumbnail YouTube video ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Ikon Play Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center z-4 transition-opacity duration-300">
                                        <div className="mx-auto my-auto bg-red-500 hover:bg-red-400 rounded-lg px-2 py-1 cursor-pointer">
                                            <svg className="relative z-3 h-5 w-5 md:h-8 md:w-8 text-white group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                <Button variant={'outline'} size={'sm'} asChild
                    className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white group"
                >
                    <a
                        href="https://www.youtube.com/@imamnura7044"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaYoutube className="h-6 w-6 text-red-600 group-hover:text-white" />
                        Lihat Semua Video di Channel YouTube Kami
                    </a>
                </Button>
            </div>

            {/* --- Popup / Modal untuk Video --- */}
            {selectedVideo && (
                <div
                    onClick={closeVideoPopup}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                    <div
                        onClick={(e) => e.stopPropagation()} // Mencegah popup tertutup saat video di-klik
                        className="relative w-full max-w-3xl aspect-video mx-4"
                    >
                        {/* Tombol Close */}
                        <button
                            onClick={closeVideoPopup}
                            className="absolute -top-10 -right-2 text-white hover:text-lime-400 transition-colors"
                            aria-label="Close video player"
                        >
                            <X className="h-8 w-8" />
                        </button>
                        {/* Embed Video YouTube */}
                        <iframe
                            className="w-full h-full rounded-lg shadow-2xl"
                            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </section>
    );
}

