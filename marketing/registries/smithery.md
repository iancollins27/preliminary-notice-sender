# Smithery (smithery.ai) submission

Smithery aggregates MCP servers and lets users one-click install them. Their
listing flow accepts a YAML manifest in your repo's root or via their web
form.

## Listing fields

- **Name:** Agent Mail
- **Slug:** agent-mail
- **Description (short):** The way AI agents send physical mail.
- **Description (long):**
  Agent Mail is an MCP server that lets any agent — Claude Code, Cursor,
  Codex, OpenAI Agents SDK — send real, postmarked physical letters and
  postcards via USPS. Four tools (`send_letter`, `send_postcard`,
  `get_mail_status`, `list_sent_mail`), tight schemas, sandbox mode for
  free testing, pay-per-piece in production.
- **Categories / tags:** mail, communication, automation, productivity,
  business
- **Homepage:** {SITE_URL}
- **Documentation:** {SITE_URL}/llms-full.txt
- **Setup URL:** {SITE_URL}/setup
- **Source repo:** {GITHUB_REPO_URL}
- **License:** Proprietary
- **Transport:** Streamable HTTP
- **Endpoint:** {MCP_URL}
- **Author:** {COMPANY_NAME}

## Tools to surface in the listing

| Tool | Description |
| --- | --- |
| `send_letter` | Mail a physical letter to a US address. Args: `to`, `body`, optional `from` and `subject`. |
| `send_postcard` | Send a postcard with a custom front image and message. |
| `get_mail_status` | Check delivery state for a piece by ID. |
| `list_sent_mail` | Paginate through sent mail with filters. |

## Example use cases (for the listing body)

1. **Customer thank-you notes.** A support agent drops a hand-written-feeling
   note in the mail after a positive resolution.
2. **Preliminary notices in construction.** Mechanic's lien rights require
   physical mail; agents handle the dispatch.
3. **Personal AI mail.** Birthday cards, condolence notes, RSVP replies —
   the things humans should send but never get around to.

## Smithery YAML manifest

If they accept a manifest in the repo, drop this at `smithery.yaml`:

```yaml
name: agent-mail
displayName: Agent Mail
description: The way AI agents send physical mail.
homepage: {SITE_URL}
docs: {SITE_URL}/llms-full.txt
license: Proprietary
transport: http
url: {MCP_URL}
categories:
  - mail
  - communication
  - automation
tools:
  - send_letter
  - send_postcard
  - get_mail_status
  - list_sent_mail
```
