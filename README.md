# Personal Web

一个以 **长期写作** 为目标的个人博客项目。

它不是单纯的“首页 + 博客列表”，而是一套围绕 **Markdown 写作、长期归档、全文检索、LaTeX 公式、GitHub Pages 部署、微信公众号同步** 组织起来的内容系统。

当前项目已经可用于：

- 本地写作与预览
- 发布到 GitHub Pages
- 使用 Markdown / MDX 写博客
- 使用 LaTeX 编写公式
- 按分类和归档管理文章
- 做全文检索
- 把同一份内容导出为更适合微信公众号排版的 Markdown

---

## 1. 项目定位

这个项目适合下面这类需求：

- 想搭一个长期维护的个人博客
- 想把文章保存在本地 Markdown 文件里，而不是依赖在线后台
- 想写技术文章、研究笔记、项目复盘、阅读记录
- 想让网站和微信公众号尽量共用同一份正文
- 想在以后随时回查、分类、检索自己的内容

这套项目的核心思想是：

> **内容优先放在 Markdown 文件里，网站负责展示和检索，公众号通过导出流程做二次排版。**

---

## 2. 当前已经具备的功能

### 2.1 网站功能

- 首页展示站点定位、精选文章、最近更新、分类导航
- 博客列表页
- 文章详情页
- 分类页
- 归档页
- 关于页
- 微信同步说明页
- 全文检索页

### 2.2 写作功能

- 支持 `.md` 和 `.mdx`
- 支持 Markdown 标题、列表、引用、表格、代码块
- 支持 LaTeX 公式
- 支持插图 / 图片
- 支持草稿控制
- 支持精选文章标记
- 支持系列文章字段
- 支持微信公众号同步专用字段

### 2.3 工作流功能

- 一键本地打开网站
- 一键新建文章模板
- 一键导出公众号版本 Markdown
- 一键构建静态站点
- 自动部署到 GitHub Pages

---

## 3. 技术栈

- **Astro**：静态站点框架
- **Astro Content Collections**：文章内容管理
- **Markdown / MDX**：正文写作格式
- **KaTeX + remark-math + rehype-katex**：公式渲染
- **Pagefind**：全文检索
- **GitHub Pages + GitHub Actions**：线上部署

---

## 4. 项目目录说明

下面是项目里最重要的目录和文件：

```text
.
├─ .github/workflows/
│  └─ deploy.yml                 # GitHub Pages 自动部署工作流
├─ public/
│  ├─ favicon.svg
│  └─ illustrations/             # 站点静态图片、插图
├─ scripts/
│  ├─ local-site.mjs             # 本地一键打开网站
│  ├─ new-post.mjs               # 新建文章模板
│  ├─ export-wechat.mjs          # 导出公众号 Markdown
│  └─ start-local-site.ps1       # Windows 本地启动器
├─ src/
│  ├─ components/                # 组件
│  ├─ content/
│  │  └─ blog/                   # 博客文章内容
│  ├─ layouts/                   # 页面布局
│  ├─ lib/                       # 站点配置、文章工具函数
│  ├─ pages/                     # 路由页面
│  ├─ styles/                    # 全局样式
│  └─ content.config.ts          # 内容模型定义
├─ templates/
│  ├─ blog-post.md               # 默认长期写作模板
│  └─ blog-post.mdx              # 网站专用增强模板
├─ start-local-site.cmd          # Windows 双击启动入口
├─ astro.config.mjs              # Astro 主配置
├─ package.json                  # npm scripts
└─ README.md
```

---

## 5. 先决条件

在本机运行前，请确保你已经安装：

- Node.js
- npm
- Git（如果你要推送到 GitHub）

如果你已经可以在终端运行下面两个命令，就说明环境基本没问题：

```bash
node -v
npm -v
```

---

## 6. 如何打开这个项目的命令行

所有 `npm run ...` 命令，都应该在 **项目根目录** 执行。

也就是在这个文件夹里：

```text
personal web
```

你可以这样打开命令行：

### 方法一：资源管理器里打开

- 进入项目文件夹
- 在空白处按 `Shift + 鼠标右键`
- 选择“在此处打开 PowerShell 窗口”或“在终端中打开”

### 方法二：VS Code

- 用 VS Code 打开整个项目文件夹
- 菜单里打开终端

---

## 7. 安装依赖

首次使用时，先安装依赖：

```bash
npm install
```

---

## 8. 本地运行方式

### 8.1 普通开发模式

