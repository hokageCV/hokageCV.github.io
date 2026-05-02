import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.union([z.string(), z.date()]),
    updatedDate: z.union([z.string(), z.date()]).optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()),
  }),
});

const project = defineCollection({
  schema: z.object({
    title: z.string(),
    repoLink: z.string().url().optional(),
    liveLink: z.string().url().optional(),
    cover: z.union([
      z.object({ image: z.string(), alt: z.string() }),
      z.object({ video: z.string() })
    ])
  })
})

const today_i_learned = defineCollection({
  schema: z.object({
    title: z.string(),
    publishedDate: z.union([z.string(), z.date()]),
    tags: z.array(z.string()).optional(),
  }),
})

const snippet = defineCollection({
  schema: z.object({
    title: z.string(),
    publishedDate: z.union([z.string(), z.date()]),
    tags: z.array(z.string()).optional(),
  })
})

export const collections = { blogs: blog, projects: project, snippets: snippet, til: today_i_learned };

