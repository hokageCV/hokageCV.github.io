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
      backgroundColor: "#0a1628",
      position: "relative",
      overflow: "hidden",
    },
    children: [
      {
        type: "div",
        props: {
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 8,
            backgroundColor: "#60D5FA",
          },
        },
      },
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            padding: "80px 100px",
          },
          children: [
            {
              type: "div",
              props: {
                style: {
                  fontSize: 64,
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.2,
                  maxWidth: 900,
                },
                children: title,
              },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          style: {
            position: "absolute",
            bottom: -60,
            right: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: "4px solid #60D5FA",
            opacity: 0.2,
          },
        },
      },
      {
        type: "div",
        props: {
          style: {
            position: "absolute",
            bottom: -120,
            right: 100,
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "4px solid #60D5FA",
            opacity: 0.15,
          },
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

          const sourceDir = await getSourceDir(slug);
          if (sourceDir) {
            const customOg = path.join(sourceDir, 'og.png');
            try {
              await fs.stat(customOg);
              const basePath = process.cwd();
              const finalDir = path.join(basePath, 'dist', 'blogs', slug);
              await fs.mkdir(finalDir, { recursive: true });
              await fs.copyFile(customOg, path.join(finalDir, 'og.png'));
              logger.info(`Copied custom og.png for ${slug}`);
              continue;
            } catch (e) {
              // no custom og.png, proceed with generation
            }
          }

          let file;

          try {
            file = await getFile(slug)
          } catch (e) {
            logger.warn(`Could not find blog file for ${pathname}`);
            continue;
          }

          const { data: { title } } = parseFrontmatter(file)

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
        }
      }
      catch (e) {
        logger.error("OpenGraph image generation failed");
        throw e
      }
    },
  },
});

async function getAvailableYears() {
  const srcBasePath = path.join('src', 'collections', 'blogs');

  try {
    const entries = await fs.readdir(srcBasePath, { withFileTypes: true });

    return entries
      .filter(e => e.isDirectory())
      .map(e => e.name)
      .filter(n => /^\d{4}$/.test(n))
      .sort();
  } catch {
    return [];
  }
}

async function getFile(slug: string) {
  const srcBasePath = path.join('src', 'collections', 'blogs');
  const years = await getAvailableYears();

  for (const year of years) {
    const yearPath = path.join(srcBasePath, year);

    try {
      const entries = await fs.readdir(yearPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(yearPath, entry.name);

        if (entry.isFile() && (entry.name === `${slug}.md` || entry.name === `${slug}.mdx`)) {
          return await fs.readFile(fullPath);
        } else if (entry.isDirectory() && entry.name === slug) {
          for (const ext of ['md', 'mdx']) {
            const indexPath = path.join(fullPath, `index.${ext}`);

            try {
              if ((await fs.stat(indexPath)).isFile()) {
                return await fs.readFile(indexPath);
              }
            } catch (e) { }
          }
        }
      }
    } catch (e) {
      console.warn(`Could not read year directory: ${yearPath}`);
    }
  }
  throw new Error(`Markdown file not found for slug: ${slug}`);
}

async function getSourceDir(slug: string): Promise<string | null> {
  const srcBasePath = path.join('src', 'collections', 'blogs');
  const years = await getAvailableYears();

  for (const year of years) {
    const yearPath = path.join(srcBasePath, year);

    try {
      const entries = await fs.readdir(yearPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(yearPath, entry.name);

        if (entry.isFile() && (entry.name === `${slug}.md` || entry.name === `${slug}.mdx`)) {
          return yearPath;
        } else if (entry.isDirectory() && entry.name === slug) {
          return fullPath;
        }
      }
    } catch (e) {
      console.warn(`Could not read year directory: ${yearPath}`);
    }
  }
  return null;
}

export default og;



