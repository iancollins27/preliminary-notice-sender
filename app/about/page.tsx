import { Metadata } from 'next'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn more about ${siteConfig.company.name} and our mission to help businesses grow through innovative SaaS solutions.`,
}

export default function AboutPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About {siteConfig.company.name}
            </h1>
            <p className="text-xl text-gray-600">
              Building the future of business automation, one tool at a time.
            </p>
          </div>

          {/* Story Section */}
          <div className="prose prose-lg max-w-none">
            <h2>Our Story</h2>
            <p>
              Founded with a vision to simplify complex business processes, we've been helping 
              companies of all sizes streamline their operations and accelerate growth. Our 
              team of experienced developers and business experts understand the challenges 
              modern businesses face.
            </p>

            <h2>Our Mission</h2>
            <p>
              We believe that powerful business tools shouldn't be complicated or expensive. 
              Our mission is to create intuitive, affordable solutions that help businesses 
              focus on what they do best while we handle the rest.
            </p>

            <h2>What We Do</h2>
            <p>
              We specialize in creating custom SaaS solutions, business automation tools, 
              and productivity applications. Each tool is designed with user experience 
              and business impact in mind, ensuring you get maximum value from day one.
            </p>

            <h2>Our Values</h2>
            <ul>
              <li><strong>Simplicity:</strong> Complex problems deserve elegant solutions</li>
              <li><strong>Quality:</strong> We build tools we'd want to use ourselves</li>
              <li><strong>Support:</strong> Your success is our success</li>
              <li><strong>Innovation:</strong> Always looking for better ways to solve problems</li>
            </ul>
          </div>

          {/* Team Section (placeholder) */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Meet the Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold">Your Name</h3>
                <p className="text-gray-600">Founder & CEO</p>
                <p className="text-sm text-gray-500 mt-2">
                  Passionate about building tools that make a difference.
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold">Team Member</h3>
                <p className="text-gray-600">Lead Developer</p>
                <p className="text-sm text-gray-500 mt-2">
                  Expert in building scalable, user-friendly applications.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 pt-16 border-t border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6">
              Let's discuss how our tools can help transform your business.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Contact Us Today
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}