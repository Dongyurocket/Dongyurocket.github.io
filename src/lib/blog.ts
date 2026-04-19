import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export function getPostUrl(post: BlogPost) {
  return `/blog/${post.id}/`;
}

export function sortPosts(posts: BlogPost[]) {
  return [...posts].sort(
    (left, right) =>
      right.data.pubDate.getTime() - left.data.pubDate.getTime(),
  );
}

export function getVisiblePosts(posts: BlogPost[]) {
  return sortPosts(posts).filter((post) => !post.data.draft);
}

export function getFeaturedPosts(posts: BlogPost[]) {
  return getVisiblePosts(posts).filter((post) => post.data.featured);
}

export function getWechatReadyPosts(posts: BlogPost[]) {
  return getVisiblePosts(posts).filter((post) => post.data.wechatReady);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

export function getAllCategories(posts: BlogPost[]) {
  return [...new Set(posts.map((post) => post.data.category))].sort((a, b) =>
    a.localeCompare(b, 'zh-CN'),
  );
}

export function getCategoryCount(posts: BlogPost[]) {
  return posts.reduce<Record<string, number>>((accumulator, post) => {
    accumulator[post.data.category] = (accumulator[post.data.category] ?? 0) + 1;
    return accumulator;
  }, {});
}

export function estimateReadingMinutes(text: string) {
  const plainText = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/[#>*_~\-]/g, ' ');
  const cjkCount = (plainText.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const latinWordCount = (plainText.match(/[A-Za-z0-9_]+/g) ?? []).length;
  const unitCount = cjkCount + latinWordCount;
  return Math.max(1, Math.ceil(unitCount / 350));
}

export function groupPostsByYear(posts: BlogPost[]) {
  const buckets = getVisiblePosts(posts).reduce<Record<string, BlogPost[]>>(
    (accumulator, post) => {
      const year = String(post.data.pubDate.getFullYear());
      accumulator[year] = accumulator[year] ?? [];
      accumulator[year].push(post);
      return accumulator;
    },
    {},
  );

  return Object.entries(buckets)
    .sort(([left], [right]) => Number(right) - Number(left))
    .map(([year, yearPosts]) => ({
      year,
      posts: sortPosts(yearPosts),
    }));
}