```bash
npm run dev
```

默认会启动一个本地开发服务器。

### 8.2 一键本地打开网站

```bash
npm run local
```

这个命令会：

- 检查本地站点是否已经在运行
- 如果没运行，就自动启动本地开发服务器
- 自动打开浏览器

默认打开地址：

```text
http://127.0.0.1:4321/
```

### 8.3 Windows 双击启动

如果你不想手动输命令，可以直接双击：

```text
start-local-site.cmd
```

它会调用 PowerShell 启动器，在 Windows 上更稳。

---

## 9. 常用命令总览

### 9.1 启动本地开发

```bash
npm run dev
```

### 9.2 一键打开本地站点

```bash
npm run local
```

### 9.3 新建文章

```bash
npm run new:post -- "文章标题"
```

也可以自己指定 slug：

```bash
npm run new:post -- "文章标题" custom-slug
```

### 9.4 导出公众号版本

```bash
npm run export:wechat -- 文章slug
```

例如：

```bash
npm run export:wechat -- markdown-and-search
```

### 9.5 构建生产版本

```bash
npm run build
```

### 9.6 本地预览生产版本

```bash
npm run preview
```

---

## 10. 写作入口：文章存放在哪里

你的博客文章都放在：

```text
src/content/blog
```

你可以直接手动创建 `.md` 或 `.mdx` 文件，也可以使用：

```bash
npm run new:post -- "文章标题"
```

自动生成。

---

## 11. 推荐的长期写作流程

这是这个项目最推荐的使用方式：

### 第一步：新建一篇文章

```bash
npm run new:post -- "文章标题"
```

### 第二步：优先使用 Markdown 完成正文

默认推荐：

- 用 `.md`
- 用标准 Markdown 结构
- 尽量少依赖站点专用组件

### 第三步：本地预览

```bash
npm run local
```

用网站检查：

- 标题和摘要是否合适
- 图片显示是否正常
- 分类与标签是否合理
- 公式是否显示正确
- 文章结构是否清晰

### 第四步：需要发公众号时导出

```bash
npm run export:wechat -- 文章slug
```

### 第五步：导入公众号编辑器

把 `exports/wechat` 中导出的 Markdown 拿去公众号 Markdown 编辑器排版，然后再做最终人工检查。

---

## 12. 文章模板

### 12.1 默认长期写作模板

文件：

```text
templates/blog-post.md
```

适合：

- 技术文章
- 研究笔记
- 项目复盘
- 阅读记录
- 想同步到公众号的内容

特点：

- 默认 `wechatReady: true`
- 带摘要字段
- 带系列字段
- 结构是“背景 → 核心内容 → 例子 → 总结”

### 12.2 网站专用 MDX 模板

文件：

```text
templates/blog-post.mdx
```

适合：

- 需要组件增强的文章
- 想做网站专用卡片 / Callout / 更复杂布局

注意：

- 默认 `wechatReady: false`
- 这类文章不建议默认同步到公众号

---

## 13. Frontmatter 字段说明

当前博客文章支持以下 frontmatter 字段：

```yaml
---
title: "文章标题"
description: "文章摘要"
pubDate: 2026-04-19
updatedDate: 2026-04-19
category: "技术"
series: "系列名称"
tags:
  - 标签1
  - 标签2
featured: false
wechatReady: true
wechatTitle: "公众号标题"
wechatDigest: "公众号摘要"
draft: false
---
```

### 字段解释

- `title`
  - 网站文章标题

- `description`
  - 网站摘要

- `pubDate`
  - 发布时间

- `updatedDate`
  - 更新时间，可选

- `category`
  - 分类名称

- `series`
  - 系列名称，可选

- `tags`
  - 标签数组

- `featured`
  - 是否作为精选文章出现在首页

- `wechatReady`
  - 是否适合导出为公众号版本

- `wechatTitle`
  - 公众号导出时使用的标题

- `wechatDigest`
  - 公众号导出时使用的摘要

- `draft`
  - 草稿；为 `true` 时不会出现在公开页面

---

## 14. Markdown 与 MDX 怎么选

### 优先用 Markdown 的情况

推荐优先使用 `.md`：

- 要长期积累
- 要同步微信公众号
- 结构是正常文章
- 不需要特殊组件

### 用 MDX 的情况

推荐用 `.mdx`：

- 明确需要网站专用增强效果
- 想插入 Astro 组件
- 这篇文章主要服务网站，不追求和公众号完全一致

