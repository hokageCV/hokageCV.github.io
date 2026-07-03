import { archived_project_order, featured_project_order, project_order } from '@/data/projects'
import type { TagsType } from '@/types'
import { getCollection } from 'astro:content'
import _slugify from 'slugify'

export async function getBlogList() {
  const blog_list = await getCollection('blogs')

  return blog_list
    .sort((a, b) => new Date(b.data.published_date).valueOf() - new Date(a.data.published_date).valueOf())
}

export async function getProjectList({ archived = false, all = false }: { archived?: boolean, all?: boolean } = {}) {
  const project_list = await getCollection('projects')

  let order_list: string[];
  if (all) {
    order_list = [...project_order, ...archived_project_order];
  } else {
    order_list = archived ? archived_project_order : project_order;
  }
  const order_set = new Set(order_list)

  const filtered_projects = project_list
    .filter((proj) => order_set.has(proj.id))
    .sort((a, b) => order_list.indexOf(a.id) - order_list.indexOf(b.id))

  return filtered_projects
}

export async function getFeaturedProjects() {
  const project_list = await getCollection('projects')
  const orderd_set = new Set(featured_project_order)

  return project_list
    .filter((proj) => orderd_set.has(proj.id))
    .sort((a, b) => featured_project_order.indexOf(a.id) - featured_project_order.indexOf(b.id))
}

export async function getSnippetList() {
  const snippet_list = await getCollection('snippets')

  return snippet_list
    .sort((a, b) => new Date(b.data.published_date).valueOf() - new Date(a.data.published_date).valueOf())
}

export async function getDraftList() {
  const draft_list = await getCollection('drafts')

  return draft_list
    .sort((a, b) => new Date(b.data.published_date).valueOf() - new Date(a.data.published_date).valueOf())
}

export async function getTilList() {
  const til_list = await getCollection('til')

  return til_list
    .filter(post => post.data.draft !== true)
    .sort((a, b) => new Date(b.data.published_date).valueOf() - new Date(a.data.published_date).valueOf())
}

export async function getTilIndexList() {
  const til_entries = await getCollection('til', ({ data }) => data.draft !== true)
  const blog_entries = await getCollection('blogs', ({ data }) => data.also_in_til === true)

  return [...til_entries, ...blog_entries]
    .sort((a, b) => new Date(b.data.published_date).valueOf() - new Date(a.data.published_date).valueOf())
}

export function getTags(blog_post_list: any[]): Record<string, number> {
  const tags: TagsType = {}

  blog_post_list.forEach((post) => {
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

export async function similarPosts(tag: string, excluding_title: string = '') {
  const blog_post_list = await getBlogList()
  let similar_posts = blog_post_list.filter((post) => post.data.tags?.includes(tag))

  if (excluding_title !== '') return similar_posts = similar_posts.filter(post => post.data.title !== excluding_title)

  return similar_posts
}

export async function processedSimilarPosts(tags: string[], excluding_title: string = '') {
  const MINIMUM_NUMBER_OF_SIMILAR_POSTS = 3
  const MAX_NUMBER_OF_SIMILAR_POSTS = 6
  let other_posts: any[] = []

  // get posts of all tags
  for (const tag of tags) {
    const blog_post_list = await similarPosts(tag, excluding_title)
    other_posts = [...other_posts, ...blog_post_list]
  }
  other_posts = removeDuplicatePosts(other_posts)

  if (other_posts.length > MAX_NUMBER_OF_SIMILAR_POSTS) other_posts.splice(MAX_NUMBER_OF_SIMILAR_POSTS);
  if (other_posts.length >= MINIMUM_NUMBER_OF_SIMILAR_POSTS) return other_posts

  const remaining_posts_to_fill = Math.abs(other_posts.length - MINIMUM_NUMBER_OF_SIMILAR_POSTS)

  let additional_posts = await getBlogList()
  additional_posts = additional_posts.filter(post => {
    if (post.data.title === excluding_title) return false

    const post_exists_in_other_posts = other_posts.some(otherPost => otherPost.id === post.id);
    return !post_exists_in_other_posts;

  })
  additional_posts.splice(remaining_posts_to_fill)

  const combined_posts = [...other_posts, ...additional_posts]
  return combined_posts
}

function removeDuplicatePosts(posts: any[]) {
  const title_map = new Map<string, any>()

  for (const post of posts) {
    const post_title = post.data.title
    if (!title_map.has(post_title)) {
      title_map.set(post_title, post)
    }
  }

  const unique_posts = Array.from(title_map.values())
  return unique_posts
}
