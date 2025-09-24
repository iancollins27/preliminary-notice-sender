const fs = require('fs')
const path = require('path')

function main() {
  const jsonPath = path.join(process.cwd(), 'data', 'items.json')
  
  if (!fs.existsSync(jsonPath)) {
    console.error('Error: data/items.json not found')
    process.exit(1)
  }
  
  try {
    const content = fs.readFileSync(jsonPath, 'utf8')
    const items = JSON.parse(content)
    
    if (!Array.isArray(items)) {
      console.error('Error: items.json should contain an array')
      process.exit(1)
    }
    
    const seenSlugs = new Set()
    const errors = []
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const itemRef = `Item ${i + 1} (${item.slug || 'no slug'})`
      
      // Check for required fields
      if (!item.slug) {
        errors.push(`${itemRef}: Missing slug`)
        continue
      }
      
      if (!item.title) {
        errors.push(`${itemRef}: Missing title`)
        continue
      }
      
      // Validate slug format
      if (!/^[a-z0-9-]+$/.test(item.slug)) {
        errors.push(`${itemRef}: Slug "${item.slug}" contains invalid characters (only a-z, 0-9, - allowed)`)
      }
      
      // Check for duplicate slugs
      if (seenSlugs.has(item.slug)) {
        errors.push(`${itemRef}: Duplicate slug "${item.slug}"`)
      } else {
        seenSlugs.add(item.slug)
      }
      
      // Validate title length
      if (item.title.length < 5) {
        errors.push(`${itemRef}: Title too short (${item.title.length} chars, minimum 5)`)
      }
      
      // Validate description
      if (!item.description) {
        errors.push(`${itemRef}: Missing description`)
      } else if (item.description.length < 40) {
        errors.push(`${itemRef}: Description too short (${item.description.length} chars, minimum 40)`)
      }
    }
    
    if (errors.length > 0) {
      console.error('❌ Validation failed:')
      errors.forEach(error => console.error(`  • ${error}`))
      process.exit(1)
    }
    
    console.log('✅ Slug + metadata checks passed')
    console.log(`📊 Validated ${items.length} items with ${seenSlugs.size} unique slugs`)
    
  } catch (error) {
    console.error('Error reading/parsing items.json:', error.message)
    process.exit(1)
  }
}

main()