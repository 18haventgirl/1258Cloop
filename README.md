# 1258 碳循环计算器

中文健身工具站，面向减脂用户，生成高碳/中碳/低碳碳循环计划。

---

## 你能做什么
- 计算 BMR 与 TDEE
- 输出每日基础碳水、脂肪、固定蛋白质
- 生成高碳/中碳/低碳日宏量与热量
- 给出每周碳循环安排说明
- 提供食物碳水换算示例
- 一键复制结果 / 导出 JSON

---

## 使用方式（推荐）
### 在线使用
部署完成后，直接访问 Cloudflare Pages 给你的网址即可。

### 本地使用
```bash
npm install
npm run dev
```
然后打开终端提示的地址（通常是 `http://localhost:5173`）。

> 说明：这是单页应用（SPA），不要双击 `index.html` 打开。

---

## 本地开发与调试（详细步骤）

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```
- 终端会输出本地访问地址
- 修改代码会自动热更新

### 3. 构建生产版本
```bash
npm run build
```
构建产物会输出到 `dist/`。

### 4. 本地预览生产构建
```bash
npm run preview
```
默认地址：`http://localhost:4173`

### 5. 运行测试
```bash
npm run test
```

---

## Cloudflare Pages 部署（详细、舒适版）

> 目标：让网站上线，并能稳定访问 `/calculator`、`/result` 等子路由。

### A. 连接 Git 仓库（推荐）
1. 打开 Cloudflare 控制台，进入 `Pages`。
2. 点击 `Create a project`。
3. 选择 `Connect to Git`，然后选择你的仓库 `18haventgirl/1258Cloop`。
4. 构建配置填写如下：
   - Framework preset：`None`（没有 Vite 就选 None）
   - Build command：`npm run build`
   - Build output directory：`dist`
   - Root directory：留空
5. 点击 `Save and Deploy`，等待构建完成。
6. 成功后会得到一个默认域名，点击即可访问。

### B. 本地构建后上传（不推荐，但也可用）
1. 本地执行 `npm run build`
2. 上传 `dist/` 目录内容到你的静态托管服务
3. 配置 SPA 重定向（见下文）

---

## SPA 刷新说明（重要）
本项目使用 React Router，刷新或直链访问子路由时需要重定向到 `index.html`。

已内置 Cloudflare Pages 规则：
`public/_redirects`
```
/* /index.html 200
```
Cloudflare 会自动读取该文件，无需额外配置。

---

## SEO 配置
- 每页独立 title / description：`src/config/site.ts`
- `public/robots.txt`
- `public/sitemap.xml`

部署后请记得修改：
- `public/robots.txt` 和 `public/sitemap.xml` 中的域名（目前是 `https://example.com`）

---

## 生产上线前检查清单
- [ ] `npm run build` 成功
- [ ] Cloudflare Pages 构建通过
- [ ] `/calculator` 和 `/result` 刷新不会 404
- [ ] favicon 正常显示
- [ ] sitemap 和 robots 域名已替换

---

## 常见问题

### Q1：为什么打开 `index.html` 是空白？
这是 SPA，内容由 JavaScript 动态渲染，必须通过开发服务器或部署后的站点访问。

### Q2：刷新 `/result` 变 404？
需要 SPA 重定向规则，本项目已在 `public/_redirects` 配置。

### Q3：构建命令要写 `npm run build` 还是 `npm run pages:build`？
本项目没有 `pages:build` 脚本，正确命令是：
```
npm run build
```

---

## 后续扩展建议
- 提供多套策略模板（增肌、维持）
- 支持目标体重与周期设定
- 增加图表导出与分享卡片
- 结合训练日历自动排程
