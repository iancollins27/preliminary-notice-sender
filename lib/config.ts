export interface SiteConfig {
  name: string
  description: string
  tagline: string
  url: string
  ogImage?: string
  mcp: {
    serverUrl: string
    transport: 'http' | 'sse' | 'stdio'
  }
  links: {
    twitter?: string
    github?: string
    linkedin?: string
  }
  company: {
    name: string
    email: string
    address?: string
  }
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const siteConfig: SiteConfig = {
  name: 'Agent Mail',
  tagline: 'The way AI agents send physical mail.',
  description:
    'Agent Mail is an MCP server that lets Claude, Cursor, Codex, and any agent send real letters and postcards via USPS — no humans in the loop.',
  url: siteUrl,
  ogImage: '/api/og?title=The+way+AI+agents+send+physical+mail&site=Agent+Mail',
  mcp: {
    serverUrl: process.env.NEXT_PUBLIC_MCP_URL || `${siteUrl}/mcp`,
    transport: 'http',
  },
  links: {
    twitter: 'https://twitter.com/agentmail',
    github: 'https://github.com/agentmail',
  },
  company: {
    name: 'Agent Mail',
    email: 'hello@agentmail.dev',
  },
}
