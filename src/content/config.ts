import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.string(),
    updatedDate: z.string().optional(),
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

const snippet = defineCollection({
  schema: z.object({
    title: z.string(),
    publishedDate: z.string(),
    tags: z.array(z.string()).optional(),
  })
})

export const collections = { blog, project, snippet };

