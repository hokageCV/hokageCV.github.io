import { Resvg } from '@resvg/resvg-js';
import type { AstroIntegration } from "astro";
import parseFrontmatter from 'gray-matter';
import fs from "node:fs/promises";
import path from 'path';
import satori from 'satori';

const render = (title: string) => ({
  type: "div",
  props: {
    style: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: "#0d2134",
      padding: "55px 70px",
      color: "#70E1C8",
      fontFamily: "JetBrains Mono",
      fontSize: 72,
    },
    children: [
      {
        type: "div",
        props: {
          style: { marginTop: 96 },
          children: title,
        },
      },
    ],
  },
});

const og = (): AstroIntegration => ({
  name: "og",
  hooks: {
    'astro:build:done': async ({ dir, pages, logger }) => {
      try {
        const jetBrainsMono = await fs.readFile('public/fonts/JetBrainsMono-Regular.ttf');

        for (const { pathname } of pages) {
          if (!pathname.startsWith('blogs/')) continue;

          const slug = pathname.slice(6);
          let file;

          try {
            file = await getFile(slug)
          } catch (e) {
            logger.warn(`Could not find blog file for ${pathname}`);
            continue;
          }

          const { title } = parseFrontmatter(file).data;

          const svg = await satori(render(title), {
            width: 1200,
            height: 630,
            fonts: [
              {
                name: 'JetBrains Mono',
                data: jetBrainsMono,
                weight: 400,
                style: 'normal',
              },
            ],
          });
          const resvg = new Resvg(svg, {
            fitTo: {
              mode: 'width',
              value: 1200,
            },
          });

          const basePath = process.cwd();
          const finalDir = path.join(basePath, 'dist', 'blogs', slug);

          await fs.writeFile(
            path.join(finalDir, 'og.png'), // Output file name and path
            resvg.render().asPng(),
          );

          logger.info(`Generated OpenGraph image for ${slug}`);
        }
      }
      catch (e) {
        logger.error("OpenGraph image generation failed");
        throw e
      }
    },
  },
});

async function getFile(slug: string) {
  const srcBasePath = path.join('src', 'content', 'blogs');
  const years = ["2023", "2024"];

  for (const year of years) {
    const yearPath = path.join(srcBasePath, year);

    try {
      const entries = await fs.readdir(yearPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(yearPath, entry.name);

        if (entry.isFile() && entry.name === `${slug}.md`) {
          return await fs.readFile(fullPath);
        } else if (entry.isDirectory() && entry.name === slug) {
          const indexPath = path.join(fullPath, "index.md");
          try {
            if ((await fs.stat(indexPath)).isFile()) {
              return await fs.readFile(indexPath);
            }
          } catch (e) {
            // No index.md found in this directory
          }
        }
      }
    } catch (e) {
      console.warn(`Could not read year directory: ${yearPath}`);
    }
  }
  throw new Error(`Markdown file not found for slug: ${slug}`);
}

export default og;



