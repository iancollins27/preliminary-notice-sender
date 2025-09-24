const fs = require('fs')
const path = require('path')

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim() // Remove leading/trailing spaces
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

function parseCSV(content) {
  const lines = content.split('\n').filter(line => line.trim())
  if (lines.length < 2) return []
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  const items = []
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''))
    const item = {}
    
    headers.forEach((header, index) => {
      if (values[index]) {
        item[header] = values[index]
      }
    })
    
    items.push(item)
  }
  
  return items
}

function main() {
  const csvPath = path.join(process.cwd(), 'content.csv')
  const jsonPath = path.join(process.cwd(), 'data', 'items.json')
  
  if (!fs.existsSync(csvPath)) {
    console.error('Error: content.csv not found in project root')
    process.exit(1)
  }
  
  try {
    const csvContent = fs.readFileSync(csvPath, 'utf8')
    const rawItems = parseCSV(csvContent)
    
    const processedItems = []
    const seenSlugs = new Set()
    
    for (const rawItem of rawItems) {
      if (!rawItem.title) {
        console.warn('Skipping item without title:', rawItem)
        continue
      }
      
      // Generate slug if missing
      const slug = rawItem.slug || slugify(rawItem.title)
      
      if (!slug) {
        console.warn('Could not generate slug for item:', rawItem)
        continue
      }
      
      // Check for duplicate slugs
      if (seenSlugs.has(slug)) {
        console.warn(`Duplicate slug "${slug}" - skipping duplicate`)
        continue
      }
      seenSlugs.add(slug)
      
      const item = {
        slug,
        title: rawItem.title,
        description: rawItem.description || '',
      }
      
      // Process tags
      if (rawItem.tags) {
        const tags = rawItem.tags
          .split(/[|,]/)
          .map(tag => tag.trim())
          .filter(tag => tag)
        if (tags.length > 0) {
          item.tags = tags
        }
      }
      
      // Add dates if present
      if (rawItem.datePublished) {
        item.datePublished = rawItem.datePublished
      }
      if (rawItem.dateModified) {
        item.dateModified = rawItem.dateModified
      }
      
      processedItems.push(item)
    }
    
    // Ensure data directory exists
    const dataDir = path.dirname(jsonPath)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    // Write JSON file
    fs.writeFileSync(jsonPath, JSON.stringify(processedItems, null, 2), 'utf8')
    
    console.log(`✅ Successfully imported ${processedItems.length} items to ${jsonPath}`)
    console.log(`📊 Found ${seenSlugs.size} unique slugs`)
    
  } catch (error) {
    console.error('Error importing CSV:', error.message)
    process.exit(1)
  }
}

main()