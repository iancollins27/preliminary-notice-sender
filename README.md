# Complete Website Boilerplate

A comprehensive Next.js 14 boilerplate for building complete business websites with SEO-friendly programmatic content, professional pages, and easy deployment.

## Features

### 🌐 Complete Website Foundation
- **Professional Homepage**: Business-focused hero, features, testimonials, and CTAs
- **Essential Pages**: About, Contact, Services, Privacy Policy, Terms of Service
- **Blog System**: Full markdown blog with SEO optimization
- **Navigation & Footer**: Professional site-wide navigation and footer

### 🔍 SEO & Performance
- **First-class SEO**: canonical URLs, OpenGraph, JSON-LD, sitemap, robots.txt
- **Programmatic Pages**: Generate pages from JSON data with automatic static generation
- **Tag System**: Automatic tag pages and filtering for content discovery
- **Dynamic OG Images**: Auto-generated social media images
- **Fast Loading**: Optimized for Core Web Vitals

### 📊 Content Management
- **JSON-based Content**: Simple data management for tools/products
- **Markdown Blog**: Write blog posts in markdown with frontmatter
- **CSV Import**: Bulk import content from CSV files
- **Quality Guardrails**: Built-in validation for slugs and metadata

### 🎨 Design & Templates  
- **Landing Page Components**: Reusable hero, features, testimonials, CTA sections
- **Responsive Design**: Mobile-first design that works on all devices
- **Professional Styling**: Clean, modern design suitable for any business
- **Easy Customization**: Simple configuration system for branding

### 🚀 Developer Experience
- **Next.js 14** with App Router and TypeScript
- **Easy Deployment**: Optimized for Vercel with one-click deployment
- **Component Library**: Reusable landing page components
- **Structured Data**: Proper schema markup for better search visibility

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view your site.

3. **Add content**
   - Edit `/data/items.json` directly, or
   - Create `content.csv` in the project root and run:
     ```bash
     npm run import:csv
     ```

4. **Build and test**
   ```bash
   npm run build
   npm start
   ```

## Content Management

### JSON Data Format

Items in `/data/items.json` follow this structure:

```json
{
  "slug": "unique-identifier",
  "title": "Item Title",
  "description": "Detailed description (minimum 40 characters)",
  "tags": ["tag1", "tag2"],
  "datePublished": "2024-01-15",
  "dateModified": "2024-08-20"
}
```

### CSV Import

Create `content.csv` in the project root with these columns:

```csv
slug,title,description,tags,datePublished,dateModified
my-tool,My Amazing Tool,"A comprehensive solution for...",productivity|business,2024-01-15,2024-08-20
```

- If `slug` is empty, it will be auto-generated from the title
- Tags can be separated by `|` or `,`
- All dates are optional

Run the import:
```bash
npm run import:csv
```

### Quality Checks

The build process includes automatic validation:

```bash
npm run check:slugs
```

This ensures:
- No duplicate slugs
- Slugs only contain `a-z`, `0-9`, and `-`
- Titles are at least 5 characters
- Descriptions are at least 40 characters

## Site Structure

- **Homepage** (`/`): Hero section + grid of all items
- **Directory** (`/site`): Simple list of all items
- **Item Pages** (`/{slug}`): Individual pages with full SEO metadata
- **Tag Pages** (`/tags/{tag}`): Lists items by tag
- **Sitemap** (`/sitemap.xml`): Auto-generated from all pages
- **Robots** (`/robots.txt`): SEO-friendly robots.txt

## SEO Features

### Metadata
Each item page includes:
- Canonical URLs
- OpenGraph tags (title, description, URL)
- JSON-LD structured data (SoftwareApplication schema)
- Proper title and description tags

### Schema Types
To switch the JSON-LD schema type (e.g., from `SoftwareApplication` to `Article`):

1. Open `app/(site)/[slug]/page.tsx`
2. Change the `@type` field in the `jsonLd` object:
   ```typescript
   const jsonLd = {
     '@context': 'https://schema.org',
     '@type': 'Article', // Change this
     // ... rest of fields
   }
   ```

Common schema types:
- `SoftwareApplication` (default)
- `Article`
- `Product`
- `Service`
- `WebPage`

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Import in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Set Environment Variables**
   - `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
   - `REVALIDATE_SECRET=your-secret-key` (optional, for ISR)

4. **Add Custom Domain**
   - In Vercel dashboard, go to Project Settings → Domains
   - Add your domain and follow DNS setup

5. **Redeploy**
   - Trigger a new deployment to apply environment variables

### Google Search Console

1. **Verify Domain**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add your domain and verify ownership

2. **Submit Sitemap**
   - Add sitemap URL: `https://yourdomain.com/sitemap.xml`

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes validation)
- `npm run start` - Start production server
- `npm run import:csv` - Import content from CSV
- `npm run check:slugs` - Validate slugs and metadata

### File Structure

```
├── app/
│   ├── (site)/
│   │   ├── [slug]/page.tsx    # Individual item pages
│   │   └── page.tsx           # Directory listing
│   ├── api/
│   │   ├── og/route.tsx       # Dynamic OG images
│   │   └── revalidate/route.ts # ISR endpoint
│   ├── tags/
│   │   └── [tag]/page.tsx     # Tag pages
│   ├── globals.css            # Minimal styling
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Homepage
│   ├── robots.ts              # Robots.txt
│   └── sitemap.ts             # Dynamic sitemap
├── data/
│   └── items.json             # Content data
├── lib/
│   └── data.ts                # Data utilities
├── public/
│   └── og.txt                 # OG placeholder
└── scripts/
    ├── check-slugs.js         # Validation script
    └── import-csv.js          # CSV import script
```

### Customization

#### Styling
Edit `app/globals.css` for custom styles. The boilerplate uses minimal CSS for easy customization.

#### Homepage
Modify `app/page.tsx` to update the hero section and layout.

#### SEO Metadata
Update default metadata in `app/layout.tsx` and individual page components.

## API Routes

### Dynamic OG Images
`/api/og?title=Your+Title&site=Your+Site`

Generates social media images with custom text.

### Revalidation
`POST /api/revalidate?secret=your-secret`

Placeholder for Incremental Static Regeneration. Add your revalidation logic:

```typescript
await revalidateTag('items')
await revalidatePath('/site')
```

## Tips for Scaling

1. **Keep content quality high** - The validation scripts help maintain standards
2. **Use tags strategically** - They create additional landing pages for SEO
3. **Monitor Core Web Vitals** - The minimal CSS and static generation help performance
4. **Add analytics** - Include your preferred analytics in `app/layout.tsx`
5. **Consider image optimization** - Add a proper OG image to `/public/og.png`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `npm run build`
5. Submit a pull request

## License

MIT License - feel free to use this boilerplate for your projects!