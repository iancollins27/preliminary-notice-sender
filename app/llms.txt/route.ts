import { siteConfig } from '@/lib/config'

export const dynamic = 'force-static'

export async function GET() {
  const body = `# ${siteConfig.name}

> ${siteConfig.tagline} ${siteConfig.description}

${siteConfig.name} is a Model Context Protocol (MCP) server that lets AI agents send real, postmarked physical mail. Compose a letter, call a tool, a piece arrives in a real mailbox. No human in the loop, no signup — pay-per-piece via Stripe Link.

## MCP server (stdio)
- npm package: ${siteConfig.npmPackage}
- Command: ${siteConfig.mcp.command} ${siteConfig.mcp.args.join(' ')}
- Transport: stdio
- Required env: MAIL_PROVIDER=managed, MAIL_API_BASE_URL=${siteConfig.api.baseUrl}
- Setup: ${siteConfig.url}/setup

## HTTP API
- Base URL: ${siteConfig.api.baseUrl}
- Auth: Machine Payments Protocol (HTTP 402 / WWW-Authenticate: Payment) with Stripe Shared Payment Tokens. No API keys.
- OpenAPI: ${siteConfig.url}/openapi.json

## Tools (6)
- verify_address: USPS CASS validation. Free. Returns deliverability + normalized address. Args: address_line1, address_line2?, address_city, address_state, address_zip.
- send_letter: Mail a physical letter to a US address. Args: to (address), from (address), and EITHER body_text (plain text, we render the PDF) OR file_url (URL to your own PDF). Optional: color, double_sided, extra_service ("certified" for tracking), description, payment_token (Stripe SPT).
- send_postcard: Send a postcard with a custom front and back. Args: to, from, front_url, back_url, size (4x6 | 6x9 | 6x11).
- get_letter: Look up status by id.
- list_letters: Page through sent mail.
- cancel_letter: Cancel before production (short window).

## Payment flow
1. Call send_letter without a payment_token.
2. Server responds 402 with the quoted price in the WWW-Authenticate: Payment header and a payment_request body.
3. Mint a Stripe Shared Payment Token (SPT) for the quoted amount — via a Link wallet, the link-cli (https://github.com/stripe/link-cli), or any MPP-aware payment client.
4. Retry send_letter with payment_token: "spt_..." in the body (or Authorization: Payment header).
5. We charge once and mail. If mailing fails after charge, the PaymentIntent is auto-refunded.

## Pricing (USD, per piece)
- First-class letter: $1.50
- Certified letter:   $9.00
- Postcard (4x6):     $1.00

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
