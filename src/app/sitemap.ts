// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.bocahteknik.my.id/', // Ganti dengan URL utama Anda
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    // Tambahkan URL lain jika ada, misalnya halaman blog atau layanan
    // {
    //   url: 'https://nama-domain-anda.com/about',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
}