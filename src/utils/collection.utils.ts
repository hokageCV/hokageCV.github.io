import { getCollection } from 'astro:content'

export async function getBlogList() {
  const blogList = await getCollection('blogs')
  return blogList
}
