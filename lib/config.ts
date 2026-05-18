export interface SiteConfig {
  name: string
  description: string
  tagline: string
  url: string
  ogImage?: string
  /** npm package name for the stdio MCP server. */
  npmPackage: string
  mcp: {
    /** stdio command the user pastes into their MCP client config. */
    command: string
    args: string[]
    transport: 'stdio'
  }
  api: {
    /** Public base URL of the HTTP backend (mail-api). */
    baseUrl: string
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
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.mailsnail.dev'

export const siteConfig: SiteConfig = {
  name: 'Mailsnail',
  tagline: 'The way AI agents send physical mail.',
  description:
    'Mailsnail is an MCP server that lets Claude, Cursor, Codex, and any agent send real letters and postcards via USPS — no signup, no humans in the loop, pay-per-piece via Stripe Link.',
  url: siteUrl,
  ogImage: '/api/og?title=The+way+AI+agents+send+physical+mail&site=Mailsnail',
  npmPackage: 'physical-mail-mcp',
  mcp: {
    command: 'npx',
    args: ['-y', 'physical-mail-mcp'],
    transport: 'stdio',
  },
  api: {
    baseUrl: apiBaseUrl,
  },
  links: {
    twitter: 'https://twitter.com/mailsnail',
    github: 'https://github.com/iancollins27/physical-mail-mcp',
  },
  company: {
    name: 'Mailsnail',
    email: 'hello@mailsnail.dev',
  },
}
