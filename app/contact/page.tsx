import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Email ${siteConfig.company.email} for sales, support, or anything else. Most agents only need /setup.`,
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <article className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">Contact</h1>
          <p className="text-xl text-gray-600">
            Most things have a faster path than email. Try those first.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link href="/setup" className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Wire it into your agent
            </h2>
            <p className="text-gray-600">
              Copy-paste MCP config for Claude Code, Claude Desktop, Cursor,
              Codex, and OpenAI Agents SDK.
            </p>
          </Link>
          <Link href="/llms-full.txt" className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Read the docs
            </h2>
            <p className="text-gray-600">
              Tool schemas, worked examples, pricing, and HTTP fallback in one
              file.
            </p>
          </Link>
          <Link href="/openapi.json" className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              OpenAPI spec
            </h2>
            <p className="text-gray-600">
              Machine-readable API description if you&apos;re integrating
              without MCP.
            </p>
          </Link>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              GitHub
            </h2>
            <p className="text-gray-600">
              Examples, client libraries, and issue tracker.
            </p>
          </a>
        </div>

        <div className="card bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Still want a human?
          </h2>
          <p className="text-gray-600 mb-4">
            Sales, partnerships, security disclosure, press — we read every
            email.
          </p>
          <p>
            <a
              href={`mailto:${siteConfig.company.email}`}
              className="text-blue-600 font-semibold"
            >
              {siteConfig.company.email}
            </a>
          </p>
        </div>
      </div>
    </article>
  )
}
