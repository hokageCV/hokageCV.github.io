import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md{,x}", base: "./src/collections/blogs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published_date: z.union([z.string(), z.date()]),
    updated_date: z.union([z.string(), z.date()]).optional(),
    tags: z.array(z.string()),
    also_in_til: z.boolean().optional().default(false),
    favorite: z.boolean().optional().default(false),
  }),
});

const project = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/collections/projects" }),
  schema: z.object({
    title: z.string(),
    repo_link: z.url().optional(),
    live_link: z.url().optional(),
    cover: z.union([
      z.object({ image: z.string(), alt: z.string() }),
      z.object({ video: z.string() })
    ])
  })
})

const today_i_learned = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/collections/til" }),
  schema: z.object({
    title: z.string(),
    published_date: z.union([z.string(), z.date()]),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
})

const snippet = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/collections/snippets" }),
  schema: z.object({
    title: z.string(),
    published_date: z.union([z.string(), z.date()]),
    tags: z.array(z.string()).optional(),
  })
})

const draft_post = defineCollection({
  loader: glob({ pattern: "**/*.md{,x}", base: "./src/collections/drafts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published_date: z.union([z.string(), z.date()]),
    tags: z.array(z.string()),
  }),
});

export const collections = { blogs: blog, projects: project, snippets: snippet, til: today_i_learned, drafts: draft_post };

