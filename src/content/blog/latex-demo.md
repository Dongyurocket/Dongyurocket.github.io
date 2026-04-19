---
title: "LaTeX 公式写作示例"
description: "用纯 Markdown 演示公式写法，更适合网站与公众号双端同步。"
pubDate: 2026-04-17
updatedDate: 2026-04-19
category: "研究"
series: "写作系统"
tags:
  - LaTeX
  - Markdown
  - 数学
wechatReady: true
wechatTitle: "LaTeX 公式写作示例"
wechatDigest: "这篇文章演示如何用纯 Markdown 编写公式，并尽量保持网站和微信公众号双端同步友好。"
---

很多研究类博客都需要公式支持。

如果一篇文章既要放在网站，也想同步到微信公众号，**优先使用纯 Markdown 会更稳妥**。

行内公式示例：质能方程 $E = mc^2$。

块级公式示例：

$$
\int_{0}^{1} x^2 \, dx = \frac{1}{3}
$$

> 如果你经常写推导、实验记录或者算法笔记，直接用 Markdown 写公式会比截图更清晰，也更容易检索。

再来一个常见的优化目标：

$$
\mathcal{L}(\theta) = \sum_{i=1}^{n}
\left( y_i - f(x_i; \theta) \right)^2
$$

如果公式特别复杂，建议在同步到公众号之前，再做一次手机端预览；必要时可以把关键公式单独导出成图片作为兜底方案。

这也是这套博客默认推荐的双端写作方式：**网站吃 Markdown，公众号也尽量复用同一份 Markdown 正文**。
