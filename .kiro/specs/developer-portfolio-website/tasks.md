# 實作任務清單

- [x] 1. 建立專案結構和後端基礎設施
  - 建立目錄結構（frontend、admin、backend、database）
  - 初始化 Node.js 專案和安裝相依套件
  - 建立 SQLite 資料庫初始化腳本
  - 執行資料庫初始化，建立所有資料表
  - 建立預設管理員帳號
  - _需求: 14.1, 14.2, 14.5, 15.1_

- [x] 2. 實作後端 API 伺服器核心功能
  - [x] 2.1 建立 Express 伺服器和基礎配置
    - 實作 server.js 主檔案
    - 設定 CORS 和 JSON 解析中介層
    - 建立資料庫連線模組
    - 設定靜態檔案服務（uploads 目錄）
    - _需求: 14.3, 14.4_
  
  - [x] 2.2 實作 JWT 認證系統
    - 建立 JWT 中介層驗證函式
    - 實作登入 API（POST /api/auth/login）
    - 實作 token 驗證 API（POST /api/auth/verify）
    - 使用 bcrypt 加密密碼
    - _需求: 10.1, 10.2, 10.3, 10.4_
  
  - [x] 2.3 實作專案管理 API
    - 建立專案 Controller 和 Routes
    - 實作取得所有專案 API（GET /api/projects）
    - 實作取得單一專案 API（GET /api/projects/:id）
    - 實作建立專案 API（POST /api/projects，需認證）
    - 實作更新專案 API（PUT /api/projects/:id，需認證）
    - 實作刪除專案 API（DELETE /api/projects/:id，需認證）
    - _需求: 4.1, 4.2, 9.2, 9.3, 13.1_
  
  - [x] 2.4 實作開發紀錄管理 API
    - 建立開發紀錄 Controller 和 Routes
    - 實作取得所有開發紀錄 API（GET /api/devlogs）
    - 實作取得單一開發紀錄 API（GET /api/devlogs/:id）
    - 實作建立開發紀錄 API（POST /api/devlogs，需認證）
    - 實作更新開發紀錄 API（PUT /api/devlogs/:id，需認證）
    - 實作刪除開發紀錄 API（DELETE /api/devlogs/:id，需認證）
    - 支援分類和標籤篩選查詢參數
    - _需求: 5.1, 5.5, 9.2, 9.4, 13.2_
  
  - [x] 2.5 實作點讚系統 API
    - 建立點讚 Controller 和 Routes
    - 實作取得點讚數 API（GET /api/likes/:itemType/:itemId）
    - 實作增加點讚 API（POST /api/likes/:itemType/:itemId）
    - 確保點讚計數正確更新
    - _需求: 12.1, 12.2, 12.3_
  
  - [x] 2.6 實作圖片上傳 API
    - 使用 multer 處理檔案上傳
    - 實作圖片上傳 API（POST /api/upload，需認證）
    - 限制檔案類型（jpg, png, gif, webp）和大小（5MB）
    - 儲存圖片到 uploads 目錄
    - 回傳圖片 URL
    - _需求: 9.5_

- [x] 3. 建立前台共用元件和樣式
  - [x] 3.1 建立全域 CSS 樣式
    - 實作 main.css（配色方案、字體、基礎樣式）
    - 實作 components.css（元件樣式）
    - 實作 responsive.css（響應式斷點）
    - 引入 Google Fonts（Inter、Fira Code）
    - _需求: 1.1, 1.2, 1.4, 6.1_
  
  - [x] 3.2 實作 Navbar 元件
    - 建立 navbar.js 類別
    - 實作導航列 HTML 結構
    - 實作當前頁面突顯功能
    - 實作響應式漢堡選單（行動裝置）
    - 實作固定在頂部的效果
    - _需求: 2.1, 2.2, 2.3, 2.4, 2.5, 15.2_
  
  - [x] 3.3 實作 Footer 元件
    - 建立 footer.js 類別
    - 實作頁尾 HTML 結構
    - 加入版權資訊和社群媒體連結
    - _需求: 3.4, 15.3_
  
  - [x] 3.4 實作 Project Card 元件
    - 建立 project-card.js 類別
    - 實作專案卡片 HTML 結構
    - 實作技術標籤渲染
    - 實作 hover 動畫效果
    - 實作點擊跳轉到詳情頁
    - _需求: 4.2, 4.3, 4.4, 15.4_
  
  - [x] 3.5 實作 API 客戶端模組
    - 建立 api.js 類別
    - 實作通用 request 方法
    - 實作錯誤處理和訊息顯示
    - 實作專案、開發紀錄、點讚的 API 呼叫方法
    - _需求: 13.1, 13.2, 13.4_
  
  - [x] 3.6 實作工具函式模組
    - 建立 utils.js
    - 實作 Markdown 轉 HTML 函式（使用 marked.js）
    - 實作日期格式化函式
    - 實作 LocalStorage 操作函式
    - _需求: 13.3_

