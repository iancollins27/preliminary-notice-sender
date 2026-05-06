import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">

      {/* Main navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container">
          <nav className="flex items-center justify-between py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              {siteConfig.name}
            </Link>
            
            {/* Desktop Navigation */}
            <div className="flex items-center space-x-8">
              <Link href="/setup" className="nav-link">
                Setup
              </Link>
              <Link href="/llms-full.txt" className="nav-link">
                Docs
              </Link>
              <Link href="/openapi.json" className="nav-link">
                API
              </Link>
              <Link href="/site" className="nav-link">
                Recipes
              </Link>
              <Link href="/blog" className="nav-link">
                Blog
              </Link>
              <Link href="/about" className="nav-link">
                About
              </Link>
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <Link
                href="/setup"
                className="cta-button"
              >
                Wire it in
              </Link>
              
              {/* Mobile menu button */}
              <button id="mobile-menu-toggle" className="md:hidden p-2 text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>

          {/* Mobile Navigation Menu */}
          <div id="mobile-menu" className="md:hidden hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-1">
              <Link href="/setup" className="mobile-nav-link">
                Setup
              </Link>
              <Link href="/llms-full.txt" className="mobile-nav-link">
                Docs
              </Link>
              <Link href="/openapi.json" className="mobile-nav-link">
                API
              </Link>
              <Link href="/site" className="mobile-nav-link">
                Recipes
              </Link>
              <Link href="/blog" className="mobile-nav-link">
                Blog
              </Link>
              <Link href="/about" className="mobile-nav-link">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}