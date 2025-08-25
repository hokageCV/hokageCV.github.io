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
  import.meta.glob<Item>('../content/blogs/**/*.{md,mdx}', { eager: true })
).filter((item) => {
  const fm = item.frontmatter;
  const errors: string[] = [];

  if (fm.draft !== false) errors.push('draft is not explicitly set to false');
  if (!fm.title) errors.push('missing title');
  if (!fm.description) errors.push('missing description');
  if (!fm.publishedDate) {
    errors.push('missing publishedDate');
  } else if (isNaN(new Date(fm.publishedDate).getTime())) {
    errors.push(`invalid publishedDate: ${fm.publishedDate}`);
  }

  if (errors.length > 0) {
    console.warn(`Skipping invalid RSS item in file "${item.file}":\n - ${errors.join("\n - ")}`);
    return false;
  }

  return true;
});


const formatDate = (item: Item): Date => {
  const parsedDate = new Date(item.frontmatter.publishedDate);

  if (isNaN(parsedDate.getTime())) {
    console.error(`Invalid publishedDate for item:`, item.frontmatter);
    throw new Error(`RSS item has an invalid publishedDate`);
  }

  return parsedDate;
};

export async function GET() {
  const rssItems = await Promise.all(
    items.map(async (item) => {
      const rssItem = {
        content: item.file.endsWith(".md") ? await item.compiledContent() : undefined,
        title: item.frontmatter.title,
        description: item.frontmatter.description,
        pubDate: formatDate(item),
        link: `/blogs/${item.frontmatter.slug}`,
      };

      const missing: string[] = [];
      if (!rssItem.title) missing.push("title");
      if (!rssItem.description) missing.push("description");
      if (!(rssItem.pubDate instanceof Date) || isNaN(rssItem.pubDate.getTime())) {
        missing.push("pubDate");
      }
      if (!rssItem.link) missing.push("link");

      if (missing.length > 0) {
        console.error(
          `❌ Skipping RSS item from file "${item.file}": missing [${missing.join(", ")}]`
        );
        return null;
      }

      return rssItem;
    })
  );

  const validItems = rssItems.filter((i): i is NonNullable<typeof i> => i !== null);

  console.log(`\n=== RSS BUILD SUMMARY ===`);
  console.log(`Valid items: ${validItems.length}`);
  console.log(`Total source files: ${items.length}\n`);

  return rss({
    title: metadata.title,
    description: metadata.description,
    site: import.meta.env.SITE,
    trailingSlash: false,
    stylesheet: '/rss/styles.xsl',
    items: validItems,
  });
}
