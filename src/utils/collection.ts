import type { TagsType } from '@/types'
import { getCollection } from 'astro:content'
import _slugify from 'slugify'

export async function getBlogList() {
  const blogList = await getCollection('blogs')
  return blogList
}

export async function getProjectList() {
  const projectList = await getCollection('projects')
  return projectList
}

export function getTags(blogPostList: any[]): Record<string, number> {
  const tags: TagsType = {}

  blogPostList.forEach((post) => {
    post.data.tags && post.data.tags.forEach((tag: string) => {
      if (!tags[tag]) { tags[tag] = 0 }
      tags[tag]++
    })
  })

  return tags
}

export function slugify(text: string) {
  return _slugify(text, { lower: true })
}
