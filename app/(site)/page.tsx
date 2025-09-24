import Link from 'next/link'
import { getAllItems } from '@/lib/data'

export const metadata = {
  title: 'All Items - SEO Site Boilerplate',
  description: 'Browse all available items in our collection',
}

export default async function SitePage() {
  const items = await getAllItems()

  return (
    <div className="container">
      <div className="page-header">
        <h1>All Items</h1>
        <p className="muted">Browse our complete collection</p>
      </div>
      
      <div className="item-list">
        {items.map((item) => (
          <div key={item.slug} className="item-list-item">
            <h2>
              <Link href={`/${item.slug}`}>{item.title}</Link>
            </h2>
            <p className="muted">{item.description}</p>
            {item.tags && (
              <div style={{ marginTop: '0.5rem' }}>
                {item.tags.map((tag) => (
                  <Link key={tag} href={`/tags/${tag}`} className="tag">
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}