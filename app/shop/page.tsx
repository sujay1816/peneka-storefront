import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import { getSiteConfig, getCategories, getProducts, type ProductFilters } from '@/lib/supabase/config'
import ShopContent from './ShopContent'
import BackToTop from '@/components/layout/BackToTop'
// PERFORMANCE: ISR with 30s revalidate.
// Key insight: shop URL params (category, filter, q) make each URL unique.
// Next.js caches each URL separately, so /shop?category=arjuna is cached
// independently from /shop?category=krishna. All filtering now server-side.
export const revalidate = 60

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://peneka-storefront.vercel.app'

export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
  const config = await getSiteConfig().catch(() => ({} as any))
  const brandName = config.brand_name || process.env.NEXT_PUBLIC_BRAND_NAME || 'Pinaka'
  const category = searchParams?.category
  const filter = searchParams?.filter
  const q = searchParams?.q

  let title = 'Shop All Tees'
  let desc = `Browse our complete collection of mythology-print t-shirts at ${brandName}. Free shipping above ₹999.`

  if (category) {
    const catName = category.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    title = `${catName} — Buy Online`
    desc = `Shop authentic ${catName} tees at ${brandName}. Handpicked collection with free shipping above ₹999. Easy returns.`
  } else if (filter === 'new') {
    title = 'New Arrivals — Latest Mythology Tees'
    desc = `Discover our latest mythology t-shirt collection at ${brandName}. Fresh arrivals updated regularly.`
  } else if (filter === 'bestsellers') {
    title = 'Bestselling Tees — Most Loved'
    desc = `Shop our most loved tees at ${brandName}. Top-rated by thousands of customers.`
  } else if (filter === 'featured') {
    title = 'Featured Collection — Curated Tees'
    desc = `Explore our curated featured t-shirt collection at ${brandName}. Handpicked designs from the Mahabharata and Ramayana.`
  } else if (q) {
    title = `"${q}" — Search Results`
    desc = `Search results for "${q}" at ${brandName}. Find your perfect mythology tee from our collection.`
  }

  return {
    title,
    description: desc,
    keywords: [
      'mythology t-shirts india', 'mahabharata t-shirt', 'ramayana t-shirt',
      'arjuna t-shirt', 'krishna t-shirt', 'graphic tees india',
      brandName, category || 'mythology tee collection',
    ],
    alternates: { canonical: `${SITE_URL}/shop${category ? `?category=${category}` : ''}` },
    openGraph: {
      title: `${title} | ${brandName}`,
      description: desc,
      type: 'website',
      url: `${SITE_URL}/shop`,
      siteName: brandName,
    },
    twitter: {
      card: 'summary',
      title: `${title} | ${brandName}`,
      description: desc,
    },
  }
}

export default async function ShopPage({ searchParams }: { searchParams: any }) {
  const [config, categories, fabricsData] = await Promise.all([
    getSiteConfig().catch(() => ({} as any)),
    getCategories().catch(() => []),
    // Load fabric types
    (async () => {
      try {
        const { createClient } = await import('@/lib/supabase/server')
        const sb = createClient()
        const { data } = await sb.from('site_config').select('value').eq('key', 'fabric_types').maybeSingle()
        if (data?.value) return JSON.parse(data.value) as string[]
      } catch {}
      return ['Silk','Cotton','Georgette','Chiffon','Linen','Organza','Net','Crepe','Tussar','Chanderi']
    })(),
  ])

  // SCALABILITY: All filtering now server-side in Postgres.
  // With many products, only PAGE_SIZE products are fetched per request.
  // URL params drive the filter — each unique URL is cached by ISR independently.
  const PAGE_SIZE = 16
  const currentPage = Math.max(1, parseInt(searchParams?.page || '1', 10))

  const filters: ProductFilters = {
    category:    searchParams?.category,
    featured:    searchParams?.filter === 'featured',
    bestseller:  searchParams?.filter === 'bestsellers',
    newArrivals: searchParams?.filter === 'new',
    search:      searchParams?.q,
    // Server-side filters from URL params
    fabrics:    searchParams?.fabrics ? String(searchParams.fabrics).split(',') : undefined,
    occasions:  searchParams?.occasions ? String(searchParams.occasions).split(',') : undefined,
    priceMin:   searchParams?.priceMin ? Number(searchParams.priceMin) : undefined,
    priceMax:   searchParams?.priceMax ? Number(searchParams.priceMax) : undefined,
    sortBy:     (searchParams?.sort as ProductFilters['sortBy']) || 'newest',
    limit:      PAGE_SIZE,
    offset:     (currentPage - 1) * PAGE_SIZE,
  }

  const { products, total: totalProducts } = await getProducts(filters).catch(() => ({ products: [], total: 0 }))
  // PERFORMANCE: user loaded client-side in Navbar
  const user = null

  // BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop` },
    ],
  }

  // ItemList schema — enables Google product carousels
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tee Collection',
    url: `${SITE_URL}/shop`,
    numberOfItems: totalProducts,
    itemListElement: products.slice(0, 10).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/product/${p.slug}`,
      name: p.name,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Navbar categories={categories} config={config} user={user} />
      <ShopContent
        products={products}
        categories={categories}
        config={config}
        userId={user?.id}
        initialCategory={searchParams?.category}
        initialSearch={searchParams?.q}
        fabrics={fabricsData}
        totalProducts={totalProducts}
        currentPage={currentPage}
        pageSize={16}
        initialFilters={{
          fabrics: filters.fabrics || [],
          occasions: filters.occasions || [],
          priceMin: String(filters.priceMin || ''),
          priceMax: String(filters.priceMax || ''),
          onlyNew: filters.newArrivals || false,
          sortBy: filters.sortBy || 'newest',
        }}
      />
      <Footer config={config} categories={categories} />
      <WhatsAppButton number={config.whatsapp_number || ''} />
      <BackToTop />
    </>
  )
}
