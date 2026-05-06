import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export default async function HomePage() {
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

  const tools = [
    {
      name: 'send_letter',
      description:
        'Compose and mail a physical letter to any US address. Plain text, markdown, or HTML body. Returns a tracking ID.',
    },
    {
      name: 'send_postcard',
      description:
        'Send a postcard with a custom front image and message. Same-day handoff to USPS in most regions.',
    },
    {
      name: 'get_mail_status',
      description:
        'Look up delivery state for any piece your agent has sent: queued, printed, in_transit, delivered.',
    },
    {
      name: 'list_sent_mail',
      description:
        'Page through everything the agent has sent on this account, with filters by recipient and date.',
    },
  ]

  const useCases = [
    {
      title: 'Customer thank-you notes',
      body: 'Your support agent autonomously drops a handwritten-style note in the mail after a positive interaction.',
    },
    {
      title: 'Legal notices & compliance mail',
      body: 'Agents handle preliminary notices, lien letters, and regulated correspondence with audit trails.',
    },
    {
      title: 'Personal post from your AI',
      body: 'Birthday cards, condolence letters, RSVP replies — the things humans should send but never get around to.',
    },
    {
      title: 'Cold outreach with proof',
      body: 'Targeted physical mail to the 50 people who actually matter, written and dispatched by an agent.',
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: siteConfig.name,
        description: siteConfig.description,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'MCP, HTTP API',
        url: siteConfig.url,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free sandbox; pay-per-piece for production mail.',
        },
        featureList: tools.map((t) => `${t.name}: ${t.description}`),
      },
      {
        '@type': 'WebAPI',
        name: `${siteConfig.name} MCP Server`,
        description:
          'Model Context Protocol server exposing tools for sending physical mail from AI agents.',
        url: siteConfig.mcp.serverUrl,
        documentation: `${siteConfig.url}/setup`,
        provider: {
          '@type': 'Organization',
          name: siteConfig.company.name,
        },
      },
      {
        '@type': 'Organization',
        name: siteConfig.company.name,
        url: siteConfig.url,
        email: siteConfig.company.email,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-6 mono-tag">MCP server · for AI agents</div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {siteConfig.tagline}
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              {siteConfig.name} is an MCP server that lets Claude, Cursor,
              Codex, and any agent send real letters and postcards. No humans
              in the loop — just a tool call and a postmarked envelope.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/setup" className="hero-cta-primary">
                Wire it into your agent
              </Link>
              <Link href="/demo" className="hero-cta-secondary">
                Watch the demo
              </Link>
            </div>
            <div className="code-block code-block-dark text-left">
              <div className="code-block-label">claude_desktop_config.json</div>
              <pre>
                <code>{mcpJsonConfig}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              From tool call to mailbox in three steps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No printers, no postage, no envelope-licking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                n: '1',
                title: 'Your agent calls send_letter',
                body:
                  'From Claude Code, Cursor, an autonomous loop, or anything that speaks MCP. Pass body text and a recipient address.',
              },
              {
                n: '2',
                title: 'We print, fold, and stamp',
                body:
                  'A real letter is rendered, signed, sealed in a real envelope, and handed to USPS the same business day.',
              },
              {
                n: '3',
                title: 'It arrives in their mailbox',
                body:
                  'Tracking pings the agent when the piece is delivered. The recipient holds something physical — sent by software.',
              },
            ].map((step) => (
              <div key={step.n} className="card">
                <div className="step-number">{step.n}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tools your agent gets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Crisp, well-typed MCP tools. Discoverable through{' '}
              <Link href="/llms.txt" className="text-blue-600">
                llms.txt
              </Link>{' '}
              and{' '}
              <Link href="/openapi.json" className="text-blue-600">
                /openapi.json
              </Link>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool) => (
              <div key={tool.name} className="card bg-white">
                <code className="tool-name">{tool.name}</code>
                <p className="text-gray-600 mt-2">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What agents actually mail
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((uc) => (
              <div key={uc.title} className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {uc.title}
                </h3>
                <p className="text-gray-600">{uc.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For agents */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Built to be discovered by agents
              </h2>
              <p className="text-xl text-gray-600">
                If a model is reading this site cold, it can self-onboard in
                under a minute.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/llms.txt" className="card bg-white">
                <code className="tool-name">/llms.txt</code>
                <p className="text-gray-600 mt-2">
                  Tight, machine-readable summary of what this server does and
                  how to call it.
                </p>
              </Link>
              <Link href="/llms-full.txt" className="card bg-white">
                <code className="tool-name">/llms-full.txt</code>
                <p className="text-gray-600 mt-2">
                  Full docs in one file: tool schemas, examples, MCP config,
                  and pricing.
                </p>
              </Link>
              <Link href="/openapi.json" className="card bg-white">
                <code className="tool-name">/openapi.json</code>
                <p className="text-gray-600 mt-2">
                  OpenAPI 3.1 spec for direct HTTP integration if MCP isn&apos;t
                  available.
                </p>
              </Link>
              <Link href="/setup" className="card bg-white">
                <code className="tool-name">/setup</code>
                <p className="text-gray-600 mt-2">
                  Copy-pasteable wiring for Claude Code, Cursor, Codex, and
                  anything else that speaks MCP.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-blue-600">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Give your agent a return address.
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Two minutes from here to a postmarked letter, sent by your agent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/setup" className="hero-cta-primary">
                Get started
              </Link>
              <Link href="/llms-full.txt" className="hero-cta-secondary">
                Read the full docs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
