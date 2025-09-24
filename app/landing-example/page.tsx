import { Metadata } from 'next'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesGrid } from '@/components/landing/features-grid'
import { Testimonials } from '@/components/landing/testimonials'
import { CTASection } from '@/components/landing/cta-section'

export const metadata: Metadata = {
  title: 'Landing Page Example',
  description: 'A sample landing page showing how to use the landing page components for your marketing campaigns.',
}

const features = [
  {
    title: 'Easy Setup',
    description: 'Get started in minutes with our intuitive setup process and comprehensive documentation.',
    icon: '⚡',
  },
  {
    title: 'Powerful Analytics',
    description: 'Track performance with detailed analytics and insights to optimize your results.',
    icon: '📊',
  },
  {
    title: '24/7 Support',
    description: 'Get help when you need it with our dedicated support team available around the clock.',
    icon: '🛠️',
  },
  {
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security and 99.9% uptime ensure your data is safe and accessible.',
    icon: '🔒',
  },
  {
    title: 'Team Collaboration',
    description: 'Work together seamlessly with built-in collaboration tools and real-time updates.',
    icon: '👥',
  },
  {
    title: 'API Integration',
    description: 'Connect with your existing tools through our robust API and integration platform.',
    icon: '🔗',
  },
]

const testimonials = [
  {
    content: 'This platform has completely transformed how we manage our business processes. The automation features alone have saved us 20+ hours per week.',
    author: 'Sarah Johnson',
    title: 'Operations Manager',
    company: 'TechCorp Inc.',
  },
  {
    content: 'The analytics and reporting capabilities are incredible. We now have insights we never had before, which has helped us make much better decisions.',
    author: 'Michael Chen',
    title: 'CEO',
    company: 'StartupXYZ',
  },
  {
    content: 'Customer support is outstanding. Every question is answered quickly and thoroughly. It feels like they genuinely care about our success.',
    author: 'Emily Rodriguez',
    title: 'Marketing Director',
    company: 'GrowthLab',
  },
]

export default function LandingExamplePage() {
  return (
    <>
      <HeroSection
        title="Transform Your Business with Smart Automation"
        subtitle="Streamline operations, boost productivity, and scale faster with our all-in-one business automation platform."
        ctaText="Start Free Trial"
        ctaLink="/contact"
        secondaryCtaText="Watch Demo"
        secondaryCtaLink="/services"
      />

      <FeaturesGrid
        title="Everything You Need to Succeed"
        subtitle="Powerful features designed to help your business grow and thrive in today's competitive market."
        features={features}
        columns={3}
      />

      <Testimonials
        title="Loved by Thousands of Businesses"
        subtitle="Don't just take our word for it - see what our customers have to say about their experience."
        testimonials={testimonials}
      />

      <CTASection
        title="Ready to Transform Your Business?"
        subtitle="Join thousands of companies that trust us to automate their success."
        ctaText="Get Started Now"
        ctaLink="/contact"
        secondaryCtaText="View Pricing"
        secondaryCtaLink="/services"
        backgroundColor="blue"
      />
    </>
  )
}