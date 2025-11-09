# 需求文件

## 簡介

這是一個為學生開發者設計的個人作品集與開發紀錄網頁系統。系統包含前台展示網頁和後台管理系統。前台採用科技感設計風格，使用紫色系配色（類似 Kiro），提供多頁式架構來展示個人履歷、專案作品和開發歷程。後台提供內容管理功能，支援 Markdown 編輯器，並使用 JWT 進行身份驗證。整個系統使用純 HTML、CSS 和 JavaScript 開發，可引用外部套件。

## 術語表

- **Portfolio Website（作品集網頁）**: 展示開發者個人資訊、技能、專案作品的前台網站系統
- **Admin Panel（後台管理系統）**: 供開發者管理內容的後台介面
- **Navigation System（導航系統）**: 網頁中用於在不同頁面間切換的導航元件
- **Project Card（專案卡片）**: 展示單一專案資訊的視覺元件
- **Development Log（開發紀錄）**: 記錄開發過程、學習心得的時間軸式內容
- **Responsive Design（響應式設計）**: 網頁能適應不同螢幕尺寸的設計方式
- **JWT（JSON Web Token）**: 用於身份驗證的加密令牌標準
- **Markdown Editor（Markdown 編輯器）**: 支援 Markdown 語法的文字編輯器元件
- **Like System（點讚系統）**: 允許訪客對內容表達喜愛的互動功能
- **SQLite**: 輕量級的嵌入式關聯式資料庫系統
- **Component（元件）**: 可重複使用的獨立網頁模組

## 需求

### 需求 1

**使用者故事：** 作為一位學生開發者，我想要有一個具有科技感的個人網頁，以便展示我的專業形象和技術能力

#### 驗收標準

1. THE Portfolio Website SHALL 使用類似 Kiro 品牌的紫色配色方案
2. THE Portfolio Website SHALL 實作現代化、科技感的視覺設計，包含漸層和動畫效果
3. THE Portfolio Website SHALL 在首頁顯示包含個人介紹的主視覺區塊
4. THE Portfolio Website SHALL 使用傳達技術和專業美感的自訂字體
5. THE Portfolio Website SHALL 包含細緻的背景效果，例如粒子或幾何圖案

### 需求 2

**使用者故事：** 作為一位訪客，我想要能夠輕鬆瀏覽不同頁面，以便快速找到我感興趣的內容

#### 驗收標準

1. THE Navigation System SHALL 提供至少四個主要區塊的連結：首頁、關於我、專案作品、開發紀錄
2. WHEN 使用者點擊導航連結時，THE Navigation System SHALL 平滑過渡到目標頁面
3. THE Navigation System SHALL 在導航選單中突顯當前活動頁面
4. THE Navigation System SHALL 透過固定或黏性標題在所有頁面保持可存取性
5. WHEN 在行動裝置上檢視時，THE Navigation System SHALL 轉換為漢堡選單

### 需求 3

**使用者故事：** 作為一位學生開發者，我想要展示我的個人履歷資訊，以便讓潛在雇主或合作者了解我的背景

#### 驗收標準

1. THE Portfolio Website SHALL 包含顯示個人簡介的關於我頁面
2. THE Portfolio Website SHALL 顯示帶有視覺指標的技術技能清單
3. THE Portfolio Website SHALL 展示教育背景資訊
4. THE Portfolio Website SHALL 包含聯絡資訊和社群媒體連結
5. THE Portfolio Website SHALL 提供可下載的履歷或 CV 連結

### 需求 4

**使用者故事：** 作為一位學生開發者，我想要展示我的專案作品，以便證明我的實作能力

#### 驗收標準

1. THE Portfolio Website SHALL 包含顯示多個專案項目的專案作品頁面
2. WHEN 顯示專案時，THE Portfolio Website SHALL 為每個專案顯示標題、描述和使用的技術
3. THE Portfolio Website SHALL 在 Project Card 中顯示專案縮圖或截圖
4. WHEN 使用者點擊 Project Card 時，THE Portfolio Website SHALL 顯示詳細的專案資訊
5. THE Portfolio Website SHALL 為每個專案包含線上展示和原始碼儲存庫的連結