- [x] 4. 建立前台頁面
  - [x] 4.1 實作首頁（index.html）
    - 建立 HTML 結構
    - 實作主視覺區塊（Hero Section）
    - 整合 Navbar 和 Footer 元件
    - 加入 Particles.js 背景效果
    - 實作 AOS 捲動動畫
    - _需求: 1.3, 1.5, 7.1, 7.2_
  
  - [x] 4.2 實作關於我頁面（about.html）
    - 建立 HTML 結構
    - 顯示個人簡介
    - 顯示技術技能清單（視覺指標）
    - 顯示教育背景
    - 顯示聯絡資訊和社群媒體連結
    - 提供履歷下載連結
    - 整合 Navbar 和 Footer 元件
    - _需求: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [x] 4.3 實作專案作品頁面（projects.html）
    - 建立 HTML 結構
    - 從 API 載入專案列表
    - 使用 Project Card 元件渲染專案
    - 實作網格布局（響應式）
    - 整合 Navbar 和 Footer 元件
    - 實作載入狀態和錯誤處理
    - _需求: 4.1, 4.2, 4.3, 13.1, 13.5_
  
  - [x] 4.4 實作專案詳情頁面（project-detail.html）
    - 建立 HTML 結構
    - 從 API 載入專案詳情（使用 URL 參數）
    - 顯示專案標題、描述、技術、連結
    - 將 Markdown 內容轉換為 HTML 並顯示
    - 實作程式碼語法高亮（highlight.js）
    - 整合點讚按鈕元件
    - 整合 Navbar 和 Footer 元件
    - _需求: 4.4, 4.5, 5.4, 7.4, 12.1, 13.3_
  
  - [x] 4.5 實作開發紀錄頁面（devlog.html）
    - 建立 HTML 結構
    - 從 API 載入開發紀錄列表
    - 實作時間軸布局
    - 顯示日期、標題、內容摘要
    - 將 Markdown 內容轉換為 HTML
    - 實作分類和標籤篩選功能
    - 整合點讚按鈕元件
    - 整合 Navbar 和 Footer 元件
    - _需求: 5.1, 5.2, 5.3, 5.4, 5.5, 7.4, 12.2, 13.3_

- [x] 5. 建立後台管理系統
  - [x] 5.1 實作後台登入頁面（admin/login.html）
    - 建立 HTML 結構和樣式
    - 實作登入表單
    - 實作登入邏輯（呼叫 API）
    - 儲存 JWT token 到 LocalStorage
    - 登入成功後跳轉到後台首頁
    - _需求: 10.1, 10.2, 10.5_
  
  - [x] 5.2 實作後台認證模組（admin/js/auth.js）
    - 實作 checkAuth 函式（驗證 token）
    - 實作 redirectToLogin 函式
    - 實作 logout 函式（清除 token）
    - 在所有後台頁面載入時檢查認證狀態
    - _需求: 10.3, 10.4, 10.5_
  
  - [x] 5.3 實作後台 API 客戶端（admin/js/admin-api.js）
    - 建立 AdminAPI 類別
    - 實作帶 JWT token 的 request 方法
    - 實作專案 CRUD API 呼叫
    - 實作開發紀錄 CRUD API 呼叫
    - 實作圖片上傳 API 呼叫
    - _需求: 9.3, 9.4, 9.5_
  
  - [x] 5.4 實作 Markdown 編輯器元件（admin/js/editor.js）
    - 建立 MarkdownEditor 類別
    - 實作分割視窗布局（編輯區 + 預覽區）
    - 實作工具列（粗體、斜體、標題、程式碼等）
    - 實作即時預覽功能（使用 marked.js）
    - 實作程式碼語法高亮（使用 highlight.js）
    - 實作插入 Markdown 語法功能
    - _需求: 11.1, 11.2, 11.3, 11.4_
  
  - [x] 5.5 實作後台首頁（admin/dashboard.html）
    - 建立 HTML 結構和樣式
    - 顯示專案和開發紀錄的統計資訊
    - 提供導航連結到專案管理和開發紀錄管理
    - 實作登出按鈕
    - 整合認證檢查
    - _需求: 9.1, 9.2_
  
  - [x] 5.6 實作專案編輯器頁面（admin/project-editor.html）
    - 建立 HTML 結構和樣式
    - 實作專案列表顯示
    - 實作新增專案表單
    - 實作編輯專案表單（載入現有資料）
    - 整合 Markdown 編輯器
    - 實作圖片上傳功能
    - 實作刪除專案功能（確認對話框）
    - 實作儲存功能（呼叫 API）
    - _需求: 9.2, 9.3, 9.5, 11.5_
  
  - [x] 5.7 實作開發紀錄編輯器頁面（admin/devlog-editor.html）
    - 建立 HTML 結構和樣式
    - 實作開發紀錄列表顯示
    - 實作新增開發紀錄表單
    - 實作編輯開發紀錄表單（載入現有資料）
    - 整合 Markdown 編輯器
    - 實作分類和標籤輸入
    - 實作刪除開發紀錄功能（確認對話框）
    - 實作儲存功能（呼叫 API）
    - _需求: 9.2, 9.4, 11.5_

