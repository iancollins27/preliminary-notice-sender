import type { Metadata } from 'next'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${siteConfig.name} handles addresses, mail content, and account data.`,
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <article className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-600">
            <strong>Last updated:</strong>{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </header>

        <div className="prose">
          <p>
            {siteConfig.name} prints and mails physical letters and postcards
            on behalf of users and AI agents acting under their accounts. To
            do that we have to handle a small set of personal data. This
            policy is written to be short and unambiguous.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Account data:</strong> email address, API key, billing
              information.
            </li>
            <li>
              <strong>Mail content:</strong> the text or imagery your agent
              sends, plus the recipient address you supply.
            </li>
            <li>
              <strong>Operational logs:</strong> request metadata
              (timestamps, IPs, error codes) for security and debugging.
            </li>
          </ul>

          <h2>What we do with it</h2>
          <ul>
            <li>Print, fold, and post your mail via USPS.</li>
            <li>
              Run automated content moderation on each piece before printing
              to block spam, harassment, threats, and illegal content.
            </li>
            <li>
              Show your account history (mail you have sent and its delivery
              status).
            </li>
            <li>Bill you for production mail.</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <h2>What we don&apos;t do</h2>
          <ul>
            <li>We don&apos;t sell your data.</li>
            <li>We don&apos;t use mail content to train AI models.</li>
            <li>
              We don&apos;t share recipient addresses with anyone outside the
              postal supply chain (printer, USPS).
            </li>
          </ul>

          <h2>Retention</h2>
          <p>
            Mail content and recipient addresses are retained for 90 days for
            customer support and audit, then purged. Account and billing
            records are retained as long as required by tax and accounting
            law.
          </p>

          <h2>Your rights</h2>
          <p>
            You can request access, correction, or deletion of your data at
            any time by emailing{' '}
            <a href={`mailto:${siteConfig.company.email}`}>
              {siteConfig.company.email}
            </a>
            . If you&apos;re in the EU/UK, you have the rights granted under
            GDPR. If you&apos;re in California, you have the rights granted
            under CCPA.
          </p>

          <h2>Sub-processors</h2>
          <p>
            We rely on a small number of vendors to operate the service:
            cloud hosting, the print/mail facility, the payment processor,
            and standard observability tools. Current list available on
            request.
          </p>

          <h2>Changes</h2>
          <p>
            We&apos;ll update this page when the policy changes and post the
            new effective date above.
          </p>

          <h2>Contact</h2>
          <p>
            <a href={`mailto:${siteConfig.company.email}`}>
              {siteConfig.company.email}
            </a>
          </p>
        </div>
      </div>
    </article>
  )
}
