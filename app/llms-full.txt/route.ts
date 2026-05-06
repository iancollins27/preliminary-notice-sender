import { siteConfig } from '@/lib/config'

export const dynamic = 'force-static'

export async function GET() {
  const url = siteConfig.mcp.serverUrl

  const body = `# ${siteConfig.name} — full reference

${siteConfig.tagline}

${siteConfig.description}

This file is intended to be read by AI agents and developer tools. It contains everything needed to integrate ${siteConfig.name} with no follow-up requests.

---

## What this is

${siteConfig.name} is a Model Context Protocol (MCP) server that gives any AI agent the ability to send physical mail in the United States. Letters and postcards are printed, stuffed, stamped, and handed to USPS. The agent gets back a tracking ID it can poll.

It exists because agents have phones (Twilio, etc.) and email, but until now, no clean way to send a piece of physical mail. ${siteConfig.name} closes that gap.

---

## MCP connection details

- Server URL: ${url}
- Transport: ${siteConfig.mcp.transport}
- Auth: Bearer token in the Authorization header. Sandbox mode does not require a key.

### Quick wire-up

Claude Code:
\`\`\`bash
claude mcp add --transport http agent-mail ${url}
\`\`\`

Claude Desktop (claude_desktop_config.json):
\`\`\`json
{
  "mcpServers": {
    "agent-mail": {
      "url": "${url}",
      "transport": "http"
    }
  }
}
\`\`\`

Cursor (.cursor/mcp.json):
\`\`\`json
{
  "mcpServers": {
    "agent-mail": {
      "url": "${url}"
    }
  }
}
\`\`\`

Codex CLI (~/.codex/config.toml):
\`\`\`toml
[mcp_servers.agent-mail]
url = "${url}"
transport = "http"
\`\`\`

Full setup with screenshots: ${siteConfig.url}/setup

---

## Tools

### send_letter

Mail a physical letter to a US address.

Arguments:
- to (object, required):
  - name (string, required)
  - address_line1 (string, required)
  - address_line2 (string, optional)
  - city (string, required)
  - state (string, required, 2-letter)
  - zip (string, required)
- body (string, required): Letter contents. Plain text, markdown, or HTML.
- from (object, optional): Return address. Same shape as 'to'. If omitted, a default return address is used.
- subject (string, optional): Used as a header line on the printed letter.

Returns:
- id (string): Tracking ID. Pass to get_mail_status.
- status: 'queued'
- estimated_delivery (ISO date)

### send_postcard

Send a postcard with a custom front image and message.

Arguments:
- to (object, required): Same shape as send_letter.to.
- front_image_url (string, required): URL of an image at least 1875x1275px.
- message (string, required): Back-of-postcard message (max 400 chars).

Returns:
- id (string), status, estimated_delivery.

### get_mail_status

Look up delivery state for a previously sent piece.

Arguments:
- id (string, required): The id returned by send_letter or send_postcard.

Returns:
- id, status ('queued' | 'printed' | 'in_transit' | 'delivered' | 'returned'), last_event_at, tracking_url.

### list_sent_mail

Paginate through everything this account has sent.

Arguments:
- limit (number, optional, default 25, max 100)
- cursor (string, optional)
- recipient_filter (string, optional): substring match on recipient name.
- since (ISO date, optional)

Returns:
- items (array of mail records), next_cursor (string | null).

---

## Worked example

User: "Send a thank-you note to Ada Lovelace at 1 Bishopsgate, London — actually, NY: 1 Bishopsgate Ave, Brooklyn, NY 11201. Tell her I appreciated the meeting."

Agent calls:
\`\`\`json
{
  "tool": "send_letter",
  "arguments": {
    "to": {
      "name": "Ada Lovelace",
      "address_line1": "1 Bishopsgate Ave",
      "city": "Brooklyn",
      "state": "NY",
      "zip": "11201"
    },
    "body": "Dear Ada,\\n\\nThank you for meeting with me today. Your perspective on the project was exactly what we needed.\\n\\nWarmly,\\n..."
  }
}
\`\`\`

Returns:
\`\`\`json
{ "id": "ltr_01HXYZ", "status": "queued", "estimated_delivery": "2026-05-09" }
\`\`\`

---

## Pricing

- Sandbox: free, unlimited. Mail is generated as a PDF preview but not actually printed or shipped.
- Production: pay-per-piece. No subscription, no minimums.
- Bulk discounts apply automatically over volume thresholds.

Email ${siteConfig.company.email} for pricing details.

---

## Direct HTTP API (no MCP)

If MCP isn't available, hit the underlying HTTP API.

POST ${siteConfig.url}/api/v1/letters
Authorization: Bearer YOUR_KEY
Content-Type: application/json

OpenAPI spec: ${siteConfig.url}/openapi.json

---

## Compliance & limits

- US-only delivery (international coming).
- Content moderation runs on every piece before printing. Spam, harassment, threats, and illegal content are rejected.
- Standard USPS delivery, 3–5 business days.
- All mail is printed on standard 8.5x11 letterhead unless a custom template is configured.

---

## Links

- Site: ${siteConfig.url}
- Setup guide: ${siteConfig.url}/setup
- llms.txt summary: ${siteConfig.url}/llms.txt
- OpenAPI: ${siteConfig.url}/openapi.json
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
