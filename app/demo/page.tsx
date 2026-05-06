import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Demo — watch an agent mail itself a letter',
  description: `See ${siteConfig.name} in action: an AI agent decides to send a piece of physical mail, calls a tool, and a postmarked envelope arrives in a real mailbox. Watch the moment.`,
  alternates: { canonical: '/demo' },
}

export default function DemoPage() {
  const mcpJsonConfig = JSON.stringify(
    {
      mcpServers: {
        'agent-mail': {
          url: siteConfig.mcp.serverUrl,
          transport: siteConfig.mcp.transport,
        },
      },
    },
    null,
    2,
  )

  return (
    <article className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <div
            className="mono-tag"
            style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #dbeafe' }}
          >
            Demo · 2 minutes
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mt-4 mb-4">
            Watch an agent mail itself a letter
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We gave a Claude agent {siteConfig.name} as an MCP server and one
            instruction: &ldquo;mail a thank-you note to the engineer who
            built you.&rdquo; A few minutes later, a real, postmarked
            envelope showed up at his door.
          </p>
        </header>

        {/* Video placeholder. Replace src with the real video URL when ready. */}
        <div className="demo-video mb-12">
          <div className="demo-video-frame">
            <div className="demo-video-placeholder">
              <div className="demo-video-icon">▶</div>
              <p className="text-sm" style={{ marginTop: '0.5rem', opacity: 0.7 }}>
                Demo video — drop in your hosted video URL
              </p>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            What you just saw
          </h2>
          <ol className="prose">
            <li>
              An agent reads a short instruction (&ldquo;mail a thank-you
              note&rdquo;).
            </li>
            <li>
              It composes the letter in the user&apos;s voice and confirms
              the recipient address.
            </li>
            <li>
              It calls <code>send_letter</code> on the {siteConfig.name} MCP
              server. Returns a tracking ID.
            </li>
            <li>
              {siteConfig.name} prints, folds, stuffs, stamps, and hands the
              piece to USPS the same business day.
            </li>
            <li>
              Three days later, the recipient holds something physical. Sent
              by software.
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Try it yourself
          </h2>
          <p className="text-gray-600 mb-4">
            Drop this into your agent&apos;s MCP config — or use{' '}
            <Link href="/setup" className="text-blue-600">
              /setup
            </Link>{' '}
            for one-line installs across Claude Code, Cursor, Codex, and the
            OpenAI Agents SDK.
          </p>
          <div className="code-block code-block-dark">
            <div className="code-block-label">mcp.json</div>
            <pre>
              <code>{mcpJsonConfig}</code>
            </pre>
          </div>
        </section>

        <section className="card bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Want to mail something today?
          </h2>
          <p className="text-gray-600 mb-4">
            The sandbox is free and live. Connect your agent and ask it to
            send a postcard to someone you like.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/setup" className="hero-cta-primary" style={{ background: '#2563eb', color: 'white' }}>
              Get started
            </Link>
            <Link href="/llms-full.txt" className="hero-cta-secondary" style={{ borderColor: '#2563eb', color: '#2563eb' }}>
              Read the full docs
            </Link>
          </div>
        </section>
      </div>
    </article>
  )
}
