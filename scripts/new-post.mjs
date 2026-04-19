import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const title = process.argv[2];
const explicitSlug = process.argv[3];

if (!title) {
  console.error('用法：npm run new:post -- "文章标题" [slug]');
  process.exit(1);
}

const slugify = (value) =>
  value
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const now = new Date();
const date = now.toISOString().slice(0, 10);
const fallbackSlug = `post-${date.replaceAll('-', '')}`;
const slug = explicitSlug ?? (slugify(title) || fallbackSlug);

const templatePath = resolve(root, 'templates/blog-post.md');
const outputPath = resolve(root, 'src/content/blog', `${slug}.md`);

if (existsSync(outputPath)) {
  console.error(`目标文件已存在：${outputPath}`);
  process.exit(1);
}

mkdirSync(resolve(root, 'src/content/blog'), { recursive: true });
const template = readFileSync(templatePath, 'utf8');
const content = template
  .replaceAll('{{TITLE}}', title)
  .replaceAll('{{DATE}}', date);

writeFileSync(outputPath, content, 'utf8');

console.log(`已创建新文章：${outputPath}`);
console.log(`下一步：npm run local，然后打开 /blog/${slug}/ 查看页面效果。`);
