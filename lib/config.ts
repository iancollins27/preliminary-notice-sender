export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage?: string
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

export const siteConfig: SiteConfig = {
  name: "Your SaaS Name",
  description: "Transform your workflow with our powerful SaaS solution. Built for teams who value efficiency and growth.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og.png",
  links: {
    twitter: "https://twitter.com/yourusername",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/company/yourcompany",
  },
  company: {
    name: "Your Company Inc.",
    email: "hello@yourcompany.com",
    address: "123 Main St, City, State 12345",
  },
}