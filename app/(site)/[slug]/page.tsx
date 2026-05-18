import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { getAllItems, getItemBySlug } from '@/lib/data'
import { siteConfig } from '@/lib/config'
import { renderMarkdown } from '@/lib/markdown'

export async function generateStaticParams() {
  const items = await getAllItems()
  return items.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const item = await getItemBySlug(params.slug)
  if (!item) return { title: 'Not Found' }

  const canonical = `${siteConfig.url}/${item.slug}`
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical },
    openGraph: {
      title: item.title,
      description: item.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'article',
      ...(item.datePublished && { publishedTime: item.datePublished }),
      ...(item.dateModified && { modifiedTime: item.dateModified }),
      tags: item.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: item.description,
    },
  }
}

export default async function ItemPage({ params }: { params: { slug: string } }) {
  const item = await getItemBySlug(params.slug)
  if (!item) notFound()

  const allItems = await getAllItems()
  const related = allItems
    .filter((i) => i.slug !== item.slug)
    .filter((i) => i.tags?.some((t) => item.tags?.includes(t)))
    .slice(0, 3)

  const mcpJsonConfig = JSON.stringify(
    {
      mcpServers: {
        mailsnail: {
          command: siteConfig.mcp.command,
          args: siteConfig.mcp.args,
          env: {
            MAIL_PROVIDER: 'managed',
            MAIL_API_BASE_URL: siteConfig.api.baseUrl,
          },
        },
      },
    },
    null,
    2,
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: item.title,
    description: item.description,
    url: `${siteConfig.url}/${item.slug}`,
    datePublished: item.datePublished,
    dateModified: item.dateModified ?? item.datePublished,
    author: {
      '@type': 'Organization',
      name: siteConfig.company.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.company.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/${item.slug}`,
    keywords: item.tags?.join(', '),
    about: {
      '@type': 'WebAPI',
      name: `${siteConfig.name} HTTP API`,
      url: siteConfig.api.baseUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">{item.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{item.description}</p>
            {item.tags && (
              <div>
                {item.tags.map((tag) => (
                  <Link key={tag} href={`/tags/${tag}`} className="tag">
                    {tag}
                  </Link>
                ))}
              </div>
            )}
            {item.datePublished && (
              <p className="text-sm text-gray-500 mt-4">
                <time dateTime={item.datePublished}>
                  Published{' '}
                  {new Date(item.datePublished).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                {item.dateModified && item.dateModified !== item.datePublished && (
                  <>
                    {' · Updated '}
                    <time dateTime={item.dateModified}>
                      {new Date(item.dateModified).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </>
                )}
              </p>
            )}
          </header>

          {item.body && (
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(item.body) }}
            />
          )}

          <section className="mt-12 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Wire {siteConfig.name} into your agent
            </h2>
            <p className="text-gray-600 mb-4">
              Drop this into your client&apos;s MCP config (or use{' '}
              <Link href="/setup" className="text-blue-600">
                /setup
              </Link>{' '}
              for one-line installs).
            </p>
            <div className="code-block code-block-dark">
              <div className="code-block-label">mcp.json</div>
              <pre>
                <code>{mcpJsonConfig}</code>
              </pre>
            </div>
          </section>

          {related.length > 0 && (
            <section className="mt-12 pt-8" style={{ borderTop: '1px solid #e5e7eb' }}>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                See also
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link key={r.slug} href={`/${r.slug}`} className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {r.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{r.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12">
            <Link href="/site" className="text-blue-600">
              ← All recipes
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
