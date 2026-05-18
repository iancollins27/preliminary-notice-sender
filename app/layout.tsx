import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  keywords: [
    'MCP server',
    'AI agent',
    'physical mail',
    'send letter API',
    'Claude MCP',
    'Cursor MCP',
    'Codex MCP',
    'agent mail',
    'Lob alternative',
    'Click2Mail alternative',
    'autonomous mail',
    'USPS API',
  ],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage!],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage!],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'mcp:package': siteConfig.npmPackage,
    'mcp:command': `${siteConfig.mcp.command} ${siteConfig.mcp.args.join(' ')}`,
    'mcp:transport': siteConfig.mcp.transport,
    'api:base-url': siteConfig.api.baseUrl,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="llms-full.txt" />
        <link rel="alternate" type="application/json" href="/openapi.json" title="OpenAPI spec" />
      </head>
      <body className="min-h-screen bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
