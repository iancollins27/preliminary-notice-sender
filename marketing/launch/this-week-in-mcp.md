# Pitch email — This Week in MCP / Latent Space / Ben's Bites

Pitch the same morning as the HN post. Three variants below.

---

## Subject: New MCP server — agents can now send physical mail (Agent Mail)

Hi {NEWSLETTER_EDITOR_NAME},

Quick pitch for {NEWSLETTER_NAME} — I just shipped **Agent Mail**, an MCP
server that lets any agent (Claude Code, Cursor, Codex, OpenAI Agents SDK,
etc.) send real, postmarked physical mail.

The hook: **agents could already text, email, run shells, browse the web.
Physical mail was the last channel they couldn't reach.** Agent Mail closes
the gap. Wire it in with one line, and your agent gets `send_letter`,
`send_postcard`, `get_mail_status`, `list_sent_mail`.

Demo: {DEMO_VIDEO_URL} — a Claude agent mailing a thank-you letter to the
engineer who built it. Postmarked. Real envelope. His actual mailbox.

Three things I think are notable for {NEWSLETTER_NAME}'s audience:

1. **It's built for agents, not humans.** There's an `llms.txt`, an OpenAPI
   spec with an `x-mcp` extension, and a `/setup` endpoint that returns
   ready-to-paste config for every major client. Agent-discoverability as
   a first-class design constraint.

2. **The product surface is tiny on purpose.** Four tools, well-typed
   schemas. Models call them correctly on the first try.

3. **One-piece-at-a-time direct mail is a new shape.** Lob is great for
   batch. Agent Mail is for the opposite: agent decides per-event,
   drafts the piece, dispatches it. Volume drops 100x; relevance jumps
   100x.

Show HN went up here: {HN_URL}

If it's a fit, I'm around for any questions or to write a longer guest
piece on the agent-readable-docs approach.

Thanks,
{FOUNDER_NAME}
{SITE_URL}

---

## Variant 2 — shorter

Hi {NEWSLETTER_EDITOR_NAME},

Just shipped **Agent Mail** — an MCP server that lets any AI agent send
real, postmarked physical mail. Wire it in, ask the agent to mail someone
a postcard, it does.

Demo (45s): {DEMO_VIDEO_URL}
Show HN: {HN_URL}
Site: {SITE_URL}

The angle that might interest {NEWSLETTER_NAME}: the entire site is built
to be ingestible by an LLM cold (`llms.txt`, OpenAPI with `x-mcp`,
`/setup`). Agent-discoverability as design constraint.

Happy to chat or write longer if useful.

— {FOUNDER_NAME}

---

## Variant 3 — Latent Space angle

Hi swyx / Alessio,

Latent Space readers might be the right audience for this — I shipped
**Agent Mail**, an MCP server that gives any agent the ability to send
physical mail. Demo: {DEMO_VIDEO_URL}.

The piece I'd be most excited to talk about for the pod: **the entire
site is designed to be discovered and onboarded by an LLM with no human
in the loop.** `llms.txt`, `llms-full.txt`, OpenAPI with `x-mcp`
extension, a `/setup` endpoint that returns ready-to-paste MCP config
for Claude Code/Desktop/Cursor/Codex/OpenAI Agents SDK. JSON-LD with
`SoftwareApplication` and `WebAPI` graphs.

I think "agent-readable web" is going to be a thing in 2026 the way
"mobile-first" was in 2012, and Agent Mail is a small, sharp example.

Around for the pod or a guest essay if it's interesting.

— {FOUNDER_NAME}
{SITE_URL}
