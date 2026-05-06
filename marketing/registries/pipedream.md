# Pipedream integration submission

Pipedream (pipedream.com) lets users wire integrations into workflows and
recently added MCP support. Their integration directory accepts third-party
submissions via the contributor portal.

## Submission flow

1. Open an issue at github.com/PipedreamHQ/pipedream titled
   "Component request: Agent Mail (physical mail via MCP)"
2. Or submit via the contributor form linked from
   pipedream.com/docs/components/contributing

## Issue template

```markdown
## Component request

**Service:** Agent Mail
**Homepage:** {SITE_URL}
**Type:** MCP server (HTTP transport) + REST API
**Auth:** Bearer token

## Why this is useful for Pipedream users

Agent Mail lets workflows send real, postmarked physical mail. Most
Pipedream use cases that involve "send a notification" stop at email or
SMS; Agent Mail extends this to a physical envelope. Combined with
Pipedream's CRM/billing/event triggers, this enables:

- Automated thank-you letters when a deal closes in Salesforce/HubSpot
- Welcome kits when a high-value account onboards
- Compliance mail (preliminary notices, etc.) triggered by project events
- Birthday cards from a daily-cron workflow

## Proposed components

**Actions:**
- `send_letter` — mail a physical letter
- `send_postcard` — send a postcard
- `get_mail_status` — check delivery status
- `list_sent_mail` — list sent pieces

**Triggers (Pipedream-specific addition):**
- `mail_delivered` — webhook fires when a piece reaches `delivered` status
- `mail_returned` — webhook fires when a piece is returned undelivered

## Resources

- OpenAPI spec: {SITE_URL}/openapi.json
- LLM-readable docs: {SITE_URL}/llms-full.txt
- Setup guide: {SITE_URL}/setup
- Sandbox API: free, no key required

## Test account

Happy to provide a Pipedream-specific test key with elevated rate limits.
Email {COMPANY_EMAIL}.

— {FOUNDER_NAME}
```

## What Pipedream typically needs from the vendor

- A stable webhook system for triggers (we'll need to ship `mail_delivered`
  and `mail_returned` webhooks if not already done)
- A test account with no rate limits during component dev
- Clear OAuth or API key scopes (we use a single bearer token, which is
  simpler but worth flagging up front)
- A logo at 1024×1024 PNG and an SVG variant
