import { Metadata } from 'next'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Read the terms and conditions for using ${siteConfig.company.name} services. Understand your rights and responsibilities.`,
}

export default function TermsPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-lg mb-8">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <p>
              Welcome to {siteConfig.company.name}. These Terms of Service ("Terms") govern your use of our website, 
              products, and services. By using our services, you agree to be bound by these Terms.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound 
              by these Terms and our Privacy Policy. If you do not agree, please do not use our services.
            </p>

            <h2>2. Description of Services</h2>
            <p>
              {siteConfig.company.name} provides software-as-a-service (SaaS) solutions, business tools, 
              and related services designed to help businesses improve their operations and productivity.
            </p>

            <h2>3. User Accounts</h2>
            <h3>Account Creation</h3>
            <ul>
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You must be at least 18 years old to create an account</li>
              <li>One person or entity may not maintain multiple accounts</li>
            </ul>

            <h3>Account Responsibilities</h3>
            <ul>
              <li>You are responsible for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Keep your account information up to date</li>
            </ul>

            <h2>4. Acceptable Use Policy</h2>
            <p>You agree not to use our services to:</p>
            <ul>
              <li>Violate any laws, regulations, or third-party rights</li>
              <li>Upload or transmit malicious code, viruses, or harmful content</li>
              <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
              <li>Interfere with or disrupt our services or servers</li>
              <li>Use our services for illegal activities or fraud</li>
              <li>Harass, abuse, or spam other users</li>
              <li>Reverse engineer or attempt to extract source code</li>
            </ul>

            <h2>5. Payment Terms</h2>
            <h3>Subscription Fees</h3>
            <ul>
              <li>Fees are charged in advance on a recurring basis (monthly or annually)</li>
              <li>All fees are non-refundable unless otherwise stated</li>
              <li>We may change our fees with 30 days' advance notice</li>
              <li>Failed payments may result in service suspension</li>
            </ul>

            <h3>Free Trials</h3>
            <ul>
              <li>Free trials are limited to one per customer</li>
              <li>We may require payment information for free trials</li>
              <li>Trials automatically convert to paid subscriptions unless canceled</li>
            </ul>

            <h2>6. Data and Privacy</h2>
            <ul>
              <li>You retain ownership of your data and content</li>
              <li>We may access your data to provide support or prevent abuse</li>
              <li>Our Privacy Policy governs how we collect and use your information</li>
              <li>You are responsible for backing up your important data</li>
            </ul>

            <h2>7. Service Availability</h2>
            <ul>
              <li>We strive for high availability but cannot guarantee 100% uptime</li>
              <li>We may perform maintenance that temporarily affects service availability</li>
              <li>We are not liable for service interruptions beyond our reasonable control</li>
            </ul>

            <h2>8. Intellectual Property</h2>
            <h3>Our Rights</h3>
            <ul>
              <li>We own all rights to our services, software, and related materials</li>
              <li>Our trademarks and brand elements are protected intellectual property</li>
              <li>You may not copy, modify, or distribute our proprietary content</li>
            </ul>

            <h3>Your Rights</h3>
            <ul>
              <li>You retain rights to content you create using our services</li>
              <li>You grant us a license to host and process your content as needed</li>
              <li>You represent that you have rights to all content you upload</li>
            </ul>

            <h2>9. Termination</h2>
            <h3>By You</h3>
            <ul>
              <li>You may cancel your account at any time through your account settings</li>
              <li>Cancellation takes effect at the end of your current billing period</li>
              <li>You remain responsible for charges incurred before cancellation</li>
            </ul>

            <h3>By Us</h3>
            <ul>
              <li>We may suspend or terminate accounts that violate these Terms</li>
              <li>We may discontinue services with reasonable advance notice</li>
              <li>We may terminate accounts for non-payment</li>
            </ul>

            <h2>10. Disclaimers and Limitations</h2>
            <h3>Service Disclaimers</h3>
            <p>
              Our services are provided "as is" without warranties of any kind. We disclaim all warranties, 
              express or implied, including warranties of merchantability and fitness for a particular purpose.
            </p>

            <h3>Limitation of Liability</h3>
            <p>
              To the maximum extent permitted by law, our liability is limited to the amount you paid us 
              in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.
            </p>

            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from 
              your use of our services or violation of these Terms.
            </p>

            <h2>12. Dispute Resolution</h2>
            <ul>
              <li>These Terms are governed by the laws of [Your State/Country]</li>
              <li>Disputes will be resolved through binding arbitration when possible</li>
              <li>You waive your right to participate in class action lawsuits</li>
            </ul>

            <h2>13. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you of significant changes by 
              email or through our service. Continued use after changes indicates acceptance of new Terms.
            </p>

            <h2>14. General Provisions</h2>
            <ul>
              <li>If any provision is found unenforceable, the rest of the Terms remain in effect</li>
              <li>Our failure to enforce any provision does not waive our right to enforce it later</li>
              <li>These Terms constitute the entire agreement between you and us</li>
            </ul>

            <h2>Contact Information</h2>
            <p>
              If you have questions about these Terms, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href={`mailto:${siteConfig.company.email}`}>{siteConfig.company.email}</a></li>
              {siteConfig.company.address && (
                <li><strong>Address:</strong> {siteConfig.company.address}</li>
              )}
            </ul>

            <p className="text-sm text-gray-500 mt-8">
              <em>
                This is a template terms of service. Please consult with a lawyer to ensure these terms 
                are appropriate for your specific business and jurisdiction.
              </em>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}