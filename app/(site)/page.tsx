import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllItems } from '@/lib/data'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Recipes',
  description: `How-tos, comparisons, and integration guides for using ${siteConfig.name} from every major agent runtime.`,
  alternates: { canonical: '/site' },
}

export default async function RecipesIndexPage() {
  const items = await getAllItems()

  return (
    <article className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">Recipes</h1>
          <p className="text-xl text-gray-600">
            Practical guides for using {siteConfig.name} from Claude Code,
            Cursor, Codex, the OpenAI Agents SDK, and anywhere else MCP runs.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <Link key={item.slug} href={`/${item.slug}`} className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              {item.tags && (
                <div>
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
