import { Resvg } from '@resvg/resvg-js';
import type { AstroIntegration } from "astro";
import parseFrontmatter from 'gray-matter';
import fs from "node:fs/promises";
import path from 'path';
import satori from 'satori';
import sharp from 'sharp';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
// WhatsApp refuses previews over 500 KB; stay comfortably under it.
const OG_MAX_BYTES = 300 * 1024;

const render = (title: string) => ({
  type: "div",
  props: {
    style: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#1b2932",
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
            backgroundColor: "#5998c0",
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
                  color: "#ebf7ff",
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
            border: "4px solid #5998c0",
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
            border: "4px solid #5998c0",
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
              const raw = await fs.readFile(customOg);
              const optimized = await optimizeOgImage(raw, slug, logger);
              await fs.writeFile(path.join(finalDir, 'og.png'), optimized);
              logger.info(`Optimized custom og.png for ${slug} (${(optimized.length / 1024).toFixed(0)} KB)`);
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
            width: OG_WIDTH,
            height: OG_HEIGHT,
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
              value: OG_WIDTH,
            },
          });

          const basePath = process.cwd();
          const finalDir = path.join(basePath, 'dist', 'blogs', slug);
          await fs.mkdir(finalDir, { recursive: true });

          const rawPng = resvg.render().asPng();
          const optimized = await optimizeOgImage(Buffer.from(rawPng), slug, logger);
          await fs.writeFile(
            path.join(finalDir, 'og.png'), // Output file name and path
            optimized,
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

async function optimizeOgImage(
  input: Buffer,
  slug: string,
  logger: { warn: (msg: string) => void },
): Promise<Buffer> {
  // Never crop: shrink to fit inside 1200x630 and pad the remainder with the
  // image's own edge color so the full artwork survives with exact dimensions.
  const background = await sampleEdgeColor(input);

  // Pass 1: palette PNG (usually smallest for text/diagrams).
  let out = await sharp(input)
    .flatten({ background })
    .resize(OG_WIDTH, OG_HEIGHT, { fit: 'contain', background })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();

  // Pass 2: photographic screenshots compress poorly as palette PNG;
  // fall back to quality-capped truecolor PNG which is still < 500 KB.
  if (out.length > OG_MAX_BYTES) {
    out = await sharp(input)
      .flatten({ background })
      .resize(OG_WIDTH, OG_HEIGHT, { fit: 'contain', background })
      .png({ compressionLevel: 9, quality: 80 })
      .toBuffer();
  }

  if (out.length > OG_MAX_BYTES) {
    logger.warn(
      `OG image for ${slug} is ${(out.length / 1024).toFixed(0)} KB, over WhatsApp's ~500 KB preview limit`,
    );
  }

  return out;
}

async function sampleEdgeColor(input: Buffer): Promise<{ r: number; g: number; b: number }> {
  const meta = await sharp(input).metadata();
  const width = meta.width ?? 1;
  const height = meta.height ?? 1;
  const corners = [
    { left: 0, top: 0 },
    { left: Math.max(0, width - 1), top: 0 },
    { left: 0, top: Math.max(0, height - 1) },
    { left: Math.max(0, width - 1), top: Math.max(0, height - 1) },
  ];
  const samples = await Promise.all(
    corners.map(({ left, top }) =>
      sharp(input).extract({ left, top, width: 1, height: 1 }).raw().toBuffer(),
    ),
  );
  // Per-channel median: robust even if one corner lands on text or an icon.
  const median = (values: number[]) => values.sort((a, b) => a - b)[Math.floor(values.length / 2)];
  return {
    r: median(samples.map((s) => s[0])),
    g: median(samples.map((s) => s[1])),
    b: median(samples.map((s) => s[2])),
  };
}

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



