import { MetadataRoute } from 'next'
import { getTenantConfig } from '@/lib/tenant'

export default function robots(): MetadataRoute.Robots {
  const tenant = getTenantConfig();
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/account/', '/checkout/'],
    },
    sitemap: `https://${tenant.domain}/sitemap.xml`,
  }
}