一句话：

> **如果你不确定，就先用 `.md`。**

---

## 15. 公式写法

### 行内公式

```md
$E = mc^2$
```

### 块级公式

```md
$$
\int_0^1 x^2 dx = \frac{1}{3}
$$
```

这个项目已经集成 KaTeX 渲染。

---

## 16. 图片与插图

### 网站图片

现在推荐两种图片组织方式：

#### 方式 A：站点公共图片

这类图片建议放在：

```text
public/
```

例如：

```text
public/illustrations/knowledge-orbit.svg
```

引用方式：

```md
![插图说明](/illustrations/knowledge-orbit.svg)
```

这种方式适合：

- 多篇文章共用的插图
- 首页 / 关于页 / 站点级图片
- 希望直接通过网站根路径访问的静态资源

#### 方式 B：文章私有相对图片

如果图片只属于某一篇文章，推荐放在文章旁边的资源目录中。

例如：

```text
src/content/blog/rich-notes-example.md
src/content/blog/rich-notes-example-files/notebook-workflow.svg
```

正文里这样引用：

```md
![研究笔记工作流示意图](./rich-notes-example-files/notebook-workflow.svg)
```

这种方式适合：

- 单篇文章自己的配图
- 研究笔记里的结构图、实验截图、局部说明图
- 希望“文章和资源放在一起管理”的场景

### 公众号图片建议

公众号最终发布时，建议：

- 保留原图逻辑不变
- 但在公众号后台重新上传图片

原因：

- 这样更稳定
- 更不容易受外链和缓存影响

---

## 17. 微信公众号同步：推荐原则

如果一篇文章既要发网站，也要发微信公众号，建议尽量遵守以下原则：

1. 优先使用 `.md`
2. 优先使用标准 Markdown
3. 标题层级尽量控制在三级以内
4. 提示内容优先写成引用块 `>`
5. 宽表格尽量少用
6. 很长的代码块尽量少用
7. 复杂公式发公众号前建议手机预览
8. 自定义 MDX 组件不要默认用于双端同步

---

## 18. 公众号导出命令怎么用

### 基本命令

```bash
npm run export:wechat -- 文章slug
```

例如文章文件：

```text
src/content/blog/markdown-and-search.md
```

它的 slug 就是：

```text
markdown-and-search
```

所以命令是：

```bash
npm run export:wechat -- markdown-and-search
```

### 导出后文件在哪里

导出结果会写到：

```text
exports/wechat
```

例如：

```text
exports/wechat/markdown-and-search.md
```

### 导出脚本会做什么

导出脚本会自动：

- 去掉 frontmatter
- 使用 `wechatTitle` 或 `title` 作为标题
- 使用 `wechatDigest` 或 `description` 作为摘要
- 把站内根路径链接改为线上绝对地址
- 自动复制文章中的相对图片资源
- 在文末添加原文链接

例如原文里这样写：

```md
![图示](./rich-notes-example-files/notebook-workflow.svg)
```

导出时会自动把图片复制到：

```text
exports/wechat/rich-notes-example-files/notebook-workflow.svg
```

并在导出的 Markdown 中继续保留相对引用。

### 对 MDX 的处理

导出脚本会尽量把简单的 MDX 内容转成普通 Markdown。

例如：

- 移除 `import`
- 移除 `export`
- 尝试把 `Callout` 转成引用块

但如果文章里用了更复杂的组件，仍然建议手动检查导出结果。

---

## 19. 站点页面说明

### 首页

路径：

```text
/
```

用途：

- 站点定位
- 精选文章
- 最近更新
- 分类导航
- 作者与写作节奏

### 博客列表

路径：

```text
/blog/
```

用途：

- 浏览全部文章

### 文章页

路径：

```text
/blog/文章slug/
```

用途：

- 阅读正文
- 查看分类、标签、阅读时长
- 获取公众号导出命令

### 分类页

路径：

```text
/categories/
```

### 归档页

路径：

```text
/archives/
```

### 关于页

路径：

```text
/about/
```

### 微信同步页

路径：

```text
/wechat/
```

### 搜索页

路径：

```text
/search/
```

---

## 20. 搜索说明

项目使用 `Pagefind` 做全文检索。

### 搜索索引何时生成

在执行：

```bash
npm run build
```

之后会自动生成搜索索引。

### 为什么开发模式下搜索可能不可用

因为搜索索引不是在 `dev` 阶段生成的，而是在 `build` 后生成。

