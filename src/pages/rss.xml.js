import rss from '@astrojs/rss';
import { config } from '../config.mjs';
import { getPosts, postUrl } from '../lib/content';
export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: config.name, description: config.description, site: context.site,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.excerpt, pubDate: p.data.date, link: postUrl(p) })),
  });
}
