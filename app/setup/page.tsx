import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: `Setup — wire ${siteConfig.name} into your agent`,
  description: `Copy-paste MCP configuration for Claude Code, Claude Desktop, Cursor, Codex, and any MCP-compatible client. ${siteConfig.name} server URL: ${siteConfig.mcp.serverUrl}.`,
  alternates: { canonical: '/setup' },
}

export default function SetupPage() {
  const url = siteConfig.mcp.serverUrl

  const claudeDesktop = JSON.stringify(
    {
      mcpServers: {
        'agent-mail': {
          url,
          transport: 'http',
        },
      },
    },
    null,
    2,
  )

  const claudeCode = `claude mcp add --transport http agent-mail ${url}`

  const cursor = JSON.stringify(
    {
      mcpServers: {
        'agent-mail': {
          url,
        },
      },
    },
    null,
    2,
  )

  const codex = `[mcp_servers.agent-mail]
url = "${url}"
transport = "http"`

  const openaiAgents = `from openai import OpenAI
from openai.types.beta.threads import MessageContentText
from agents import Agent, MCPServerStreamableHttp

mail = MCPServerStreamableHttp(name="agent-mail", url="${url}")

agent = Agent(
    name="Mailer",
    instructions="You can send physical mail via the agent-mail MCP server.",
    mcp_servers=[mail],
)`

  const httpFallback = `# If you can't use MCP, hit the HTTP API directly.
curl -X POST ${siteConfig.url}/api/v1/letters \\
  -H "Authorization: Bearer $AGENT_MAIL_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": {
      "name": "Recipient Name",
      "address_line1": "1 Main St",
      "city": "Brooklyn",
      "state": "NY",
      "zip": "11201"
    },
    "body": "Hello from your agent."
  }'`

  const blocks = [
    {
      id: 'claude-code',
      title: 'Claude Code',
      subtitle: 'One command. The MCP server is registered for the current project.',
      lang: 'bash',
      code: claudeCode,
    },
    {
      id: 'claude-desktop',
      title: 'Claude Desktop',
      subtitle: (
        <>
          Add to your <code>claude_desktop_config.json</code> (Settings →
          Developer → Edit Config).
        </>
      ),
      lang: 'json',
      code: claudeDesktop,
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
          Wire the streamable-HTTP MCP server into your <code>Agent</code>.
        </>
      ),
      lang: 'python',
      code: openaiAgents,
    },
    {
      id: 'http',
      title: 'HTTP API (no MCP)',
      subtitle: 'Skip MCP and call the underlying API directly.',
      lang: 'bash',
      code: httpFallback,
    },
  ]

  return (
    <article className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="mono-tag" style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #dbeafe' }}>
            Setup · 2-minute integration
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mt-4 mb-4">
            Wire {siteConfig.name} into your agent
          </h1>
          <p className="text-xl text-gray-600">
            Copy a block, paste it into your client&apos;s MCP config, restart,
            and your agent now has tools to send physical mail.
          </p>
          <div
            className="code-block code-block-dark mt-8"
            style={{ maxWidth: '720px' }}
          >
            <div className="code-block-label">MCP server URL</div>
            <pre>
              <code>{url}</code>
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
              <code>send_letter</code> — mail a physical letter to any US
              address.
            </li>
            <li>
              <code>send_postcard</code> — send a postcard with a custom
              front and message.
            </li>
            <li>
              <code>get_mail_status</code> — check delivery status by ID.
            </li>
            <li>
              <code>list_sent_mail</code> — list everything the agent has
              sent.
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
            Need an API key?
          </h2>
          <p className="text-gray-600 mb-4">
            The sandbox is open and free. Production mail requires a key —
            email{' '}
            <a href={`mailto:${siteConfig.company.email}`} className="text-blue-600">
              {siteConfig.company.email}
            </a>{' '}
            and we&apos;ll get you set up.
          </p>
        </section>
      </div>
    </article>
  )
}
