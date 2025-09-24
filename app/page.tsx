import Link from 'next/link'
import { getAllItems } from '@/lib/data'
import { getAllPosts } from '@/lib/blog'
import { siteConfig } from '@/lib/config'

export default async function HomePage() {
  const items = await getAllItems()
  const posts = await getAllPosts()
  const recentPosts = posts.slice(0, 3)

  const stats = [
    { label: 'Tools Available', value: items.length.toString() },
    { label: 'Blog Posts', value: posts.length.toString() },
    { label: 'Happy Clients', value: '100+' },
    { label: 'Success Rate', value: '99%' },
  ]

  const features = [
    {
      title: 'Custom Solutions',
      description: 'Tailored SaaS tools built specifically for your business needs and workflow.',
      icon: '🛠️',
    },
    {
      title: 'Proven Results',
      description: 'Our tools have helped hundreds of businesses streamline operations and grow.',
      icon: '📈',
    },
    {
      title: 'Expert Support',
      description: '24/7 support from our experienced team to ensure your success.',
      icon: '🎯',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Transform Your Business with Smart SaaS Solutions
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              We build custom software tools that automate your processes, boost productivity, 
              and help your business scale faster than ever before.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-100 transition-colors"
              >
                Get Started Today
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-colors"
              >
                View Our Services
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose {siteConfig.name}?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with deep business expertise to deliver 
              solutions that actually work for your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Latest Tools & Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our collection of business tools designed to solve real problems 
              and drive measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {items.slice(0, 4).map((item) => (
              <Link key={item.slug} href={`/${item.slug}`} className="card bg-white">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                {item.tags && (
                  <div>
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag mr-2">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/site"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 border-blue-600"
            >
              View All Tools →
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {recentPosts.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Latest Insights
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stay up to date with industry trends, best practices, and expert insights 
                from our team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {recentPosts.map((post) => (
                <article key={post.slug} className="card">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{post.description}</p>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-blue-600 hover:text-blue-700"
              >
                View All Posts →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-blue-600">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of companies that trust us to build their success. 
              Let's discuss your project today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-100 transition-colors"
              >
                Start Your Project
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}