# AGENTS.md - hokageCV.github.io

Personal website and blog built with Astro. Contains blog posts, projects, code snippets, and dynamic OG image generation.

## Project Overview

- Framework: Astro 6.x
- Package Manager: pnpm (v10.4.1)
- Language: TypeScript (strict mode)
- Styling: CSS with custom properties (Utopia fluid typography, CSS variables)
- Content: Astro Content Layer API with Content Collections

## Build Commands

```bash
pnpm dev          # Start development server (default on folder open)
pnpm start        # Alias for pnpm dev
pnpm build        # Build for production (outputs to dist/)
pnpm preview      # Preview production build locally
pnpm astro       # Run Astro CLI directly
```

### Running Single Test

No test framework is configured - there are no tests in this project.

## Project Structure

```
src/
├── components/       # Astro components (PascalCase, grouped by feature)
│   ├── blogs/        # Blog-related components
│   ├── projects/     # Project-related components
│   ├── snippets/     # Snippet-related components
│   ├── tags/         # Tag components
│   ├── theme/        # Theme switching components
│   ├── contact/      # Contact form components
│   ├── header/       # Header components
│   └── *.astro       # Shared components
├── collections/     # Content collections (CONTENT LAYER API)
│   ├── blogs/
│   ├── projects/
│   ├── snippets/
│   └── til/
├── content.config.ts # Content collections config (Content Layer API)
├── data/             # Static data files (JS/TS)
├── layouts/          # Astro layouts
├── pages/            # Astro pages (file-based routing)
├── styles/           # Global CSS files
├── utils/            # Utility functions (camelCase TS files)
└── types.ts         # Shared TypeScript types

public/
├── fonts/            # Font files for OG image generation
└── ...              # Static assets

astro.config.mjs     # Astro configuration
tsconfig.json        # TypeScript configuration
```

## Code Style Guidelines

### Imports

```typescript
// Use @/ alias for src/ imports
import BlogList from '@/components/blogs/BlogList.astro'
import { getBlogList } from '@/utils/collection'
import type { TagsType } from '@/types'

// Third-party imports
import { DateTime } from 'luxon'
import { getCollection, render } from 'astro:content'

// Node.js imports
import fs from "node:fs/promises";
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Astro Components | PascalCase | `BlogPost.astro`, `ProjectCard.astro` |
| TypeScript Files | camelCase | `date.ts`, `collection.ts`, `open-graph.ts` |
| TypeScript Types | PascalCase | `TagsType`, `BlogPost` |
| CSS Files | kebab-case | `global.css`, `scrollbar.css` |
| CSS Variables | kebab-case | `--space-l`, `--base-background` |
| Functions | camelCase | `getBlogList()`, `readableDate()` |
| Constants | camelCase | `MAX_NUMBER_OF_SIMILAR_POSTS` |
| Collections | camelCase | `blogList`, `projectList` |

### Astro Components

**For pages rendering content** (uses Content Layer API):
```astro
---
import Base from '@/layouts/Base.astro'
import BlogPost from '@/components/blogs/BlogPost.astro'
import { getBlogList } from '@/utils/collection'
import { render } from 'astro:content'

export async function getStaticPaths() {
  const blogList = await getBlogList()
  const paths = await Promise.all(blogList.map(async (post) => {
    const { Content } = await render(post)
    return {
      params: { slug: post.id },
      props: { post, Content },
    }
  }))
  return paths
}

const { post, Content } = Astro.props
const { data } = post
---

<Base title={data.title}>
  <BlogPost data={data} Content={Content} />
</Base>
```

**For nested components** (receives Content):
```astro
---
import { readableDate } from '@/utils/date'

const { data, Content } = Astro.props
---

<div>
  <h1>{data.title}</h1>
  <Content />
</div>

<style>
  div { display: flex; }
</style>
```

### TypeScript

- Strict mode enabled (`strict: true`, `strictNullChecks: true`)
- Use explicit types for function parameters and return values
- Use `type` imports for type-only imports (`import type { ... }`)
- **Verbatim module syntax**: Use `import type` for types only

### CSS Styling

- Use CSS custom properties from `src/styles/global.css`
- Fluid typography via Utopia scale (`--step--5` to `--step-5`)
- Spacing scale via `--space-2xs` to `--space-8xl`
- Theme switching via `html[data-theme='dark']` / `html[data-theme='light']`
- Use `:root` for CSS variable definitions

### Error Handling

- Use try-catch with logging for async operations
- Use Astro's `logger.warn()` / `logger.error()` in integration hooks
- Handle missing files gracefully with informative error messages

## Architecture Notes

### Path Aliases

Configured in `tsconfig.json`:
- `@/*` → `src/*`
- `~/assets/*` → `src/assets/*`

Note: Use `moduleResolution: "bundler"` (not `node`) for Astro v6+ to resolve virtual modules from `astro/loaders`, `astro/zod`.

### Astro Configuration

Key settings in `astro.config.mjs`:
- Site URL: `https://hokageCV.github.io`
- Trailing slash: `never`
- Integrations: MDX, Partytown, Sitemap, Expressive Code
- Expressive Code theme: `solarized-dark`

## Common Tasks

### Modify theme/styles
1. Edit `src/styles/global.css` for global styles and CSS variables
2. Component styles go in `<style>` blocks within `.astro` files