### 需求 5

**使用者故事：** 作為一位學生開發者，我想要記錄我的開發歷程，以便追蹤我的成長和學習過程

#### 驗收標準

1. THE Portfolio Website SHALL 包含顯示時間順序條目的開發紀錄頁面
2. THE Portfolio Website SHALL 以時間軸格式呈現開發紀錄條目
3. WHEN 顯示紀錄條目時，THE Portfolio Website SHALL 為每個條目顯示日期、標題和內容
4. THE Portfolio Website SHALL 支援富文本內容，包括紀錄條目中的程式碼片段
5. THE Portfolio Website SHALL 允許按主題或技術篩選或分類紀錄條目

### 需求 6

**使用者故事：** 作為一位訪客使用不同裝置，我想要網頁在各種螢幕上都能正常顯示，以便在任何裝置上瀏覽

#### 驗收標準

1. THE Portfolio Website SHALL 為 320px 到 1920px 的螢幕寬度實作 Responsive Design
2. WHEN 在行動裝置上檢視時，THE Portfolio Website SHALL 將版面調整為單欄格式
3. WHEN 在平板上檢視時，THE Portfolio Website SHALL 為中等尺寸螢幕優化版面
4. THE Portfolio Website SHALL 確保所有互動元素在行動裝置上都適合觸控操作
5. THE Portfolio Website SHALL 在所有裝置尺寸上維持可讀性和視覺層次

### 需求 7

**使用者故事：** 作為一位學生開發者，我想要使用外部套件來增強網頁功能，以便提升使用者體驗而不需從零開始開發

#### 驗收標準

1. THE Portfolio Website SHALL 使用 CDN 連結來引入外部函式庫，無需本地安裝
2. THE Portfolio Website SHALL 使用動畫函式庫實作平滑的捲動動畫
3. THE Portfolio Website SHALL 使用圖示函式庫來提供一致的視覺元素
4. THE Portfolio Website SHALL 為開發紀錄中的程式碼片段實作語法高亮
5. THE Portfolio Website SHALL 確保所有外部相依套件高效載入，不阻塞頁面渲染

### 需求 8

**使用者故事：** 作為一位訪客，我想要網頁載入快速且互動流暢，以便獲得良好的瀏覽體驗

#### 驗收標準

1. THE Portfolio Website SHALL 在標準寬頻連線下於 3 秒內載入初始頁面
2. THE Portfolio Website SHALL 為首屏以下的圖片實作延遲載入
3. WHEN 使用者與元素互動時，THE Portfolio Website SHALL 在 100 毫秒內提供視覺回饋
4. THE Portfolio Website SHALL 最小化使用會減慢頁面載入的大型資源
5. THE Portfolio Website SHALL 在可能的情況下使用 CSS 動畫而非 JavaScript 以獲得更好的效能


### 需求 9

**使用者故事：** 作為一位開發者，我想要有一個後台管理系統，以便能夠管理我的專案和開發紀錄內容

#### 驗收標準

1. THE Admin Panel SHALL 提供獨立的後台管理介面，與前台展示網頁分離
2. THE Admin Panel SHALL 顯示所有專案和開發紀錄的列表視圖
3. THE Admin Panel SHALL 允許建立、編輯和刪除專案條目
4. THE Admin Panel SHALL 允許建立、編輯和刪除開發紀錄條目
5. THE Admin Panel SHALL 提供上傳和管理專案截圖與圖片的功能

### 需求 10

**使用者故事：** 作為一位開發者，我想要使用 JWT 進行身份驗證，以便保護我的後台管理系統不被未授權存取

#### 驗收標準

