import { Metadata } from 'next'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Learn how ${siteConfig.company.name} collects, uses, and protects your personal information. Our commitment to your privacy.`,
}

export default function PrivacyPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-lg mb-8">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <p>
              At {siteConfig.company.name}, we respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you use our website and services.
            </p>

            <h2>Information We Collect</h2>
            
            <h3>Information You Provide</h3>
            <ul>
              <li><strong>Contact Information:</strong> Name, email address, phone number, company name</li>
              <li><strong>Account Information:</strong> Username, password, billing information</li>
              <li><strong>Communication Data:</strong> Messages, feedback, and support requests</li>
              <li><strong>Business Information:</strong> Company details, project requirements, preferences</li>
            </ul>

            <h3>Information We Collect Automatically</h3>
            <ul>
              <li><strong>Usage Data:</strong> Pages visited, time spent, click patterns</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
              <li><strong>Cookies and Tracking:</strong> Session data, preferences, analytics</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use your personal information to:</p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Process your requests and transactions</li>
              <li>Communicate with you about our services</li>
              <li>Send you updates, newsletters, and marketing materials (with consent)</li>
              <li>Analyze usage patterns and improve user experience</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Information Sharing and Disclosure</h2>
            <p>We may share your information in the following circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> Trusted third parties who help us operate our business</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to sharing</li>
            </ul>
            
            <p><strong>We do not sell your personal information to third parties.</strong></p>

            <h2>Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information:</p>
            <ul>
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Limited access to personal information</li>
              <li>Employee training on data protection</li>
              <li>Secure hosting and infrastructure</li>
            </ul>

            <h2>Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request copies of your personal information</li>
              <li><strong>Update:</strong> Correct or update your information</li>
              <li><strong>Delete:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Portability:</strong> Request transfer of your data</li>
              <li><strong>Object:</strong> Object to certain processing activities</li>
            </ul>

            <h2>Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul>
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Provide personalized content and ads</li>
              <li>Improve website functionality</li>
            </ul>
            <p>
              You can control cookies through your browser settings, but some features may not work properly if cookies are disabled.
            </p>

            <h2>Third-Party Services</h2>
            <p>Our website may contain links to third-party services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.</p>

            <h2>Data Retention</h2>
            <p>We retain your personal information only as long as necessary to:</p>
            <ul>
              <li>Provide our services to you</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Meet legitimate business purposes</li>
            </ul>

            <h2>International Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If we become aware of such collection, we will take steps to delete it.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any significant changes 
              by posting the new policy on our website and updating the effective date.
            </p>

            <h2>Contact Us</h2>
            <p>If you have questions about this privacy policy or our data practices, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> <a href={`mailto:${siteConfig.company.email}`}>{siteConfig.company.email}</a></li>
              {siteConfig.company.address && (
                <li><strong>Address:</strong> {siteConfig.company.address}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}