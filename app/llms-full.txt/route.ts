import { siteConfig } from '@/lib/config'

export const dynamic = 'force-static'

export async function GET() {
  const pkg = siteConfig.npmPackage
  const apiBase = siteConfig.api.baseUrl

  const body = `# ${siteConfig.name} — full reference

${siteConfig.tagline}

${siteConfig.description}

This file is intended to be read by AI agents and developer tools. It contains everything needed to integrate ${siteConfig.name} with no follow-up requests.

---

## What this is

${siteConfig.name} is a Model Context Protocol (MCP) server that gives any AI agent the ability to send physical mail in the United States. Letters and postcards are printed, stuffed, stamped, and handed to USPS. The agent gets back a tracking ID it can poll.

It exists because agents have phones (Twilio) and email, but until now, no clean way to send a piece of physical mail. ${siteConfig.name} closes that gap.

The MCP server is on npm as \`${pkg}\` and runs locally via stdio. Payment is handled per-piece via the Machine Payments Protocol (Stripe Shared Payment Tokens). There is no account, no signup, and no API key.

---

## MCP connection (stdio)

- npm package: ${pkg}
- Command: ${siteConfig.mcp.command} ${siteConfig.mcp.args.join(' ')}
- Transport: stdio
- Required env vars: MAIL_PROVIDER=managed, MAIL_API_BASE_URL=${apiBase}

### Quick wire-up

Claude Code:
\`\`\`bash
claude mcp add mailsnail -- npx -y ${pkg}
\`\`\`

Claude Desktop (claude_desktop_config.json):
\`\`\`json
{
  "mcpServers": {
    "mailsnail": {
      "command": "npx",
      "args": ["-y", "${pkg}"],
      "env": {
        "MAIL_PROVIDER": "managed",
        "MAIL_API_BASE_URL": "${apiBase}"
      }
    }
  }
}
\`\`\`

Cursor (.cursor/mcp.json):
\`\`\`json
{
  "mcpServers": {
    "mailsnail": {
      "command": "npx",
      "args": ["-y", "${pkg}"],
      "env": {
        "MAIL_PROVIDER": "managed",
        "MAIL_API_BASE_URL": "${apiBase}"
      }
    }
  }
}
\`\`\`

Codex CLI (~/.codex/config.toml):
\`\`\`toml
[mcp_servers.mailsnail]
command = "npx"
args = ["-y", "${pkg}"]

[mcp_servers.mailsnail.env]
MAIL_PROVIDER = "managed"
MAIL_API_BASE_URL = "${apiBase}"
\`\`\`

Full setup: ${siteConfig.url}/setup

---

## Tools (6)

### verify_address

USPS CASS address verification. Free. Run before sending so you stop paying for return-to-sender.

Arguments:
- address_line1 (string, required)
- address_line2 (string, optional)
- address_city (string, optional)
- address_state (string, optional)
- address_zip (string, optional)

Returns:
- deliverability: 'deliverable' | description string
- normalized: address with normalized fields

### send_letter

Mail a physical letter to a US address.

Arguments:
- to (object, required):
  - name (string, required)
  - company (string, optional)
  - address_line1 (string, required)
  - address_line2 (string, optional)
  - address_city (string, required)
  - address_state (string, required, 2-letter)
  - address_zip (string, required)
- from (object, required): same shape as 'to'.
- body_text (string, optional): Plain text body. Rendered to letter-sized PDF server-side. Use this for the simplest flow.
- file_url (string, optional): URL to a pre-rendered PDF (Letter 8.5x11). Use this for branded letterhead.
  (Provide exactly one of body_text or file_url.)
- color (boolean, default false)
- double_sided (boolean, default true)
- extra_service ('certified' | 'registered' | 'certified_return_receipt', optional): adds tracking; certified is recommended for legal notices.
- description (string, optional): internal label.
- payment_token (string, optional): Stripe Shared Payment Token (spt_...). If absent, the tool returns a payment_required error with the quoted price so the agent can mint an SPT and retry.

Returns (on success):
- id (string): letter id at the upstream provider.
- status (string)
- amount_charged_cents, currency
- payment_intent_id
- receipt_url (string | null)

### send_postcard

Send a postcard with a custom front and back.

Arguments:
- to, from (addresses)
- front_url (string, required): URL to PDF for the front.
- back_url (string, optional): URL to PDF for the back. Required for Lob; ignored for Click2Mail.
- size ('4x6' | '6x9' | '6x11', default '4x6')
- payment_token (optional, same semantics as send_letter)

### get_letter

Look up status for a previously sent letter.

Arguments: id (string, required).

### list_letters

Page through sent mail.

### cancel_letter

Cancel a letter before it enters production. Cancellation windows are short.

---

## Payment flow (Machine Payments Protocol)

This server implements the Machine Payments Protocol — see https://docs.stripe.com/payments/machine/mpp.

1. Agent calls \`send_letter\` (or hits POST ${apiBase}/v1/letters) with no payment.
2. Server responds:
   - HTTP 402 Payment Required
   - WWW-Authenticate: Payment intent="purchase", request="<base64url JSON>"
   - Body (application/problem+json): { type, title, status: 402, payment_request: { amount, currency, methods: ["stripe.spt"], idempotency_key } }
3. Agent mints a Stripe Shared Payment Token (SPT) for the quoted amount. Options:
   - Stripe Link wallet
   - link-cli (https://github.com/stripe/link-cli)
   - Any MPP-aware payment library
4. Agent retries with payment:
   - Header: Authorization: Payment intent="purchase", method="stripe.spt", credentials="<base64url {shared_payment_token, idempotency_key}>"
   - OR Body field: payment_token: "spt_..."
5. Server charges the SPT via Stripe PaymentIntents, then mails via Click2Mail.
6. If mailing fails after a successful charge, the PaymentIntent is auto-refunded and the agent gets a 502 with the refund id.

---

## Worked example

User: "Send a thank-you note to Ada Lovelace at 1 Bishopsgate Ave, Brooklyn, NY 11201. Tell her I appreciated the meeting."

Agent calls (no payment yet):
\`\`\`json
{
  "tool": "send_letter",
  "arguments": {
    "to": {
      "name": "Ada Lovelace",
      "address_line1": "1 Bishopsgate Ave",
      "address_city": "Brooklyn",
      "address_state": "NY",
      "address_zip": "11201"
    },
    "from": {
      "name": "Charles Babbage",
      "address_line1": "...",
      "address_city": "...",
      "address_state": "...",
      "address_zip": "..."
    },
    "body_text": "Dear Ada,\\n\\nThank you for meeting with me today. Your perspective on the project was exactly what we needed.\\n\\nWarmly,\\nCharles"
  }
}
\`\`\`

Tool returns a payment_required error with amount_cents: 150 (\$1.50 for first-class). The agent mints an SPT via Link for \$1.50 and retries:

\`\`\`json
{
  "tool": "send_letter",
  "arguments": {
    "to": { ... },
    "from": { ... },
    "body_text": "Dear Ada, ...",
    "payment_token": "spt_..."
  }
}
\`\`\`

Returns:
\`\`\`json
{
  "id": "job_01HXYZ",
  "status": "in_production",
  "amount_charged_cents": 150,
  "currency": "usd",
  "payment_intent_id": "pi_...",
  "receipt_url": "https://pay.stripe.com/receipts/..."
}
\`\`\`

---

## Pricing (USD, per piece, all-inclusive)

| Piece | Price |
|---|---|
| First-class letter | \$1.50 |
| Certified letter   | \$9.00 |
| Postcard (4x6)     | \$1.00 |

Includes: printing, paper, envelope, postage, tracking (certified only). No subscription, no minimums.

---

## Direct HTTP API (no MCP)

For non-MCP clients. Base URL: ${apiBase}/v1

POST /verify          — address verification (free)
POST /letters         — send a letter (MPP / SPT)
GET  /letters/{id}    — status

OpenAPI 3.1 spec: ${siteConfig.url}/openapi.json

---

## Compliance & limits

- US-only delivery for v1.
- Content moderation runs before printing. Spam, fraud, harassment, threats, and illegal content are rejected.
- Standard USPS delivery: 3–5 business days for first-class; certified adds tracking.
- Default paper: white 24# letter-size. Use file_url for custom letterhead.
- Per-piece body_text limit: 20,000 chars (~6-8 pages).

---

## Links

- Site: ${siteConfig.url}
- Setup guide: ${siteConfig.url}/setup
- llms.txt summary: ${siteConfig.url}/llms.txt
- OpenAPI: ${siteConfig.url}/openapi.json
- npm package: https://www.npmjs.com/package/${pkg}
- GitHub: ${siteConfig.links.github}
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
