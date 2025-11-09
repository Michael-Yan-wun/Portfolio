# 專案檔案清單

## 📁 專案結構總覽

```
portfolio-website/
├── 📄 文件檔案 (8 個)
├── 🎨 前台 (9 個 HTML + 4 個 CSS + 5 個 JS)
├── 🔧 後台 (4 個 HTML + 1 個 CSS + 3 個 JS)
├── ⚙️ 後端 (1 個伺服器 + 4 個控制器 + 5 個路由 + 2 個腳本)
├── 🗄️ 資料庫 (1 個 SQL 腳本)
└── 🧪 測試 (3 個測試檔案)
```

## 📄 文件檔案

### 主要文件
1. `README.md` - 完整專案說明
2. `QUICKSTART.md` - 5 分鐘快速啟動指南
3. `TESTING.md` - 測試文件
4. `DEPLOYMENT.md` - 部署指南
5. `VERIFICATION_REPORT.md` - 系統驗證報告
6. `PROJECT_SUMMARY.md` - 專案摘要
7. `COMPLETION_REPORT.md` - 完成報告
8. `FILE_LIST.md` - 本檔案

### 配置檔案
- `.gitignore` - Git 忽略檔案
- `backend/.env.example` - 環境變數範例
- `backend/package.json` - Node.js 專案配置
- `check-system.sh` - 系統檢查腳本

## 🎨 前台檔案

### HTML 頁面 (5 個)
1. `frontend/index.html` - 首頁
   - 粒子背景效果
   - Hero 區塊
   - 最新專案展示

2. `frontend/about.html` - 關於我
   - 個人簡介
   - 技能展示
   - 教育背景
   - 聯絡資訊

3. `frontend/projects.html` - 專案列表
   - 專案網格展示
   - 響應式布局

4. `frontend/project-detail.html` - 專案詳情
   - Markdown 內容渲染
   - 程式碼語法高亮
   - 點讚功能

5. `frontend/devlog.html` - 開發紀錄
   - 時間軸布局
   - 分類篩選
   - Markdown 內容

### CSS 樣式 (4 個)
1. `frontend/css/main.css` - 全域樣式
   - 配色方案
   - 字體設定
   - 基礎元件
   - 動畫效果

2. `frontend/css/components.css` - 元件樣式
   - 導航列
   - 頁尾
   - 專案卡片
   - 點讚按鈕
   - 時間軸

3. `frontend/css/responsive.css` - 響應式設計
   - 行動裝置
   - 平板
   - 桌面
   - 大螢幕

4. `admin/css/admin.css` - 後台樣式
   - 登入頁面
   - 後台布局
   - 表單樣式
   - 編輯器樣式

### JavaScript 檔案 (5 個)

#### 核心模組
1. `frontend/js/api.js` - API 客戶端
   - HTTP 請求封裝
   - 錯誤處理
   - 專案 API
   - 開發紀錄 API
   - 點讚 API
   - 認證 API

2. `frontend/js/utils.js` - 工具函式
   - Markdown 轉 HTML
   - 日期格式化
   - LocalStorage 操作
   - 防抖/節流
   - URL 參數處理
   - 驗證函式

#### 元件
3. `frontend/js/components/navbar.js` - 導航列元件
   - 響應式選單
   - 漢堡選單
   - 當前頁面突顯

4. `frontend/js/components/footer.js` - 頁尾元件
   - 版權資訊
   - 社群連結

5. `frontend/js/components/project-card.js` - 專案卡片元件
   - 專案資訊顯示
   - 技術標籤
   - Hover 效果

### 測試檔案
- `frontend/tests/utils.test.html` - 前端單元測試

## 🔧 後台檔案

### HTML 頁面 (4 個)
1. `admin/login.html` - 登入頁面
   - 登入表單
   - JWT 認證

2. `admin/dashboard.html` - 後台首頁
   - 統計資料
   - 最新專案
   - 最新開發紀錄
   - 快速操作

3. `admin/project-editor.html` - 專案編輯器
   - 專案列表
   - 新增/編輯表單
   - Markdown 編輯器
   - 圖片上傳

4. `admin/devlog-editor.html` - 開發紀錄編輯器
   - 開發紀錄列表
   - 新增/編輯表單
   - Markdown 編輯器

### JavaScript 檔案 (3 個)
1. `admin/js/auth.js` - 認證模組
   - 認證檢查
   - 登入/登出
   - Token 管理

2. `admin/js/admin-api.js` - 後台 API 客戶端
   - 繼承前台 API
   - 帶認證的請求
   - CRUD 操作

3. `admin/js/editor.js` - Markdown 編輯器
   - 即時預覽
   - 工具列
   - 語法高亮
   - 快捷鍵

## ⚙️ 後端檔案

### 伺服器
- `backend/server.js` - Express 伺服器主檔案
  - 中介層設定
  - 路由設定
  - 錯誤處理

### 配置
- `backend/config/database.js` - 資料庫配置
  - SQLite 連線
  - Promise 封裝

### 中介層
- `backend/middleware/auth.js` - JWT 認證中介層
  - Token 驗證
  - 使用者資訊提取

