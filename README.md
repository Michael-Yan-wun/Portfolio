# 開發者作品集網站

一個為學生開發者設計的個人作品集與開發紀錄網站系統，包含前台展示網頁和後台管理系統。

## 功能特色

### 前台功能
- 🎨 科技感紫色系設計（類似 Kiro 品牌）
- 📱 完整響應式設計（支援 320px - 1920px）
- 🏠 首頁：粒子背景效果、個人介紹
- 👤 關於我：個人簡介、技能展示、教育背景、聯絡資訊
- 💼 專案作品：專案列表、專案詳情、技術標籤
- 📝 開發紀錄：時間軸展示、分類篩選、Markdown 內容
- ❤️ 點讚系統：支援專案和開發紀錄點讚
- 🎭 動畫效果：AOS 捲動動畫、Particles.js 背景

### 後台功能
- 🔐 JWT 身份驗證
- 📊 統計儀表板
- ✏️ Markdown 編輯器（即時預覽、工具列）
- 🖼️ 圖片上傳管理
- 📦 專案 CRUD 操作
- 📖 開發紀錄 CRUD 操作

## 技術棧

### 前端
- HTML5、CSS3、JavaScript (ES6+)
- 外部套件（CDN）：
  - AOS - 捲動動畫
  - Font Awesome - 圖示庫
  - Marked.js - Markdown 解析
  - Highlight.js - 程式碼語法高亮
  - Particles.js - 背景粒子效果

### 後端
- Node.js + Express.js
- SQLite3 資料庫
- JWT 身份驗證
- bcrypt 密碼加密
- multer 檔案上傳

## 專案結構

```
portfolio-website/
├── frontend/              # 前台網頁
│   ├── index.html        # 首頁
│   ├── about.html        # 關於我
│   ├── projects.html     # 專案列表
│   ├── project-detail.html  # 專案詳情
│   ├── devlog.html       # 開發紀錄
│   ├── css/              # 樣式檔案
│   ├── js/               # JavaScript 檔案
│   └── assets/           # 靜態資源
├── admin/                # 後台管理系統
│   ├── login.html        # 登入頁面
│   ├── dashboard.html    # 後台首頁
│   ├── project-editor.html   # 專案編輯器
│   ├── devlog-editor.html    # 開發紀錄編輯器
│   ├── css/              # 後台樣式
│   └── js/               # 後台 JavaScript
├── backend/              # 後端 API
│   ├── server.js         # 伺服器入口
│   ├── config/           # 配置檔案
│   ├── middleware/       # 中介層
│   ├── routes/           # 路由
│   ├── controllers/      # 控制器
│   ├── models/           # 資料模型
│   └── uploads/          # 上傳檔案目錄
└── database/             # 資料庫
    ├── portfolio.db      # SQLite 資料庫
    └── init.sql          # 初始化腳本
```

## 安裝與執行

### 1. 安裝相依套件

```bash
cd backend
npm install
```

### 2. 初始化資料庫

```bash
npm run init-db
```

這會建立資料庫並建立預設管理員帳號：
- 使用者名稱：`admin`
- 密碼：`admin123`

### 3. 啟動伺服器

```bash
# 開發模式（使用 nodemon）
npm run dev

# 生產模式
npm start
```

伺服器將在 `http://localhost:3000` 啟動。

### 4. 訪問網站

- 前台網站：`http://localhost:3000/`
- 後台管理：`http://localhost:3000/admin/login.html`

## API 端點

### 認證 API
- `POST /api/auth/login` - 登入
- `POST /api/auth/verify` - 驗證 token

### 專案 API
- `GET /api/projects` - 取得所有專案
- `GET /api/projects/:id` - 取得單一專案
- `POST /api/projects` - 建立專案（需認證）
- `PUT /api/projects/:id` - 更新專案（需認證）
- `DELETE /api/projects/:id` - 刪除專案（需認證）

### 開發紀錄 API
- `GET /api/devlogs` - 取得所有開發紀錄
- `GET /api/devlogs/:id` - 取得單一開發紀錄
- `POST /api/devlogs` - 建立開發紀錄（需認證）
- `PUT /api/devlogs/:id` - 更新開發紀錄（需認證）
- `DELETE /api/devlogs/:id` - 刪除開發紀錄（需認證）

### 點讚 API
- `GET /api/likes/:itemType/:itemId` - 取得點讚數
- `POST /api/likes/:itemType/:itemId` - 增加點讚

### 圖片上傳 API
- `POST /api/upload` - 上傳圖片（需認證）

## 資料庫結構

### users 表
- id, username, password_hash, created_at

### projects 表
- id, title, description, content, technologies, thumbnail_url, demo_url, repo_url, created_at, updated_at

### dev_logs 表
- id, title, content, category, tags, created_at, updated_at

### likes 表
- id, item_type, item_id, count

### images 表
- id, filename, filepath, item_type, item_id, uploaded_at

## 使用說明

### 後台管理

1. 使用預設帳號登入後台
2. 在儀表板查看統計資訊
3. 進入專案管理或開發紀錄管理
4. 使用 Markdown 編輯器撰寫內容
5. 上傳專案截圖
6. 儲存後即可在前台查看

### 前台瀏覽

1. 訪問首頁查看整體介紹
2. 瀏覽專案作品頁面
3. 點擊專案卡片查看詳情
4. 閱讀開發紀錄
5. 使用分類篩選功能
6. 為喜歡的內容點讚

## 配色方案

```css
--primary: #9b87f5;          /* Kiro 紫 */
--primary-dark: #7c3aed;     /* 深紫 */
--primary-darker: #6d28d9;   /* 更深紫 */
--primary-light: #c4b5fd;    /* 淺紫 */
--secondary: #ec4899;        /* 粉紅 */
--accent: #06b6d4;           /* 青色 */
--bg-dark: #0f0f1e;          /* 深色背景 */
--bg-card: #1a1a2e;          /* 卡片背景 */
```

## 環境變數

可以在 `backend` 目錄建立 `.env` 檔案：

```
JWT_SECRET=your_secret_key_here
PORT=3000
NODE_ENV=development
```

## 安全性注意事項

1. **修改預設密碼**：首次登入後請立即修改管理員密碼
2. **JWT Secret**：生產環境請使用強隨機字串
3. **CORS 設定**：根據需求調整允許的來源
4. **檔案上傳**：已限制檔案類型和大小（5MB）

## 部署建議

### 前端
- 可部署到 Netlify、Vercel、GitHub Pages 等靜態主機
- 需要調整 API baseURL 指向後端伺服器

### 後端
- 可部署到 Heroku、Railway、VPS 等 Node.js 主機
- SQLite 資料庫檔案會隨應用一起部署
- 記得設定環境變數

## 瀏覽器支援

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

## 授權

MIT License

## 作者

學生開發者作品集系統

## 更新日誌

### v1.0.0 (2024)
- 初始版本發布
- 完整的前後台功能
- JWT 認證系統
- Markdown 編輯器
- 點讚系統
- 響應式設計
