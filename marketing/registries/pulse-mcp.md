# Pulse MCP submission

Pulse MCP (pulsemcp.com) is a search-first directory of MCP servers with
particularly good agent ingestion. They accept submissions via web form.

## Form fields

- **Server name:** Agent Mail
- **Tagline:** The way AI agents send physical mail.
- **Description:**
  An MCP server that lets any AI agent send real, postmarked physical
  letters and postcards in the United States. Wire it into Claude Code,
  Cursor, Codex, the OpenAI Agents SDK, or anything that speaks Model
  Context Protocol; the agent gets four tools and the rest is invisible.
- **Categories:** Communication, Productivity, Business
- **Homepage:** {SITE_URL}
- **Repo:** {GITHUB_REPO_URL}
- **MCP server URL:** {MCP_URL}
- **Transport:** Streamable HTTP
- **Authentication:** Bearer token
- **Pricing model:** Pay-per-piece, free sandbox
- **Logo (1024×1024 PNG):** {LOGO_URL}

## Tool list (provide as JSON if their form supports it)

```json
[
  {
    "name": "send_letter",
    "description": "Mail a physical letter to a US address.",
    "input_schema_url": "{SITE_URL}/openapi.json#/components/schemas/letters_post"
  },
  {
    "name": "send_postcard",
    "description": "Send a postcard with a custom front image and message.",
    "input_schema_url": "{SITE_URL}/openapi.json#/components/schemas/postcards_post"
  },
  {
    "name": "get_mail_status",
    "description": "Look up delivery state for a piece by ID.",
    "input_schema_url": "{SITE_URL}/openapi.json#/components/schemas/letters_get"
  },
  {
    "name": "list_sent_mail",
    "description": "Paginate through sent mail with filters.",
    "input_schema_url": "{SITE_URL}/openapi.json#/components/schemas/letters_list"
  }
]
```

## What to highlight

- **Agent-readable docs.** llms.txt, llms-full.txt, OpenAPI with x-mcp
  extension, /setup endpoint with copy-paste config. Pulse readers care
  about ingestion quality.
- **Sandbox mode** for free experimentation.
- **Single-purpose, narrow surface.** Four tools only.
