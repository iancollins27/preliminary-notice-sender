# Show HN: Agent Mail — an MCP server that lets your AI agent send physical mail

**URL:** {SITE_URL}/demo

---

Hi HN,

I built Agent Mail because my agent could text me, email me, run shells, and
browse the web — but it couldn't send a physical letter. That seemed like the
last channel left.

It's an MCP server. You wire it into Claude Code, Claude Desktop, Cursor,
Codex, the OpenAI Agents SDK, or anything else that speaks Model Context
Protocol, and the agent gets four tools:

  - `send_letter` — mail a physical letter to a US address
  - `send_postcard` — send a postcard with a custom front
  - `get_mail_status` — check delivery state by ID
  - `list_sent_mail` — paginate sent mail

We print, fold, stuff, stamp, and hand it to USPS the same business day.

The launch demo is a Claude agent mailing a thank-you letter to the engineer
who built it. Postmarked, real envelope, his actual mailbox: {DEMO_VIDEO_URL}.

A few things I think are interesting:

  - **The site is built for agents, not humans.** There's an `llms.txt`,
    `llms-full.txt`, an OpenAPI spec with an `x-mcp` extension, and a
    `/setup` route that returns ready-to-paste config for every major
    client. Drop the URL into a Claude conversation and it will integrate
    itself.
  - **Sandbox mode is free** — letters render to PDF previews so you can
    test without spending anything.
  - **Pay-per-piece in production**, no subscription.

Setup is one line:

```
claude mcp add --transport http agent-mail {MCP_URL}
```

Happy to answer questions about the print/mail backend, the MCP server
architecture, content moderation, USPS integration, or the agent-readable
docs approach.

— {FOUNDER_NAME}
