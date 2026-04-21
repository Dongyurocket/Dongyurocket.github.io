import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const title = process.argv[2];
const explicitSlug = process.argv[3];

if (!title) {
  console.error('用法：npm run new:note -- "笔记标题" [slug]');
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
const fallbackSlug = `note-${date.replaceAll('-', '')}`;
const slug = explicitSlug ?? (slugify(title) || fallbackSlug);

const templatePath = resolve(root, 'templates/note.md');
const outputPath = resolve(root, 'src/content/notes', `${slug}.md`);

if (existsSync(outputPath)) {
  console.error(`目标文件已存在：${outputPath}`);
  process.exit(1);
}

mkdirSync(resolve(root, 'src/content/notes'), { recursive: true });
const template = readFileSync(templatePath, 'utf8');
const content = template
  .replaceAll('{{TITLE}}', title)
  .replaceAll('{{DATE}}', date);

writeFileSync(outputPath, content, 'utf8');

console.log(`已创建新笔记：${outputPath}`);
console.log('这类笔记默认只保留在本地，不会进入公开站点、公众号导出或 GitHub 同步；需要发布时，再整理到 src/content/blog。');
