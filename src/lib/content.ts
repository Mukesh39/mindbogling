import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
export type Category = CollectionEntry<'categories'>;

/** All sections, in the order set in the CMS. */
export async function getCategories(): Promise<Category[]> {
  const all = await getCollection('categories');
  return all.sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name));
}

/** All published articles (drafts hidden), newest first. */
export async function getPosts(): Promise<Post[]> {
  const cats = new Set((await getCategories()).map((c) => c.id));
  const all = await getCollection('blog', ({ data }) => !data.draft);
  return all
    .filter((p) => {
      if (!cats.has(p.data.category)) {
        console.warn(`[blog] "${p.id}" uses unknown section "${p.data.category}" and was skipped.`);
        return false;
      }
      return true;
    })
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const postUrl = (p: Post) => `/${p.data.category}/${p.id}/`;

export function readingTime(text = ''): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
