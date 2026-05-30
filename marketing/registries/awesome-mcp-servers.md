# awesome-mcp-servers PR

The community-curated list at github.com/punkpeye/awesome-mcp-servers (and
similar forks) is one of the highest-traffic discovery surfaces. Submit via
PR. Keep the entry to one line that matches the surrounding format.

## PR title

`Add Agent Mail (physical mail for AI agents)`

## PR body

```markdown
Adds **Agent Mail**, a Model Context Protocol server that lets any
MCP-compatible agent send real, postmarked physical mail (letters and
postcards) via USPS.

- Homepage: {SITE_URL}
- Setup: {SITE_URL}/setup
- Docs: {SITE_URL}/llms-full.txt
- Transport: HTTP (streamable)

The server exposes four tools (`send_letter`, `send_postcard`,
`get_mail_status`, `list_sent_mail`) with tight, well-typed schemas. Free
sandbox mode; pay-per-piece in production.

Slotted under the existing **Communication** / **Productivity** category
(whichever matches the list's structure).
```

## List entry

The single-line entry that goes into the README. Match the surrounding
format exactly — most awesome lists use:

```
- [Agent Mail](https://github.com/{ORG}/{REPO}) - Send postmarked physical
  mail (letters, postcards) from any MCP-compatible agent. USPS handoff
  same business day.
```

If the list groups by category, place it under whichever bucket exists
that contains "Communication", "Mail", or "Productivity".

## Things to avoid in the PR

- Marketing language ("revolutionize", "best-in-class", etc.) — these lists
  are heavily curated and reject promotional submissions
- Adding more than one entry per repo
- Editing entries other than your own
- Including emoji unless the list already uses them in entries
