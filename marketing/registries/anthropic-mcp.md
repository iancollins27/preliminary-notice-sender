# Anthropic MCP directory submission

Anthropic publishes a curated list of MCP servers in their docs and accepts
submissions via PR or their submission form (linked from
modelcontextprotocol.io).

## Listing fields

- **Name:** Agent Mail
- **Description:** Send physical mail (letters and postcards) from any
  MCP-compatible agent. USPS handoff same business day.
- **Author:** {COMPANY_NAME}
- **Homepage:** {SITE_URL}
- **Source / install URL:** {GITHUB_REPO_URL}
- **Transport:** HTTP (streamable)
- **Categories:** Communication, Productivity

## One-line summary

> Agent Mail is an MCP server that gives AI agents the ability to send
> postmarked physical mail in the United States.

## Why include in the directory

- Single-purpose, well-typed tools (4 tools, no surprises)
- Real production service backed by USPS
- Free sandbox for experimentation
- Documentation tested for agent ingestion (`llms.txt`, `llms-full.txt`,
  OpenAPI with `x-mcp`)
- Active development, public roadmap

## Example tool call (for the directory entry)

```json
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
    "body": "Dear Ada,\n\nThank you for the meeting today.\n\nWarmly,\n..."
  }
}
```

## Submission notes

If submitting via PR to a curated list (e.g. `modelcontextprotocol/servers`):

- Add to the appropriate category section
- Use the standard table row format used by neighboring entries
- Link the source repo, not the marketing site, as the "source" field
- Confirm transport is `http` (streamable)
