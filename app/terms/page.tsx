import type { Metadata } from 'next'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms governing use of ${siteConfig.name}, including acceptable mail content, payment, and liability.`,
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <article className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Terms of Service
          </h1>
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
            By using {siteConfig.name} you agree to these terms. They&apos;re
            written to be short and unambiguous. If anything is unclear, email{' '}
            <a href={`mailto:${siteConfig.company.email}`}>
              {siteConfig.company.email}
            </a>{' '}
            and we&apos;ll clarify before you continue.
          </p>

          <h2>1. The service</h2>
          <p>
            {siteConfig.name} is an MCP server and HTTP API that prints and
            mails physical letters and postcards via USPS on your behalf. You
            (or an AI agent acting under your account) compose the content;
            we handle production and delivery.
          </p>

          <h2>2. Your account</h2>
          <ul>
            <li>You must be 18 or older to use the service.</li>
            <li>
              You are responsible for everything sent through your account,
              including everything sent by AI agents you authorize.
            </li>
            <li>
              Keep your API keys secret. If a key leaks, rotate it
              immediately.
            </li>
          </ul>

          <h2>3. Acceptable content</h2>
          <p>You may not use the service to send mail that:</p>
          <ul>
            <li>
              Threatens, harasses, defames, or impersonates another person.
            </li>
            <li>
              Violates US federal, state, or postal law (this includes but
              isn&apos;t limited to USPS Domestic Mail Manual rules on
              non-mailable matter).
            </li>
            <li>
              Contains content that infringes someone else&apos;s
              intellectual property.
            </li>
            <li>
              Promotes fraud, illegal goods, or misleading commercial offers.
            </li>
            <li>
              Targets recipients for unsolicited bulk mail without lawful
              basis.
            </li>
          </ul>
          <p>
            We run automated moderation on every piece before printing. We
            reserve the right to refuse or hold any piece that appears to
            violate this policy and to suspend accounts that abuse the
            service.
          </p>

          <h2>4. Payment</h2>
          <ul>
            <li>
              The sandbox is free. Production mail is pay-per-piece, charged
              when the piece is accepted for printing.
            </li>
            <li>
              We may change prices with 30 days&apos; notice. Existing queued
              mail is not affected by the change.
            </li>
            <li>
              Payments are processed by a third-party processor and are
              non-refundable once a piece has been printed.
            </li>
          </ul>

          <h2>5. Delivery</h2>
          <p>
            Once a piece is handed to USPS, delivery is governed by USPS.
            We&apos;ll surface tracking events when available, but
            we&apos;re not liable for delays or losses caused by the carrier.
          </p>

          <h2>6. Your content</h2>
          <p>
            You retain ownership of everything you send. You grant us a
            limited license to print, fold, address, and post each piece —
            and to retain the contents for 90 days for support and audit per
            the{' '}
            <a href="/privacy">privacy policy</a>.
          </p>

          <h2>7. Service availability</h2>
          <p>
            We aim for high availability but make no uptime guarantee. We
            may perform maintenance that temporarily affects the service.
          </p>

          <h2>8. Liability</h2>
          <p>
            The service is provided &ldquo;as is.&rdquo; Our maximum
            aggregate liability for any claim is the amount you paid us in
            the 12 months before the claim. We aren&apos;t liable for
            indirect, incidental, or consequential damages.
          </p>

          <h2>9. Termination</h2>
          <p>
            You can close your account any time. We can suspend or terminate
            accounts that violate these terms, with or without notice
            depending on severity.
          </p>

          <h2>10. Changes</h2>
          <p>
            We&apos;ll update this page when these terms change. Continuing
            to use the service after a change means you accept the new
            terms.
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
