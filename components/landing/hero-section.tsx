import Link from 'next/link'

interface HeroSectionProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: string
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage
}: HeroSectionProps) {
  return (
    <section className="relative py-20 lg:py-32">
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-gray-900"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      )}
      
      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
            backgroundImage ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h1>
          <p className={`text-xl lg:text-2xl mb-8 ${
            backgroundImage ? 'text-gray-200' : 'text-gray-600'
          }`}>
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              {ctaText}
            </Link>
            
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                href={secondaryCtaLink}
                className={`inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 transition-colors ${
                  backgroundImage
                    ? 'text-white border-white hover:bg-white hover:text-gray-900'
                    : 'text-gray-700 border-gray-300 hover:bg-gray-50'
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