# Marketing copy & launch artifacts

Drafts for everything that has to be posted by hand. Nothing in this folder is
imported by the Next.js app — it's plain markdown for review.

```
marketing/
  launch/
    hn-show-post.md          # Show HN submission
    twitter-thread.md        # X / Twitter launch thread
    this-week-in-mcp.md      # Newsletter pitch
  registries/
    smithery.md              # Smithery (smithery.ai) submission
    anthropic-mcp.md         # Anthropic MCP directory listing
    awesome-mcp-servers.md   # PR description for the GitHub awesome list
    pulse-mcp.md             # Pulse MCP submission
    composio.md              # Composio integration submission
    pipedream.md             # Pipedream integration submission
```

## Sequence

The recommended order, assuming the demo video is ready and the MCP server
URL is live:

1. **Submit to all six registries** the same morning. Most have async review
   queues; getting in line early matters.
2. **Wait until at least one major registry approves** before posting publicly.
   This way the HN/Twitter posts can link to a registry listing as social
   proof.
3. **Post the X thread first** (lower stakes, allows iteration).
4. **Submit to Show HN** within the same 24-hour window — the X thread
   provides early traffic that helps the HN post survive the first hour.
5. **Email *This Week in MCP*** the morning after the HN post. By then there
   are usually retweets/comments to cite.

Do not skip the demo video. Every piece of copy below assumes it exists and
links to `/demo`. Without it the posts are 10x weaker.

## Replace before posting

Every file uses these placeholders:

- `{SITE_URL}` — production marketing site URL
- `{MCP_URL}` — production MCP server URL
- `{DEMO_VIDEO_URL}` — hosted video (YouTube unlisted is fine)
- `{TWITTER_HANDLE}` — your X handle
- `{FOUNDER_NAME}` — first-person attribution where used

A search-and-replace pass before posting takes ~30 seconds.
