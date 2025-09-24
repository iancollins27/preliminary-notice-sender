import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Discover our comprehensive range of SaaS solutions and services designed to streamline your business operations and drive growth.',
}

const services = [
  {
    title: 'Custom SaaS Development',
    description: 'Build tailored software solutions that perfectly fit your business needs and scale with your growth.',
    features: [
      'Requirements analysis and planning',
      'User experience design',
      'Full-stack development',
      'Quality assurance and testing',
      'Deployment and maintenance',
    ],
    icon: '🛠️',
  },
  {
    title: 'Business Process Automation',
    description: 'Streamline repetitive tasks and workflows to improve efficiency and reduce manual errors.',
    features: [
      'Workflow analysis and optimization',
      'Custom automation tools',
      'Integration with existing systems',
      'Performance monitoring',
      'Staff training and support',
    ],
    icon: '⚡',
  },
  {
    title: 'Data Analytics & Reporting',
    description: 'Transform your data into actionable insights with custom dashboards and reporting solutions.',
    features: [
      'Data visualization dashboards',
      'Automated reporting systems',
      'Business intelligence tools',
      'Performance metrics tracking',
      'Data integration and cleaning',
    ],
    icon: '📊',
  },
  {
    title: 'API Development & Integration',
    description: 'Connect your systems and enable seamless data flow between different platforms and services.',
    features: [
      'RESTful API development',
      'Third-party integrations',
      'Database optimization',
      'Security implementation',
      'Documentation and testing',
    ],
    icon: '🔗',
  },
]

const benefits = [
  {
    title: 'Faster Time to Market',
    description: 'Launch your solutions quickly with our proven development processes and experienced team.',
    icon: '🚀',
  },
  {
    title: 'Scalable Architecture',
    description: 'Build on solid foundations that can handle growth from startup to enterprise scale.',
    icon: '📈',
  },
  {
    title: 'Ongoing Support',
    description: 'Get continuous support and maintenance to keep your systems running smoothly.',
    icon: '🛡️',
  },
  {
    title: 'Cost-Effective Solutions',
    description: 'Maximize ROI with efficient development and smart technology choices.',
    icon: '💰',
  },
]

export default function ServicesPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We help businesses build, optimize, and scale their operations with 
            custom SaaS solutions and automation tools.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Our Services?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Discovery</h3>
              <p className="text-gray-600">
                We start by understanding your business needs, challenges, and goals through detailed consultation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Design & Planning</h3>
              <p className="text-gray-600">
                Our team creates detailed plans, wireframes, and technical specifications for your solution.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Build & Launch</h3>
              <p className="text-gray-600">
                We develop, test, and deploy your solution with ongoing support and optimization.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-50 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how our services can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Get Started Today
            </Link>
            <Link
              href="/site"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View Our Tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}