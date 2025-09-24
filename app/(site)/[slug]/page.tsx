import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { getAllItems, getItemBySlug } from '@/lib/data'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function generateStaticParams() {
  const items = await getAllItems()
  return items.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const item = await getItemBySlug(params.slug)
  
  if (!item) {
    return {
      title: 'Page Not Found',
    }
  }

  const canonical = `${siteUrl}/${item.slug}`
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: item.title,
    description: item.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: canonical,
    ...(item.datePublished && { datePublished: item.datePublished }),
    ...(item.dateModified && { dateModified: item.dateModified }),
  }

  return {
    title: item.title,
    description: item.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: item.title,
      description: item.description,
      url: canonical,
      siteName: 'SEO Site Boilerplate',
      locale: 'en_US',
      type: 'website',
    },
    other: {
      'application/ld+json': JSON.stringify(jsonLd),
    },
  }
}

export default async function ItemPage({ params }: { params: { slug: string } }) {
  const item = await getItemBySlug(params.slug)

  if (!item) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: item.title,
    description: item.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${siteUrl}/${item.slug}`,
    ...(item.datePublished && { datePublished: item.datePublished }),
    ...(item.dateModified && { dateModified: item.dateModified }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container">
        <div className="page-header">
          <h1>{item.title}</h1>
          <p className="muted">{item.description}</p>
          {item.tags && (
            <div style={{ marginTop: '1rem' }}>
              {item.tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`} className="tag">
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
        
        <article>
          <p>
            This is the detailed page for <strong>{item.slug}</strong>. 
            Add your custom content here based on the item data.
          </p>
          
          {item.datePublished && (
            <p className="muted" style={{ marginTop: '2rem' }}>
              Published: {new Date(item.datePublished).toLocaleDateString()}
              {item.dateModified && item.dateModified !== item.datePublished && (
                <span> • Updated: {new Date(item.dateModified).toLocaleDateString()}</span>
              )}
            </p>
          )}
        </article>
        
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e0e0e0' }}>
          <Link href="/site">← Back to all items</Link>
        </div>
      </div>
    </>
  )
}