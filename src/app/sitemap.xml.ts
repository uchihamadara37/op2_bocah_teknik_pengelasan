import { ServiceFirestore } from '@/lib/firebaseBackend/firebaseAdmin'
import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://www.bocahteknik.my.id'

  const servicesRes = await fetch(`${baseUrl}/api/services`, { cache: 'no-store' })
  const servicesJson = await servicesRes.json()
  const servicesData = servicesJson.data as ServiceFirestore[] || []

  const urls = [
    `
    <url>
      <loc>${baseUrl}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
    </url>
    `
  ]
  

  servicesData.forEach(service => {
    urls.push(`
      <url>
        <loc>${baseUrl}/layanan/${service.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
    `)
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join('\n')}
  </urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
