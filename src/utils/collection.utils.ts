import { getCollection } from 'astro:content'

export async function getBlogList() {
  const blogList = await getCollection('blogs')
  return blogList
}

export async function getProjectList() {
  const projectList = await getCollection('projects')
  return projectList
}
