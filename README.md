# 1258碳循环计算器

中文健身工具站，面向减脂用户，生成高碳/中碳/低碳碳循环计划。

## 功能
- BMR 与 TDEE 计算
- 每日基础碳水、脂肪、固定蛋白质
- 高/中/低碳日宏量与热量
- 每周碳循环日分配说明
- 食物碳水换算示例
- 结果复制与 JSON 导出

## 技术栈
- React + TypeScript + Vite
- Tailwind CSS
- React Hook Form + Zod
- Zustand
- Recharts
- Vitest

## 运行环境要求
- Node.js 18+（推荐 18 LTS 或 20 LTS）
- npm 9+

## 本地开发与调试

### 1. 安装依赖
```bash
npm install
```

### 2. 本地开发
```bash
npm run dev
```
- 终端会输出本地访问地址（通常是 `http://localhost:5173`）。
- 这是单页应用（SPA），请通过开发服务器访问，直接双击打开 `index.html` 不会渲染。

### 3. 构建生产版本
```bash
npm run build
```
构建产物在 `dist/` 目录。

### 4. 本地预览生产构建
```bash
npm run preview
```
- 默认地址：`http://localhost:4173`

### 5. 运行测试
```bash
npm run test
```

## 本地部署（静态托管）
项目是纯前端静态站点，构建后可部署到任意静态托管服务。

### 步骤
1. 构建：`npm run build`
2. 将 `dist/` 目录内容上传到你的静态服务器根目录
3. 配置 SPA 重定向（见下文）

### SPA 刷新说明
项目使用 React Router，刷新或直链访问非首页需要重定向到 `index.html`。

本项目已提供 Cloudflare Pages 规则：
`public/_redirects`
```txt
/* /index.html 200
```

若部署到其他平台，请配置等价规则。

## Cloudflare Pages 部署（推荐）

### 方式 A：连接 Git 仓库自动部署
1. 在 Cloudflare Pages 创建新项目
2. 选择你的 GitHub/GitLab 仓库
3. 构建设置：
   - Build command: `npm run build`
   - Build output directory: `dist`
4. 保存并开始部署

### 方式 B：本地构建后上传
1. 本地构建：`npm run build`
2. 将 `dist/` 目录上传到 Cloudflare Pages 站点

### SPA 刷新配置（Cloudflare Pages）
项目已在 `public/_redirects` 写入规则：
```txt
/* /index.html 200
```
Cloudflare Pages 会自动读取该文件。

## SEO 配置
- 每页独立 title / description（`src/config/site.ts`）
- `public/robots.txt`
- `public/sitemap.xml`

注意：
- `public/sitemap.xml` 与 `public/robots.txt` 里的域名为 `https://example.com`，部署后请替换为真实域名。

## 生产环境检查清单
- [ ] `npm run build` 通过
- [ ] `dist/` 生成成功
- [ ] 站点可通过 SPA 刷新访问非首页
- [ ] `robots.txt` 与 `sitemap.xml` 域名已替换
- [ ] favicon 正常显示

## 常见问题

### Q1：打开 `index.html` 是空白？
这是 SPA，内容由 JavaScript 注入。必须通过开发服务器或部署后的静态服务器访问。

### Q2：刷新 `/result` 变 404？
需要配置 SPA 重定向。Cloudflare Pages 已通过 `public/_redirects` 处理。

### Q3：测试报 `spawn EPERM`？
这通常是环境权限限制导致子进程无法启动。请在本地终端运行 `npm run test`。

## 后续扩展建议
- 提供多套策略模板（增肌、维持）
- 支持目标体重与周期设定
- 增加图表导出与分享卡片
- 结合训练日历自动排程

