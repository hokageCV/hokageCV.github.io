---
title: Improve blog reading by adding 'Other Posts' section in Astro blog
slug:  adding-other-posts-in-astro-blog
publishedDate: 2024-04-21
description: How to add 'other posts'/'similar posts' to your astro blog
draft: false
tags: ['astro']
---

In this post, I will walk you through how I added 'Other Posts you may like' section in astro blog. Initially I wanted to have a 'similar posts' section, which would display posts which have same tags.

## But why to have similar posts section?
While visting several blogs, I observed that I am reading more posts if there's a list below compared to me going to all posts page and then reading them. Hence I thought to add one to my blog as well.

## Iteration 1

First I added one function which gets all posts, filters them based on tag and then removes the post which we are already viewing.

```ts
export async function similarPosts(tag: string, excludingTitle: string = '') {
  // get all posts
  const blogPostList = await getBlogList()

  // filter posts based on tag
  let similarPosts = blogPostList.filter((post) => post.data.tags?.includes(tag))

  // remove post based on title
  if (excludingTitle !== '') return similarPosts = similarPosts.filter(post => post.data.title !== excludingTitle)

  return similarPosts
}
```

But it was looking incomplete. Some posts would have similar posts but many didn't had any. So I changed the plan from 'similar posts' to 'other posts you may like'.

With that, if there are less or no similar posts then I could display few recent posts in the list.

## Iteration 2

I added this function

```ts
export async function processedSimilarPosts(tags: string[], excludingTitle: string = '') {
  const MINIMUM_NUMBER_OF_SIMILAR_POSTS = 3
  let otherPosts: any[] = []

  // get similar posts of all tags
  for (const tag of tags) {
    const blogPostList = await similarPosts(tag, excludingTitle)
    otherPosts = [...otherPosts, ...blogPostList]
  }

  // return posts if they are more than decided count
  if (otherPosts.length >= MINIMUM_NUMBER_OF_SIMILAR_POSTS) return otherPosts

  const remainingPostsToFill = Math.abs(otherPosts.length - MINIMUM_NUMBER_OF_SIMILAR_POSTS)

  // again get all posts
  let additionalPosts = await getBlogList()
  // and then filter them if it is current post OR if it is already present in from the tag
  additionalPosts = additionalPosts.filter(post => {
    if (post.data.title === excludingTitle) return false

    const postExistsInOtherPosts = otherPosts.some(otherPost => otherPost.data.slug === post.data.slug);
    return !postExistsInOtherPosts;

  })
  // take only the required number of posts
  additionalPosts.splice(remainingPostsToFill)

  const combinedPosts = [...otherPosts, ...additionalPosts]
  return combinedPosts
}
```
## Iteration 3

Later, I also added this function to remove duplicates because one post could have multiple tags.

```ts
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
```


Now, I could just call processedSimilarPosts function and map over the result to display posts.

<sup><sub>Live example below 👇 </sub></sup>
