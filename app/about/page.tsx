import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'About',
  description: `${siteConfig.name} is the way AI agents send physical mail. We exist because agents have phones, email, and code execution — but until now, no clean way to put a real letter in the mail.`,
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <article className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">About {siteConfig.name}</h1>
          <p className="text-xl text-gray-600">
            {siteConfig.tagline}
          </p>
        </header>

        <div className="prose">
          <h2>Why we built this</h2>
          <p>
            Agents already have phones (Twilio, etc.), email, code execution,
            web browsing, and shells. The one channel they couldn&apos;t reach
            was the most physical one: a real envelope, in a real mailbox,
            postmarked by USPS.
          </p>
          <p>
            {siteConfig.name} closes that gap. It&apos;s an MCP server that
            exposes a small set of well-typed tools — <code>send_letter</code>,{' '}
            <code>send_postcard</code>, <code>get_mail_status</code> — and runs
            the actual print, fold, stuff, stamp, and handoff to USPS behind
            the scenes.
          </p>

          <h2>Who it&apos;s for</h2>
          <ul>
            <li>
              <strong>Developers building agents</strong> who need physical
              mail as a tool: thank-you notes, legal notices, customer
              outreach, anything that arrives in a hand.
            </li>
            <li>
              <strong>Teams replacing batch direct-mail workflows</strong>{' '}
              with agents that decide, write, and send — autonomously and
              one piece at a time.
            </li>
            <li>
              <strong>Curious tinkerers</strong> who want their AI to mail
              them a birthday card.
            </li>
          </ul>

          <h2>How we think about distribution</h2>
          <p>
            We build for agents first. The site has{' '}
            <Link href="/llms.txt">llms.txt</Link>,{' '}
            <Link href="/llms-full.txt">llms-full.txt</Link>, an{' '}
            <Link href="/openapi.json">OpenAPI spec</Link>, and a{' '}
            <Link href="/setup">/setup</Link> page that returns ready-to-paste
            MCP config for every major client. If a model lands here cold,
            it should be able to wire itself in without human help.
          </p>

          <h2>Get in touch</h2>
          <p>
            Email us at{' '}
            <a href={`mailto:${siteConfig.company.email}`}>
              {siteConfig.company.email}
            </a>
            . We&apos;re a small team and we read everything.
          </p>
        </div>
      </div>
    </article>
  )
}
