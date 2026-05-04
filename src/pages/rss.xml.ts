import rss from '@astrojs/rss';
import metadata from '../data/metadata';

type Item = {
  id: string;
  compiledContent: () => string;
  file: string;
  frontmatter: {
    title: string;
    published_date: string;
    description: string;
    draft: boolean;
  };
};

const items = Object.values(
  import.meta.glob<Item>('../collections/blogs/**/*.{md,mdx}', { eager: true })
).filter((item) => {
  const fm = item.frontmatter;
  const errors: string[] = [];

  if (fm.draft !== false) errors.push('draft is not explicitly set to false');
  if (!fm.title) errors.push('missing title');
  if (!fm.description) errors.push('missing description');
  if (!fm.published_date) {
    errors.push('missing published_date');
  } else if (isNaN(new Date(fm.published_date).getTime())) {
    errors.push(`invalid published_date: ${fm.published_date}`);
  }

  if (errors.length > 0) {
    console.warn(`Skipping invalid RSS item in file "${item.file}":\n - ${errors.join("\n - ")}`);
    return false;
  }

  return true;
});


const formatDate = (item: Item): Date => {
  const parsedDate = new Date(item.frontmatter.published_date);

  if (isNaN(parsedDate.getTime())) {
    console.error(`Invalid published_date for item:`, item.frontmatter);
    throw new Error(`RSS item has an invalid published_date`);
  }

  return parsedDate;
};

export async function GET() {
  const rssItems = await Promise.all(
    items.map(async (item) => {
      // Derive slug from file path: ../collections/blogs/2025/text-expander.md -> text-expander
      const filePath = item.file;
      const match = filePath.match(/\/collections\/blogs\/[^/]+\/([^.]+)\./);
      const slug = match ? match[1] : filePath.split('/').pop()?.replace(/\.[^.]+$/, '') || '';
      
      const rssItem = {
        content: item.file.endsWith(".md") ? await item.compiledContent() : undefined,
        title: item.frontmatter.title,
        description: item.frontmatter.description,
        pubDate: formatDate(item),
        link: `/blogs/${slug}`,
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