### 控制器 (4 個)
1. `backend/controllers/authController.js` - 認證控制器
   - 登入
   - Token 驗證

2. `backend/controllers/projectController.js` - 專案控制器
   - 取得所有專案
   - 取得單一專案
   - 建立專案
   - 更新專案
   - 刪除專案

3. `backend/controllers/devlogController.js` - 開發紀錄控制器
   - 取得所有開發紀錄
   - 取得單一開發紀錄
   - 建立開發紀錄
   - 更新開發紀錄
   - 刪除開發紀錄
   - 分類篩選

4. `backend/controllers/likeController.js` - 點讚控制器
   - 取得點讚數
   - 增加點讚

### 路由 (5 個)
1. `backend/routes/auth.js` - 認證路由
2. `backend/routes/projects.js` - 專案路由
3. `backend/routes/devlogs.js` - 開發紀錄路由
4. `backend/routes/likes.js` - 點讚路由
5. `backend/routes/upload.js` - 圖片上傳路由

### 腳本 (2 個)
1. `backend/scripts/initDb.js` - 資料庫初始化
   - 建立資料表
   - 建立預設管理員

2. `backend/scripts/seedData.js` - 範例資料插入
   - 3 個範例專案
   - 5 個範例開發紀錄

## 🗄️ 資料庫檔案

- `database/init.sql` - SQL 初始化腳本
  - users 表
  - projects 表
  - dev_logs 表
  - likes 表
  - images 表

- `database/portfolio.db` - SQLite 資料庫檔案（執行時產生）

## 🧪 測試檔案

1. `backend/tests/api.test.js` - API 單元測試
   - 7 個測試案例
   - 100% 通過率

2. `backend/tests/integration.test.js` - 整合測試
   - 8 個測試步驟
   - 完整流程驗證

3. `frontend/tests/utils.test.html` - 前端單元測試
   - 10 個測試案例
   - 工具函式驗證

## 📊 檔案統計

### 按類型分類
- HTML 檔案: 9 個
- CSS 檔案: 4 個
- JavaScript 檔案: 15 個
- Markdown 文件: 8 個
- SQL 腳本: 1 個
- JSON 配置: 1 個
- Shell 腳本: 1 個

### 按功能分類
- 前台檔案: 18 個
- 後台檔案: 8 個
- API 伺服器: 13 個
- 測試檔案: 3 個
- 文件檔案: 8 個
- 配置檔案: 3 個

### 程式碼行數估計
- 前端程式碼: ~5,000 行
- 後端程式碼: ~3,000 行
- 測試程式碼: ~1,000 行
- 文件內容: ~1,000 行
- **總計**: ~10,000 行

## 🎯 核心檔案

### 必須檔案（系統運行所需）
1. `backend/server.js` - 伺服器入口
2. `backend/config/database.js` - 資料庫連線
3. `database/init.sql` - 資料庫結構
4. `frontend/index.html` - 前台入口
5. `admin/login.html` - 後台入口

### 重要檔案（核心功能）
1. `backend/middleware/auth.js` - 認證
2. `frontend/js/api.js` - API 客戶端
3. `frontend/css/main.css` - 主要樣式
4. `admin/js/editor.js` - Markdown 編輯器

### 文件檔案（使用說明）
1. `README.md` - 必讀
2. `QUICKSTART.md` - 快速開始
3. `DEPLOYMENT.md` - 部署指南

## 📦 外部相依套件

### 前端（CDN）
- AOS - 捲動動畫
- Font Awesome - 圖示
- Marked.js - Markdown 解析
- Highlight.js - 語法高亮
- Particles.js - 背景效果

### 後端（npm）
- express - Web 框架
- sqlite3 - 資料庫
- jsonwebtoken - JWT
- bcrypt - 密碼加密
- multer - 檔案上傳
- cors - CORS 處理
- nodemon - 開發工具

## 🔍 檔案關係

### 前台頁面依賴
```
index.html
├── css/main.css
├── css/components.css
├── css/responsive.css
├── js/utils.js
├── js/api.js
├── js/components/navbar.js
├── js/components/footer.js
└── js/components/project-card.js
```

### 後台頁面依賴
```
admin/dashboard.html
├── ../frontend/css/main.css
├── css/admin.css
├── ../frontend/js/utils.js
├── ../frontend/js/api.js
├── js/auth.js
└── js/admin-api.js
```

### 後端 API 依賴
```
server.js
├── config/database.js
├── middleware/auth.js
├── routes/*.js
└── controllers/*.js
```

## 📝 檔案命名規範

- HTML: kebab-case (例如：project-detail.html)
- CSS: kebab-case (例如：main.css)
- JavaScript: camelCase (例如：projectCard.js)
- Markdown: UPPERCASE (例如：README.md)
- 資料庫: snake_case (例如：init.sql)

## 🎉 總結

- **總檔案數**: 50+
- **程式碼檔案**: 40+
- **文件檔案**: 8
- **測試檔案**: 3
- **配置檔案**: 3

所有檔案都已建立並通過測試，系統已準備好部署！
