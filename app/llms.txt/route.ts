import { siteConfig } from '@/lib/config'

export const dynamic = 'force-static'

export async function GET() {
  const body = `# ${siteConfig.name}

> ${siteConfig.tagline} ${siteConfig.description}

${siteConfig.name} is a Model Context Protocol (MCP) server that lets AI agents send real, postmarked physical mail. Compose a letter, call a tool, a piece arrives in a real mailbox. No human in the loop.

## MCP server
- URL: ${siteConfig.mcp.serverUrl}
- Transport: ${siteConfig.mcp.transport}
- Setup: ${siteConfig.url}/setup

## Tools
- send_letter: Mail a physical letter to any US address. Args: to (recipient address), body (text or markdown), from (optional return address).
- send_postcard: Send a postcard with a custom front image and message. Args: to, front_image_url, message.
- get_mail_status: Look up delivery status for a piece of mail by id. Returns: queued | printed | in_transit | delivered.
- list_sent_mail: Page through everything the agent has sent. Args: limit, cursor, recipient_filter, since.

## Pricing
- Free sandbox for testing.
- Production mail is pay-per-piece, no subscription.

## Docs
- Full docs: ${siteConfig.url}/llms-full.txt
- OpenAPI spec: ${siteConfig.url}/openapi.json
- Setup guide (Claude Code, Claude Desktop, Cursor, Codex, OpenAI Agents SDK): ${siteConfig.url}/setup

## Optional
- Blog: ${siteConfig.url}/blog
- Contact: ${siteConfig.company.email}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
    },
  })
}