- [x] 6. 實作點讚功能和互動效果
  - [x] 6.1 建立點讚按鈕元件（frontend/js/components/like-button.js）
    - 建立 LikeButton 類別
    - 實作點讚按鈕 HTML 結構
    - 實作點讚處理邏輯（呼叫 API）
    - 實作 LocalStorage 記錄已點讚狀態
    - 實作防止重複點讚
    - 實作點讚動畫效果（心跳）
    - _需求: 12.1, 12.2, 12.3, 12.4, 12.5_
  
  - [x] 6.2 整合點讚按鈕到專案詳情頁
    - 在專案詳情頁加入點讚按鈕
    - 載入初始點讚數
    - 綁定點讚事件
    - _需求: 12.1_
  
  - [x] 6.3 整合點讚按鈕到開發紀錄頁
    - 在每個開發紀錄條目加入點讚按鈕
    - 載入初始點讚數
    - 綁定點讚事件
    - _需求: 12.2_

- [x] 7. 優化效能和使用者體驗
  - [x] 7.1 實作圖片延遲載入
    - 為首屏以下的圖片加入 loading="lazy" 屬性
    - 實作佔位符效果
    - _需求: 8.2_
  
  - [x] 7.2 優化 CSS 和動畫效果
    - 確保使用 CSS 動畫而非 JavaScript
    - 優化過渡效果的效能
    - 實作互動回饋（100ms 內）
    - _需求: 8.3, 8.5_
  
  - [x] 7.3 實作內容快取
    - 在前端快取 API 回應（使用 sessionStorage）
    - 實作快取過期機制
    - _需求: 13.4_
  
  - [x] 7.4 優化外部套件載入
    - 確保所有外部套件使用 CDN
    - 使用 async 或 defer 載入非關鍵 JS
    - 確保不阻塞頁面渲染
    - _需求: 7.1, 7.5, 8.4_

- [x] 8. 建立範例資料和文件
  - [x] 8.1 建立範例專案資料
    - 透過後台或直接插入資料庫建立 2-3 個範例專案
    - 包含標題、描述、Markdown 內容、技術標籤
    - 上傳範例專案截圖
    - _需求: 4.1, 4.2_
  
  - [x] 8.2 建立範例開發紀錄資料
    - 透過後台或直接插入資料庫建立 3-5 個範例開發紀錄
    - 包含標題、Markdown 內容、分類、標籤
    - _需求: 5.1, 5.3_
  
  - [x] 8.3 建立 README 文件
    - 說明專案結構
    - 說明如何安裝和執行
    - 說明預設管理員帳號
    - 說明 API 端點
    - _需求: 14.5_
  
  - [x] 8.4 建立 package.json 腳本
    - 加入 start 腳本（啟動伺服器）
    - 加入 dev 腳本（開發模式）
    - 加入 init-db 腳本（初始化資料庫）
    - _需求: 14.5_
