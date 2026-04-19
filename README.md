# Personal Web

一个面向个人博客的 Astro 站点骨架，已经集成：

- Markdown / MDX 写作
- LaTeX 公式渲染
- 分类归档
- 全文检索
- 图片 / 插图支持

## 启动方式

```bash
npm install
npm run dev
```

本地一键打开网站：

```bash
npm run local
```

Windows 下也可以直接双击根目录里的 `start-local-site.cmd`。

## 长期写作工作流

新建文章：

```bash
npm run new:post -- "文章标题"
```

导出公众号版本：

```bash
npm run export:wechat -- 文章slug
```

导出的文件会放在：

`exports/wechat`

推荐长期写作方式：

1. 优先使用 `templates/blog-post.md`
2. 默认写纯 Markdown 正文
3. 网站负责展示、归档、检索
4. 公众号通过导出后的 Markdown 再做最终排版

## GitHub Pages 部署

如果你想用最省事的方式部署，请使用下面这个仓库命名：

`<你的 GitHub 用户名>.github.io`

例如你的 GitHub 用户名是 `alice`，那么仓库就应该叫：

`alice.github.io`

这个项目已经内置了 GitHub Pages 工作流：

- 工作流文件：`.github/workflows/deploy.yml`
- 推送到 `main` 分支后会自动发布
- 发布地址会自动按 GitHub 用户名计算成 `https://<用户名>.github.io`

你需要做的事情：

1. 在 GitHub 新建仓库，名字必须是 `<你的用户名>.github.io`
2. 把当前项目推到这个仓库的 `main` 分支
3. 进入 GitHub 仓库的 `Settings > Pages`
4. 确认 Source 使用 `GitHub Actions`
5. 等待 Actions 跑完后访问你的站点

如果你只是本地使用，这部分可以暂时不用管。

生产构建：

```bash
npm run build
npm run preview
```

> 搜索索引会在 `npm run build` 后由 Pagefind 生成，因此开发模式下检索页会显示提示信息。

## 内容写作

博客文章存放在：

`src/content/blog`

支持 `.md` 和 `.mdx` 两种格式，示例 frontmatter：

```yaml
---
title: "文章标题"
description: "文章摘要"
pubDate: 2026-04-19
category: "技术"
tags:
  - Astro
  - Markdown
---
```

## 公众号友好写作规范

如果一篇文章既要发网站，也要发微信公众号，建议默认遵守下面这些规则：

1. 优先写成 `.md`，只在明确需要网站专属效果时才用 `.mdx`
2. 优先使用标准 Markdown：标题、段落、列表、引用、图片、代码块
3. 把提示框、注释块优先写成引用块 `>`
4. 标题层级尽量控制在三级以内
5. 表格尽量不要太宽，避免手机端排版拥挤
6. 公式尽量保持简洁；复杂公式发布到公众号前建议额外做一次手机预览
7. 图片在网站里可以直接引用本地资源，但发公众号时建议重新上传到公众号后台

不建议默认用于“双端同步”的内容：

- 自定义 MDX 组件
- 交互式组件
- 很宽的大表格
- 很长的代码块
- 依赖站点 CSS 才好看的特殊布局

如果你想走“网站 + 公众号”双端流程，推荐：

1. 在 `src/content/blog` 里先写一份纯 Markdown 正文
2. 本地用网站检查结构、图片和公式
3. 运行 `npm run export:wechat -- 文章slug`
4. 再把导出的 Markdown 导入公众号 Markdown 编辑器做最终排版

站内也提供了对应说明页：`/guide/`

## 公式写法

行内公式：

```md
$E = mc^2$
```

块级公式：

```md
$$
\int_0^1 x^2 dx = \frac{1}{3}
$$
```

## Markdown 联动建议

如果你平时就用 Markdown 记笔记，有两种最省事的接入方式：

1. 直接把文章写在 `src/content/blog` 里
2. 把现有笔记逐步迁移成这里的文章文件

这样网站内容和 Markdown 文档天然保持同步，不需要额外后台。

## 需要你修改的地方

- 如果以后绑定自定义域名，可以把 `SITE_URL` 改成你自己的域名
- 把 `src/lib/site.ts` 里的站点标题和描述改成你自己的信息
- 删除示例文章，换成你自己的内容
- 如果需要双端同步，优先参考站内 `/guide/` 的写作规范
- 如果需要长期写作，直接复用 `templates/` 下的文章模板