如果你要本地验证检索，推荐：

```bash
npm run build
npm run preview
```

### 中文搜索注意事项

`Pagefind` 对中文不会像英文那样做 stemming。

这不是报错，而是正常提示：

- 搜索依然可用
- 只是不会做英文那种词根匹配

---

## 21. GitHub Pages 部署

当前项目已经配置好 GitHub Pages 自动部署。

### 适合的仓库命名

推荐仓库名：

```text
<你的 GitHub 用户名>.github.io
```

例如：

```text
Dongyurocket.github.io
```

### 已配置内容

- 工作流文件：`.github/workflows/deploy.yml`
- 推送到 `main` 自动触发部署
- 发布地址按用户名自动计算

### 部署后访问

例如当前项目：

```text
https://dongyurocket.github.io/
```

---

## 22. 本地改配置时，最常改的地方

### 22.1 改站点标题和介绍

文件：

```text
src/lib/site.ts
```

你通常会改：

- `SITE_TITLE`
- `SITE_DESCRIPTION`
- `AUTHOR`
- `NAV_LINKS`

### 22.2 改站点域名

本项目默认会根据 GitHub Pages 自动生成站点地址。

如果以后绑定自定义域名，可以通过环境变量 `SITE_URL` 调整。

### 22.3 改首页文案

文件：

```text
src/pages/index.astro
```

### 22.4 改关于页

文件：

```text
src/pages/about.astro
```

### 22.5 改微信同步说明

文件：

```text
src/pages/wechat.astro
```

---

## 23. 一个完整的使用示例

假设你要写一篇文章：

```text
如何建立长期写作系统
```

### 第一步：新建文章

```bash
npm run new:post -- "如何建立长期写作系统"
```

### 第二步：编辑文章

打开 `src/content/blog` 里刚生成的文件，开始写正文。

### 第三步：本地预览

```bash
npm run local
```

### 第四步：检查页面效果

看：

- 首页是否显示
- 文章页是否正常
- 分类和标签是否合理
- 公式和图片是否正常

### 第五步：导出公众号版本

假设生成的 slug 是：

```text
writing-system
```

那么运行：

```bash
npm run export:wechat -- writing-system
```

### 第六步：导入公众号编辑器

把 `exports/wechat/writing-system.md` 拿去公众号 Markdown 编辑器做最终排版。

---

## 24. 当前项目里已经有的示例文章

目前仓库里已经有一些示例文章，可直接参考：

- `src/content/blog/welcome.md`
- `src/content/blog/markdown-and-search.md`
- `src/content/blog/latex-demo.md`
- `src/content/blog/rich-notes-example.md`

这些示例展示了：

- 普通长期写作文章
- Markdown 驱动博客的写法
- 公式写法
- 公众号友好字段的使用方式
- 相对图片资源的写法

---

## 25. 常见问题

### Q1：这些命令要在哪运行？

在 **项目根目录** 运行，也就是这个项目文件夹里。

### Q2：`文章slug` 是什么？

通常就是文章文件名（不带扩展名）。

例如：

```text
src/content/blog/markdown-and-search.md
```

它的 slug 是：

```text
markdown-and-search
```

### Q3：本地能看，但搜索页没有结果？

先执行：

```bash
npm run build
npm run preview
```

因为搜索索引是在构建后生成的。

### Q4：所有文章都适合同步公众号吗？

不一定。

如果文章依赖：

- 复杂 MDX 组件
- 特殊交互
- 网站专用布局

就不建议默认同步。

### Q5：公众号版能完全等同网站版吗？

通常不能完全像素级一致。

更现实的目标是：

- 网站和公众号尽量共用同一份正文
- 最终在公众号里做少量人工排版修正

---

## 26. 建议你接下来做的事

如果你准备开始长期使用这个博客，推荐按下面顺序做：

1. 修改 `src/lib/site.ts` 里的站点标题、作者信息和描述
2. 修改首页文案，让它更像你自己的站点
3. 删除示例文章，换成你的第一批正式文章
4. 优先用 `npm run new:post -- "文章标题"` 开始写
5. 发布到 GitHub Pages 后，把导出流程纳入你的公众号工作流

---

## 27. 一句话总结

这个项目最适合的使用方式不是“做一个漂亮首页就结束”，而是：

> **把它当成一套长期写作与多端发布系统，用 Markdown 沉淀内容，用网站做归档和检索，用导出流程服务微信公众号。**
