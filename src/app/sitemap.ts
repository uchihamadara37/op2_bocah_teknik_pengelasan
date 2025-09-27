// app/sitemap.ts
import { MetadataRoute } from 'next'
import servicesData from './dataStatic/servicesData'
// import { url } from 'inspector'

export default function sitemap(): MetadataRoute.Sitemap {
  const servicesPageUrls = servicesData.map(service => ({
    url: `https://bocahteknik.my.id/layanan/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://bocahteknik.my.id/', // Ganti dengan URL utama Anda
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...servicesPageUrls,
    
  ]
}