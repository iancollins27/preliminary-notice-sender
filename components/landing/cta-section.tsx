import Link from 'next/link'

interface CTASectionProps {
  title: string
  subtitle?: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundColor?: 'blue' | 'gray' | 'white'
}

export function CTASection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundColor = 'blue'
}: CTASectionProps) {
  const bgClasses = {
    blue: 'bg-blue-600',
    gray: 'bg-gray-900',
    white: 'bg-white border border-gray-200'
  }

  const textClasses = {
    blue: 'text-white',
    gray: 'text-white',
    white: 'text-gray-900'
  }

  const subtitleClasses = {
    blue: 'text-blue-100',
    gray: 'text-gray-300',
    white: 'text-gray-600'
  }

  return (
    <section className={`py-16 lg:py-24 ${bgClasses[backgroundColor]}`}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${textClasses[backgroundColor]}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-xl mb-8 ${subtitleClasses[backgroundColor]}`}>
              {subtitle}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ctaLink}
              className={`inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg transition-colors ${
                backgroundColor === 'white'
                  ? 'text-white bg-blue-600 hover:bg-blue-700'
                  : 'text-gray-900 bg-white hover:bg-gray-100'
              }`}
            >
              {ctaText}
            </Link>
            
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                href={secondaryCtaLink}
                className={`inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 transition-colors ${
                  backgroundColor === 'white'
                    ? 'text-gray-700 border-gray-300 hover:bg-gray-50'
                    : 'text-white border-white hover:bg-white hover:text-gray-900'
                }`}
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}