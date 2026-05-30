# Composio integration submission

Composio (composio.dev) provides a unified tool layer that re-exposes
integrations across MCP, OpenAI function calling, LangChain, and others.
Listing here is high-leverage because every Composio user can call your
tools without integrating MCP directly.

## Submission email / PR

- **Subject:** New integration request — Agent Mail (physical mail for agents)
- **To:** integrations@composio.dev (or via their GitHub PR flow at
  composiohq/composio)

## Body

```
Hi Composio team,

I'd like to submit Agent Mail as an integration. It's an MCP server that
lets agents send real, postmarked physical mail via USPS. We have four
tools that would map cleanly onto Composio's tool layer.

Tools:
  - send_letter(to, body, from?, subject?)
  - send_postcard(to, front_image_url, message)
  - get_mail_status(id)
  - list_sent_mail(limit?, cursor?, recipient_filter?, since?)

Resources for the integration team:
  - OpenAPI 3.1 spec: {SITE_URL}/openapi.json
  - Full docs (LLM-readable): {SITE_URL}/llms-full.txt
  - Setup guide: {SITE_URL}/setup
  - Sandbox: free, no key required, returns realistic mail records but
    doesn't actually print

Auth: Bearer token, single API key per account. Sandbox mode requires no
key.

Source repo: {GITHUB_REPO_URL}
Live MCP endpoint: {MCP_URL}

Happy to provide a sandbox API key with elevated rate limits for your
integration test suite. Let me know what you need from our end to get
this listed.

Thanks,
{FOUNDER_NAME}
```

## Composio-specific notes

- Their tool descriptions are terse — tighten ours from the OpenAPI for
  Composio's listing if possible (1 sentence each)
- They sometimes prefer a Python client SDK as a reference implementation;
  if they ask, point them at the OpenAPI and offer to ship a stub
- Tag with: `productivity`, `communication`, `mail`, `usps`
