import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';

const root = process.cwd();
const contentDir = resolve(root, 'src/content/blog');
const outputDir = resolve(root, 'exports/wechat');
const siteUrl = (process.env.SITE_URL ?? 'https://dongyurocket.github.io').replace(/\/+$/, '');
const input = process.argv[2];

if (!input) {
  console.error('用法：npm run export:wechat -- 文章slug或文件路径');
  process.exit(1);
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function findSourcePath(value) {
  const resolved = resolve(root, value);
  if (existsSync(resolved)) {
    return resolved;
  }

  const candidates = walk(contentDir).filter((file) => {
    const withoutExt = file.slice(0, -extname(file).length);
    const slug = relative(contentDir, withoutExt).replaceAll('\\', '/');
    return slug === value || slug.endsWith(`/${value}`) || withoutExt.endsWith(value);
  });

  return candidates[0];
}

function parseFrontmatter(content) {
  const normalized = content.replaceAll('\r\n', '\n');
  if (!normalized.startsWith('---\n')) {
    return { data: {}, body: normalized };
  }

  const end = normalized.indexOf('\n---\n', 4);
  if (end === -1) {
    return { data: {}, body: normalized };
  }

  const frontmatterBlock = normalized.slice(4, end);
  const body = normalized.slice(end + 5);
  const data = {};

  for (const line of frontmatterBlock.split('\n')) {
    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    const value = rawValue.trim().replace(/^"(.*)"$/, '$1');
    if (value === 'true') data[key] = true;
    else if (value === 'false') data[key] = false;
    else if (value) data[key] = value;
  }

  return { data, body };
}

function rewriteLinks(markdown) {
  return markdown
    .replaceAll(/\]\((\/[^)]+)\)/g, `](${siteUrl}$1)`)
    .replaceAll(/src="(\/[^"]+)"/g, `src="${siteUrl}$1"`);
}

function isRelativeAssetPath(path) {
  return (
    path &&
    !path.startsWith('http://') &&
    !path.startsWith('https://') &&
    !path.startsWith('/') &&
    !path.startsWith('#') &&
    !path.startsWith('data:')
  );
}

function copyRelativeAssets(markdown, sourcePath, outputPath, warnings) {
  const sourceDir = dirname(sourcePath);
  const outputDirForFile = dirname(outputPath);

  const copyAsset = (assetPath) => {
    if (!isRelativeAssetPath(assetPath)) {
      return assetPath;
    }

    const cleanPath = assetPath.split('?')[0].split('#')[0];
    const absoluteSourcePath = resolve(sourceDir, cleanPath);
    if (!existsSync(absoluteSourcePath)) {
      warnings.push(`相对资源未找到：${assetPath}`);
      return assetPath;
    }

    const absoluteOutputPath = resolve(outputDirForFile, cleanPath);
    mkdirSync(dirname(absoluteOutputPath), { recursive: true });
    copyFileSync(absoluteSourcePath, absoluteOutputPath);
    return assetPath.replaceAll('\\', '/');
  };

  return markdown
    .replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (full, alt, assetPath) => {
      const nextPath = copyAsset(assetPath);
      return full.replace(assetPath, nextPath);
    })
    .replace(/src="([^"]+)"/g, (full, assetPath) => {
      const nextPath = copyAsset(assetPath);
      return full.replace(assetPath, nextPath);
    });
}

function transformMdx(markdown, warnings) {
  let output = markdown
    .replace(/^\s*import\s.+$/gm, '')
    .replace(/^\s*export\s.+$/gm, '');

  output = output.replace(
    /<Callout(?:\s+title="([^"]+)")?\s*>([\s\S]*?)<\/Callout>/g,
    (_, title = '提示', content = '') => {
      const lines = content
        .trim()
        .split('\n')
        .map((line) => `> ${line.trim()}`);
      return [`> **${title}**`, ...lines].join('\n');
    },
  );

  if (/<[A-Z][A-Za-z0-9]*[\s>]/.test(output)) {
    warnings.push('检测到可能的 JSX / 组件标签，导出后请手动检查格式。');
  }

  return output;
}

const sourcePath = findSourcePath(input);

if (!sourcePath) {
  console.error(`未找到文章：${input}`);
  process.exit(1);
}

const source = readFileSync(sourcePath, 'utf8');
const { data, body } = parseFrontmatter(source);
const warnings = [];
const isMdx = extname(sourcePath) === '.mdx';
const relativeWithoutExt = relative(contentDir, sourcePath.slice(0, -extname(sourcePath).length)).replaceAll('\\', '/');
const title = data.wechatTitle || data.title || relativeWithoutExt;
const digest = data.wechatDigest || data.description || '';
const permalink = `${siteUrl}/blog/${relativeWithoutExt}/`;

mkdirSync(outputDir, { recursive: true });
const outputPath = resolve(outputDir, `${relativeWithoutExt}.md`);
mkdirSync(dirname(outputPath), { recursive: true });
const transformedBody = copyRelativeAssets(
  rewriteLinks(transformMdx(body, warnings)).trim(),
  sourcePath,
  outputPath,
  warnings,
);
const output = [
  `# ${title}`,
  '',
  digest ? `> ${digest}` : '',
  digest ? '' : '',
  transformedBody,
  '',
  '---',
  '',
  `原文链接：${permalink}`,
].join('\n');

writeFileSync(outputPath, output, 'utf8');

console.log(`已导出公众号版本：${outputPath}`);
if (isMdx) {
  warnings.push('源文件是 MDX，建议额外检查导出后的内容。');
}
if (warnings.length > 0) {
  console.warn('\n导出提醒：');
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}
