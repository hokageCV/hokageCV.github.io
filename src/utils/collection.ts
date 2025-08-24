import type { TagsType } from '@/types'
import { getCollection } from 'astro:content'
import _slugify from 'slugify'

export async function getBlogList() {
  const blogList = await getCollection('blogs')
  return blogList
    .filter(post => post.data.draft !== true)
    .sort((a, b) => new Date(b.data.publishedDate).valueOf() - new Date(a.data.publishedDate).valueOf())
}

export async function getProjectList() {
  const projectList = await getCollection('projects')

  projectList.sort((a, b) => {
    if (a.data.order < b.data.order) return -1;
    if (a.data.order > b.data.order) return 1;
    return 0;
  });

  return projectList
}

export async function getSnippetList() {
  const  snippetList = await getCollection('snippets')

  return snippetList
    .sort((a, b) => new Date(b.data.publishedDate).valueOf() - new Date(a.data.publishedDate).valueOf())
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

export async function similarPosts(tag: string, excludingTitle: string = '') {
  const blogPostList = await getBlogList()
  let similarPosts = blogPostList.filter((post) => post.data.tags?.includes(tag))

  if (excludingTitle !== '') return similarPosts = similarPosts.filter(post => post.data.title !== excludingTitle)

  return similarPosts
}

export async function processedSimilarPosts(tags: string[], excludingTitle: string = '') {
  const MINIMUM_NUMBER_OF_SIMILAR_POSTS = 3
  const MAX_NUMBER_OF_SIMILAR_POSTS = 6
  let otherPosts: any[] = []

  // get posts of all tags
  for (const tag of tags) {
    const blogPostList = await similarPosts(tag, excludingTitle)
    otherPosts = [...otherPosts, ...blogPostList]
  }
  otherPosts = removeDuplicatePosts(otherPosts)

  if (otherPosts.length > MAX_NUMBER_OF_SIMILAR_POSTS) otherPosts.splice(MAX_NUMBER_OF_SIMILAR_POSTS);
  if (otherPosts.length >= MINIMUM_NUMBER_OF_SIMILAR_POSTS) return otherPosts

  const remainingPostsToFill = Math.abs(otherPosts.length - MINIMUM_NUMBER_OF_SIMILAR_POSTS)

  let additionalPosts = await getBlogList()
  additionalPosts = additionalPosts.filter(post => {
    if (post.data.title === excludingTitle) return false

    const postExistsInOtherPosts = otherPosts.some(otherPost => otherPost.data.slug === post.data.slug);
    return !postExistsInOtherPosts;

  })
  additionalPosts.splice(remainingPostsToFill)

  const combinedPosts = [...otherPosts, ...additionalPosts]
  return combinedPosts
}

function removeDuplicatePosts(posts: any[]) {
  const titleMap = new Map<string, any>()

  for (const post of posts) {
    const postTitle = post.data.title
    if (!titleMap.has(postTitle)) {
      titleMap.set(postTitle, post)
    }
  }

  const uniquePosts = Array.from(titleMap.values())
  return uniquePosts
}
