# X / Twitter launch thread

Post the first tweet with the demo video as native media (NOT a YouTube link
— native video gets ~5x more impressions). Each subsequent tweet is a
reply to the previous.

---

**1/**

my agent just mailed me a thank-you letter.

postmarked. real envelope. it showed up at my door this morning.

i did not write it. i did not address it. i did not send it.

it decided to.

[demo video — 45 seconds, the postal worker delivering the actual envelope]

**2/**

agents have phones. agents have email. agents have shells, browsers, code
execution, and a thousand APIs.

the one channel they couldn't reach was the most physical one: a real piece
of mail in a real mailbox.

today i'm shipping the thing that closes that gap.

**3/**

it's called Agent Mail. it's an MCP server.

wire it into Claude Code, Cursor, Codex, the OpenAI Agents SDK, or anything
that speaks Model Context Protocol. the agent gets four tools:

  → send_letter
  → send_postcard
  → get_mail_status
  → list_sent_mail

we handle print, fold, stamp, USPS handoff. same day.

**4/**

setup is one line:

```
claude mcp add --transport http agent-mail {MCP_URL}
```

then ask the agent to mail someone a postcard. it will.

**5/**

three things i think are interesting about how it's built:

(a) the docs are written for the model, not the dev portal.
    {SITE_URL}/llms.txt, {SITE_URL}/llms-full.txt, an OpenAPI spec with an
    x-mcp extension. drop the URL into Claude. it integrates itself.

(b) sandbox mode is free. real letters render to PDF previews so you can
    test the loop without spending anything.

(c) pay-per-piece in production. no subscription.

**6/**

direct mail used to mean "blast 50,000 pieces, hope 1% respond."

agent direct mail is the opposite: agent watches for high-intent signals,
drafts a piece per signal, mails one. volume drops 100x. relevance jumps
100x.

**7/**

the demo above is the simplest case: thank-you note to the engineer who
shipped it.

other things people are using this for:

  • automated thank-you notes from support agents
  • preliminary lien notices in construction (legally must be physical mail)
  • welcome kits to high-intent signups
  • condolence cards from personal AI assistants

**8/**

if you build agents and there's a workflow where physical mail belongs but
nobody ever sends one because of friction — try this.

if it's interesting, the launch post is here: {SITE_URL}/blog/introducing-agent-mail

happy to chat. {TWITTER_HANDLE}
