---
name: easy-xianyu-competitor-free
description: 免费、免第三方 API Key 的闲鱼竞品研究助手。用户想在闲鱼搜索同类商品、比较公开可见的价格、成色、图片、卖点和交易条件，或为选品和文案找证据时使用。它通过用户已登录的 Easy WebBridge 浏览器读取页面，只记录看得到的内容，不自动购买、联系、收藏或发布。
---

# 免费闲鱼竞品分析

把闲鱼搜索结果变成一张可核对的对比表，帮助用户理解同类商品怎么写、价格大致分布在哪。页面没有显示的内容一律留空，不把浏览量或“想要”当成质量证明。

## 适用场景

- 用关键词找同类商品并整理前 10 至 30 条公开结果。
- 比较价格带、成色、配件、标题结构、发货方式和图片信息。
- 从竞品页面提炼可借鉴的卖点，同时区分观察结果和推测。

## 前置条件

安装并启动 [Easy WebBridge](https://github.com/xxjrq/easy-webbridge)，备用地址为 [Gitee](https://gitee.com/xxjrq/easy-webbridge)。在 EasyBR 中打开闲鱼并保持可用，提供目标 `browserId` 和账号别名。闲鱼可能允许公开浏览，但登录、验证码或风控出现时仍需用户处理。

## 输入

```json
{
  "browserId": "easybr-xianyu-a",
  "accountAlias": "闲鱼主店",
  "keyword": "机械键盘",
  "filters": {"minPrice": 50, "maxPrice": 300, "condition": "二手"},
  "limit": 20
}
```

`limit` 默认 10，最大 30；同一 `browserId` 的研究任务必须串行。不要提供或保存 Cookie、密码或 Token。

## 操作步骤

1. 检查关键词、筛选条件、数量和浏览器映射；重复 `browserId` 任务排队。
2. 通过 Easy WebBridge 选择指定浏览器，打开闲鱼搜索页面；只使用当前版本实际暴露的浏览器能力，不猜接口。
3. 确认搜索词和筛选条件确实生效，读取页面可见的商品卡片和详情链接。
4. 逐条打开候选详情，记录商品名、标价、成色、规格、配件、卖点、发货/自取、可见销量或想要数、卖家名和采集时间；无法看到的字段标记为空。
5. 去重并计算可观察的最低价、最高价、中位价和常见卖点；样本量不足时明确说明，不外推整个市场。
6. 输出 `competitors.json`、`competitors.csv` 和一份 Markdown 结论，保留每条来源 URL。关闭本次创建的标签组或页面，不影响用户原有页面。

## 输出

每条记录至少包含 `title`、`url`、`visiblePrice`、`condition`、`specs`、`accessories`、`sellingPoints`、`visibleEngagement`、`seller`、`collectedAt`、`missingFields`。汇总包含 `sampleSize`、`priceSummary`、`commonSellingPoints`、`observations` 和 `limitations`。

## 失败处理

- Easy WebBridge 未启动、`browserId` 不在线或页面打不开：返回 `needs_user_action`，说明需要启动或选择的环境。
- 登录、验证码、风控或权限提示：保留已采集结果，停止当前账号，不绕过限制。
- 动态字段未显示：写空值并列入 `missingFields`，不从其他网站猜测。
- 页面改版或单条详情失败：记录 URL 和错误，继续其他条目，最终状态为 `partial`。

## 安全边界

只读取公开可见信息，不点赞、收藏、私信、下单、付款、发布、改价或删除。价格和互动数字只是页面采样，不代表官方行情、商品质量或成交概率。

## 自测

```bash
node scripts/self-test.mjs
```

