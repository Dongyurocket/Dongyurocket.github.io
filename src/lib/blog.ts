import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export function sortPosts(posts: BlogPost[]) {
  return [...posts].sort(
    (left, right) =>
      right.data.pubDate.getTime() - left.data.pubDate.getTime(),
  );
}

export function getVisiblePosts(posts: BlogPost[]) {
  return sortPosts(posts).filter((post) => !post.data.draft);
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

