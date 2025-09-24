import Link from 'next/link'
import { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest insights, tutorials, and updates from our team. Stay up to date with industry trends and best practices.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-600">
              Insights, tutorials, and updates from our team
            </p>
          </div>

          {/* Posts */}
          {posts.length > 0 ? (
            <div className="space-y-12">
              {posts.map((post) => (
                <article key={post.slug} className="border-b border-gray-200 pb-12">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
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
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 mb-4">
                    {post.description}
                  </p>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tag mr-2">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600">
                Check back soon for our latest insights and tutorials.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}