import rss from '@astrojs/rss';
import metadata from '../data/metadata';

type Item = {
  compiledContent: () => string;
  file: string;
  frontmatter: {
    title: string;
    publishedDate: string;
    description: string;
    draft: boolean;
    slug: string;
  };
};

const items = Object.values(
  import.meta.glob<Item>('../content/blogs/*/*.{md,mdx}', { eager: true })
).filter((item) => item.frontmatter.draft == false)

const formatDate = (item: Item): Date => {
  const parsedDate = new Date(item.frontmatter.publishedDate);

  if (isNaN(parsedDate.getTime())) {
    console.error(`Invalid publishedDate for item:`, item.frontmatter);
    throw new Error(`RSS item has an invalid publishedDate`);
  }

  return parsedDate;
};

export async function GET() {
  return rss({
    title: metadata.title,
    description: metadata.description,
    site: import.meta.env.SITE,
    trailingSlash: false,
    stylesheet: '/rss/styles.xsl',
    items: items
      .map((item) => {
        return {
          content: item.file.slice(-3) === ".md" ? item.compiledContent() : undefined,
          title: item.frontmatter.title,
          description: item.frontmatter.description,
          pubDate: formatDate(item),
          link: `/blogs/${item.frontmatter.slug}`,
        }
      })
      .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime()),
  })
}
