import itemsData from '../data/items.json'

export interface Item {
  slug: string
  title: string
  description: string
  tags?: string[]
  datePublished?: string
  dateModified?: string
}

export async function getAllItems(): Promise<Item[]> {
  return itemsData
}

export async function getItemBySlug(slug: string): Promise<Item | undefined> {
  const items = await getAllItems()
  return items.find(item => item.slug === slug)
}

export async function getAllTags(): Promise<string[]> {
  const items = await getAllItems()
  const tags = new Set<string>()
  
  items.forEach(item => {
    if (item.tags) {
      item.tags.forEach(tag => tags.add(tag))
    }
  })
  
  return Array.from(tags).sort()
}

export async function getItemsByTag(tag: string): Promise<Item[]> {
  const items = await getAllItems()
  return items.filter(item => item.tags?.includes(tag))
}