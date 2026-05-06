---
title: "Introducing Agent Mail: the way AI agents send physical mail"
description: "Agents already have phones, email, code, and the web. Today we're shipping the missing channel: a postmarked envelope, decided and dispatched by software."
date: "2026-05-06"
author: "Agent Mail"
tags: ["launch", "mcp", "agents"]
---

Agents already have phones (Twilio), email (every SMTP API), code execution, file systems, web browsing, and a thousand other tools. There is one channel they couldn't reach until today: a real, postmarked piece of physical mail.

Agent Mail closes that gap.

## What it is

Agent Mail is an MCP server. Wire it into Claude Code, Claude Desktop, Cursor, the Codex CLI, the OpenAI Agents SDK, or any client that speaks Model Context Protocol. The server exposes four tools:

- `send_letter` — compose and mail a physical letter to any US address
- `send_postcard` — send a postcard with a custom front image
- `get_mail_status` — check delivery state by ID
- `list_sent_mail` — paginate through everything the agent has sent

That's the entire surface. No 17-knob configuration, no campaign builder, no template DSL. Just a small set of well-typed tools that an agent can call on the first try.

## Why now

Two things changed in the last year that make this interesting:

1. **MCP shipped and stuck.** Every major agent runtime now speaks the protocol. A single MCP server is reachable from every place an agent runs.
2. **Agents got good enough to write the letter.** A frontier model can draft a thank-you note, a condolence card, or a preliminary-notice letter that doesn't read like a template. The bottleneck isn't writing anymore; it's dispatch.

## The kinds of things our users mail

- Customer thank-you notes after a positive support resolution
- Welcome kits for high-intent signups
- Preliminary lien notices in construction (which legally have to ship as physical mail)
- Birthday and condolence cards from personal AI assistants
- Targeted, low-volume direct mail to the 50 accounts that matter, written and dispatched per-event by an agent

## Built for agents first

Most APIs are designed for a human reading a dev portal. We built the opposite: a site that an agent can read cold.

- [`/llms.txt`](/llms.txt) and [`/llms-full.txt`](/llms-full.txt) at the root, written for ingestion
- [`/openapi.json`](/openapi.json) with rich descriptions and an `x-mcp` extension
- [`/setup`](/setup) that returns ready-to-paste MCP config for every major client
- JSON-LD `SoftwareApplication` and `WebAPI` graphs on the homepage

If a model lands on the docs without context, it should be able to wire itself in without further hand-holding.

## How to try it

Open Claude Code in any project and run:

```bash
claude mcp add --transport http agent-mail https://example.com/mcp
```

Then ask the agent to send you a postcard. It will. The full setup walkthrough lives at [`/setup`](/setup).

## What's next

Three things on our roadmap:

1. **International delivery.** US-only at launch; international coming.
2. **Custom letterheads and stationery.** Per-account templates so your agent's mail feels like yours.
3. **Listing in every MCP registry that exists.** Smithery, Anthropic's MCP directory, awesome-mcp-servers, Pulse MCP, Composio, Pipedream.

If you build with agents and there's a workflow where physical mail belongs but never gets sent because of the friction, we'd love to hear about it. Email [hello@agentmail.dev](mailto:hello@agentmail.dev).
