import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { siteConfig } from '@/lib/config'
import { renderMarkdown } from '@/lib/markdown'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const canonical = `${siteUrl}/blog/${post.slug}`
  
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: post.author ? {
      '@type': 'Person',
      name: post.author,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.company.name,
    },
    url: `${siteUrl}/blog/${post.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span className="mx-2">•</span>
                <span>{post.readingTime}</span>
                {post.author && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              
              {post.description && (
                <p className="text-xl text-gray-600 mb-6">
                  {post.description}
                </p>
              )}
              
              {post.tags && post.tags.length > 0 && (
                <div>
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag mr-2">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
              />
            </div>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <Link 
                  href="/blog"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ← Back to Blog
                </Link>
                
                <div className="text-sm text-gray-500">
                  Share this post on{' '}
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${siteUrl}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  )
}