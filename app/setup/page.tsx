import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: `Setup — wire ${siteConfig.name} into your agent`,
  description: `Copy-paste MCP configuration for Claude Code, Claude Desktop, Cursor, Codex, and any MCP-compatible client. Installs via npx, no signup required.`,
  alternates: { canonical: '/setup' },
}

export default function SetupPage() {
  const pkg = siteConfig.npmPackage
  const apiBase = siteConfig.api.baseUrl

  const mcpEnv = {
    MAIL_PROVIDER: 'managed',
    MAIL_API_BASE_URL: apiBase,
  }

  const claudeDesktop = JSON.stringify(
    {
      mcpServers: {
        mailsnail: {
          command: 'npx',
          args: ['-y', pkg],
          env: mcpEnv,
        },
      },
    },
    null,
    2,
  )

  const claudeCode = `claude mcp add mailsnail -- npx -y ${pkg}
# then set env vars in ~/.claude/settings.json under "env"`

  const cursor = JSON.stringify(
    {
      mcpServers: {
        mailsnail: {
          command: 'npx',
          args: ['-y', pkg],
          env: mcpEnv,
        },
      },
    },
    null,
    2,
  )

  const codex = `[mcp_servers.mailsnail]
command = "npx"
args = ["-y", "${pkg}"]

[mcp_servers.mailsnail.env]
MAIL_PROVIDER = "managed"
MAIL_API_BASE_URL = "${apiBase}"`

  const openaiAgents = `from agents import Agent, MCPServerStdio

mail = MCPServerStdio(
    name="mailsnail",
    params={
        "command": "npx",
        "args": ["-y", "${pkg}"],
        "env": {
            "MAIL_PROVIDER": "managed",
            "MAIL_API_BASE_URL": "${apiBase}",
        },
    },
)

agent = Agent(
    name="Mailer",
    instructions="You can send physical mail via the Mailsnail MCP server.",
    mcp_servers=[mail],
)`

  const httpFallback = `# Skip MCP — call the HTTP API directly.
# Two-call flow: (1) get a quote / payment challenge, (2) retry with an SPT.

# 1. Get a 402 challenge with the quoted price.
curl -X POST ${apiBase}/v1/letters \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": {
      "name": "Recipient Name",
      "address_line1": "1 Main St",
      "address_city": "Brooklyn",
      "address_state": "NY",
      "address_zip": "11201"
    },
    "from": { /* same shape */ },
    "body_text": "Hello from your agent.",
    "extra_service": "certified"
  }'
# → 402 Payment Required, WWW-Authenticate: Payment ...

# 2. Retry with a Stripe Shared Payment Token in the body.
curl -X POST ${apiBase}/v1/letters \\
  -H "Content-Type: application/json" \\
  -d '{
    ...same letter...,
    "payment_token": "spt_..."
  }'
# → 200 { id, status, payment_intent_id, receipt_url }`

  const blocks = [
    {
      id: 'claude-desktop',
      title: 'Claude Desktop',
      subtitle: (
        <>
          Add to your <code>claude_desktop_config.json</code> (Settings →
          Developer → Edit Config). Requires Node.js 18+.
        </>
      ),
      lang: 'json',
      code: claudeDesktop,
    },
    {
      id: 'claude-code',
      title: 'Claude Code',
      subtitle: 'One command. The MCP server is registered for the current project.',
      lang: 'bash',
      code: claudeCode,
    },
    {
      id: 'cursor',
      title: 'Cursor',
      subtitle: (
        <>
          Add to <code>~/.cursor/mcp.json</code> or your project&apos;s{' '}
          <code>.cursor/mcp.json</code>.
        </>
      ),
      lang: 'json',
      code: cursor,
    },
    {
      id: 'codex',
      title: 'Codex CLI',
      subtitle: (
        <>
          Add to <code>~/.codex/config.toml</code>.
        </>
      ),
      lang: 'toml',
      code: codex,
    },
    {
      id: 'openai-agents',
      title: 'OpenAI Agents SDK',
      subtitle: (
        <>
          Wire the stdio MCP server into your <code>Agent</code>.
        </>
      ),
      lang: 'python',
      code: openaiAgents,
    },
    {
      id: 'http',
      title: 'HTTP API (no MCP)',
      subtitle: 'Skip MCP and call the underlying API directly via the Machine Payments Protocol.',
      lang: 'bash',
      code: httpFallback,
    },
  ]

  return (
    <article className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="mono-tag" style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #dbeafe' }}>
            Setup · 2-minute integration · no signup
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mt-4 mb-4">
            Wire {siteConfig.name} into your agent
          </h1>
          <p className="text-xl text-gray-600">
            Copy a block, paste it into your client&apos;s MCP config, restart,
            and your agent now has tools to send physical mail. The first time
            it tries to send, your agent will be asked to pay via Stripe Link.
          </p>
          <div
            className="code-block code-block-dark mt-8"
            style={{ maxWidth: '720px' }}
          >
            <div className="code-block-label">npm package</div>
            <pre>
              <code>{pkg}</code>
            </pre>
          </div>
        </header>

        {blocks.map((block) => (
          <section key={block.id} id={block.id} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {block.title}
            </h2>
            <p className="text-gray-600 mb-4">{block.subtitle}</p>
            <div className="code-block code-block-dark">
              <div className="code-block-label">{block.lang}</div>
              <pre>
                <code>{block.code}</code>
              </pre>
            </div>
          </section>
        ))}

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            What your agent can now do
          </h2>
          <p className="text-gray-600 mb-4">
            After connecting, the agent has these tools available:
          </p>
          <ul className="prose">
            <li>
              <code>verify_address</code> — USPS CASS validation. Free. Run
              before sending.
            </li>
            <li>
              <code>send_letter</code> — mail a physical letter. Pass{' '}
              <code>body_text</code> (we render the PDF) or{' '}
              <code>file_url</code> (your own PDF).
            </li>
            <li>
              <code>send_postcard</code> — send a postcard with a custom front
              and back.
            </li>
            <li>
              <code>get_letter</code> — check delivery status by ID.
            </li>
            <li>
              <code>list_letters</code> — list everything the agent has sent.
            </li>
            <li>
              <code>cancel_letter</code> — cancel before production. Short
              window.
            </li>
          </ul>
          <p className="text-gray-600 mt-4">
            Full schemas live in{' '}
            <Link href="/llms-full.txt" className="text-blue-600">
              /llms-full.txt
            </Link>{' '}
            and{' '}
            <Link href="/openapi.json" className="text-blue-600">
              /openapi.json
            </Link>
            .
          </p>
        </section>

        <section className="card bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            How payment works
          </h2>
          <p className="text-gray-600 mb-4">
            There&apos;s no account on our side. When the agent calls{' '}
            <code>send_letter</code>, the server returns a 402 with the quoted
            price. The agent mints a Stripe Shared Payment Token (SPT) from a{' '}
            <a href="https://stripe.com/link" className="text-blue-600">
              Link wallet
            </a>{' '}
            (or via the{' '}
            <a href="https://github.com/stripe/link-cli" className="text-blue-600">
              link-cli
            </a>
            ) and retries with the SPT. We charge once and mail. If mailing
            fails, the charge is auto-refunded.
          </p>
          <p className="text-gray-600">
            Questions: email{' '}
            <a href={`mailto:${siteConfig.company.email}`} className="text-blue-600">
              {siteConfig.company.email}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  )
}
