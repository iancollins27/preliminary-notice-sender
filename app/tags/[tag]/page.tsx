import Link from 'next/link'
import { Metadata } from 'next'
import { getAllTags, getItemsByTag } from '@/lib/data'

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    tag: tag,
  }))
}

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag)
  const items = await getItemsByTag(tag)
  
  return {
    title: `${tag} - Items Tagged with ${tag}`,
    description: `Browse all items tagged with "${tag}". Found ${items.length} items.`,
  }
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag)
  const items = await getItemsByTag(tag)

  return (
    <div className="container">
      <div className="page-header">
        <h1>Items tagged with "{tag}"</h1>
        <p className="muted">{items.length} items found</p>
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
                {item.tags.map((itemTag) => (
                  <Link key={itemTag} href={`/tags/${itemTag}`} className="tag">
                    {itemTag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {items.length === 0 && (
        <p>No items found with the tag "{tag}".</p>
      )}
      
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e0e0e0' }}>
        <Link href="/site">← Back to all items</Link>
      </div>
    </div>
  )
}