1. THE Admin Panel SHALL 提供登入頁面，要求使用者名稱和密碼
2. WHEN 使用者提交有效的登入憑證時，THE Admin Panel SHALL 產生並回傳 JWT token
3. THE Admin Panel SHALL 在每次 API 請求中驗證 JWT token 的有效性
4. WHEN JWT token 過期時，THE Admin Panel SHALL 要求使用者重新登入
5. THE Admin Panel SHALL 提供登出功能，清除本地儲存的 JWT token

### 需求 11

**使用者故事：** 作為一位開發者，我想要使用 Markdown 編輯器撰寫內容，以便快速格式化文字並插入程式碼

#### 驗收標準

1. THE Markdown Editor SHALL 提供即時預覽功能，同時顯示編輯區和預覽區
2. THE Markdown Editor SHALL 支援標準 Markdown 語法，包括標題、列表、連結和圖片
3. THE Markdown Editor SHALL 支援程式碼區塊語法，並提供語法高亮
4. THE Markdown Editor SHALL 提供工具列，包含常用 Markdown 格式的快捷按鈕
5. WHEN 儲存內容時，THE Admin Panel SHALL 將 Markdown 原始碼儲存到資料庫

### 需求 12

**使用者故事：** 作為一位訪客，我想要能夠為喜歡的專案和開發紀錄點讚，以便表達我的欣賞

#### 驗收標準

1. THE Like System SHALL 在每個專案詳細頁面顯示點讚按鈕和點讚數量
2. THE Like System SHALL 在每個開發紀錄條目顯示點讚按鈕和點讚數量
3. WHEN 訪客點擊點讚按鈕時，THE Like System SHALL 增加該項目的點讚計數
4. THE Like System SHALL 使用瀏覽器本地儲存記錄使用者已點讚的項目
5. WHEN 使用者已對某項目點讚時，THE Like System SHALL 顯示已點讚狀態並防止重複點讚

### 需求 13

**使用者故事：** 作為一位開發者，我想要前台能夠從後台動態載入內容，以便即時更新展示的專案和開發紀錄

#### 驗收標準

1. THE Portfolio Website SHALL 透過 API 從後端載入專案列表資料
2. THE Portfolio Website SHALL 透過 API 從後端載入開發紀錄列表資料
3. WHEN 顯示 Markdown 內容時，THE Portfolio Website SHALL 將 Markdown 轉換為 HTML 格式
4. THE Portfolio Website SHALL 快取已載入的內容以提升效能
5. WHEN 後台更新內容時，THE Portfolio Website SHALL 在重新整理後顯示最新內容

### 需求 14

**使用者故事：** 作為一位開發者，我想要使用 SQLite 資料庫儲存內容，以便有效管理專案、開發紀錄和使用者資料

#### 驗收標準

1. THE Portfolio Website SHALL 使用 SQLite 作為後端資料庫系統
2. THE Portfolio Website SHALL 建立資料表來儲存專案、開發紀錄、點讚計數和使用者認證資訊
3. THE Admin Panel SHALL 透過 API 與 SQLite 資料庫進行互動
4. THE Portfolio Website SHALL 確保資料庫操作包含適當的錯誤處理
5. THE Portfolio Website SHALL 提供資料庫初始化腳本以建立必要的資料表結構

### 需求 15

**使用者故事：** 作為一位開發者，我想要使用模組化的方式開發網頁，以便提高程式碼的可維護性和重複使用性

#### 驗收標準

1. THE Portfolio Website SHALL 將重複使用的 UI 元素實作為獨立的 Component
2. THE Portfolio Website SHALL 建立可重複使用的導航列 Component，在所有頁面使用
3. THE Portfolio Website SHALL 建立可重複使用的頁尾 Component，在所有頁面使用
4. THE Portfolio Website SHALL 建立可重複使用的 Project Card Component，用於顯示專案資訊
5. THE Portfolio Website SHALL 將共用的 CSS 樣式和 JavaScript 功能抽取為獨立模組
