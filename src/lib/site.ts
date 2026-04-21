export const SITE_TITLE = 'Eason 的知识花园';
export const SITE_DESCRIPTION =
  '围绕技术、研究、写作与个人成长展开的长期博客，也是面向微信公众号同步的一份内容母稿。';

export const AUTHOR = {
  name: 'Eason',
  role: '长期写作者 / 技术与研究记录者',
  bio: '把零散的想法、研究笔记、项目复盘和生活观察，整理成长期可检索、可复用、可同步的知识积累。',
  location: '中国',
  github: 'https://github.com/Dongyurocket',
  site: 'https://dongyurocket.github.io',
};

export const HOME_HIGHLIGHTS = [
  {
    title: '长期写作',
    description: '把博客当作长期积累，而不是一次性发布页面。',
  },
  {
    title: 'Blog / Notes 分层',
    description: '公开文章放在 blog，私有或草稿笔记放在 notes，避免内容边界混乱。',
  },
  {
    title: '双端同步',
    description: '尽量保持网站与微信公众号使用同一份正文，减少重复排版。',
  },
];

export const WRITING_WORKFLOW = [
  '公开文章用 `npm run new:post -- "文章标题"`，私有或草稿笔记用 `npm run new:note -- "笔记标题"`',
  '公开内容写在 `src/content/blog`，私有笔记写在 `src/content/notes`',
  '优先用 `.md` 写正文，把特殊交互留给少数网站专用文章',
  '需要公开发布时，再把 notes 整理到 blog；需要发公众号时，只导出 blog 文章',
];

export const WECHAT_SYNC_RULES = [
  '优先使用标准 Markdown 结构：标题、段落、列表、引用、图片、代码块',
  '默认使用三层以内标题层级，避免手机端阅读层级过深',
  '复杂提示框优先改写成引用块，避免依赖站点专用组件',
  '本地图片尽量放在 `public/` 下，并在导出时改成站点绝对地址',
  '复杂公式、宽表格、长代码块发公众号前建议做一次手机预览',
];

export const NAV_LINKS = [
  { href: '/', label: '首页' },
  { href: '/blog/', label: '博客' },
  { href: '/archives/', label: '归档' },
  { href: '/categories/', label: '分类' },
  { href: '/about/', label: '关于' },
  { href: '/search/', label: '检索' },
];
