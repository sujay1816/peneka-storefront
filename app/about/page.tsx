import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import AboutClient from './AboutClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://peneka-storefront.vercel.app'

export async function generateMetadata(): Promise<Metadata> {
  const supabase = createClient()
  const { data } = await supabase.from('site_config').select('key, value')
    .in('key', ['brand_name'])
  const cfg: Record<string, string> = {}
  data?.forEach((r: any) => { cfg[r.key] = r.value })
  const brandName = cfg.brand_name || 'Pinaka'

  return {
    title: 'About Us',
    description: `Learn about our story — celebrating the warriors and legends of the Mahabharata and Ramayana, screen-printed on premium cotton.`,
    alternates: { canonical: `${SITE_URL}/about` },
    openGraph: {
      title: `About Us | ${brandName}`,
      description: `Learn about our story — celebrating the warriors and legends of the Mahabharata and Ramayana, screen-printed on premium cotton.`,
      type: 'website',
      url: `${SITE_URL}/about`,
    },
  }
}

export default async function AboutPage() {
  const supabase = createClient()
  const { data } = await supabase.from('site_config').select('key, value')
    .in('key', ['about_content', 'about_title', 'brand_name', 'logo_url'])
  const cfg: Record<string, string> = {}
  data?.forEach((r: any) => { cfg[r.key] = r.value })
  return <AboutClient cfg={cfg} />
}
