const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 資料庫檔案路徑
const dbPath = path.join(__dirname, '../../database/portfolio.db');

// 建立資料庫連線
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('無法連接資料庫:', err.message);
        process.exit(1);
    }
    console.log('已連接到 SQLite 資料庫');
});

// 範例專案資料
const sampleProjects = [
    {
        title: '個人作品集網站',
        description: '使用 HTML、CSS、JavaScript 打造的響應式個人作品集網站',
        content: `# 個人作品集網站

## 專案簡介

這是一個使用純前端技術打造的個人作品集網站，展示了我的開發技能和專案經驗。

## 主要功能

- 響應式設計，支援各種裝置
- 科技感的視覺設計
- 專案展示和詳情頁面
- 開發紀錄時間軸
- 點讚互動功能

## 技術棧

- HTML5
- CSS3（Flexbox、Grid）
- JavaScript (ES6+)
- AOS 動畫庫
- Particles.js

## 開發心得

透過這個專案，我學習到了如何設計和實作一個完整的前端應用。特別是在響應式設計和動畫效果方面有了更深入的理解。

\`\`\`javascript
// 範例程式碼
const initParticles = () => {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#9b87f5' }
        }
    });
};
\`\`\`

## 未來改進

- 加入深色模式切換
- 優化載入效能
- 加入更多互動效果`,
        technologies: JSON.stringify(['HTML5', 'CSS3', 'JavaScript', 'AOS', 'Particles.js']),
        demo_url: 'https://example.com/demo',
        repo_url: 'https://github.com/username/portfolio'
    },
    {
        title: 'Todo List 應用',
        description: '功能完整的待辦事項管理應用，支援分類和優先級設定',
        content: `# Todo List 應用

## 專案概述

一個簡潔實用的待辦事項管理應用，幫助使用者有效管理日常任務。

## 核心功能

- ✅ 新增、編輯、刪除待辦事項
- 🏷️ 分類管理
- ⭐ 優先級設定
- 📅 到期日提醒
- 💾 LocalStorage 資料持久化

## 技術實作

使用原生 JavaScript 實作，沒有依賴任何框架，展示了對 DOM 操作和事件處理的掌握。

\`\`\`javascript
class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.render();
    }
    
    addTodo(text, priority) {
        const todo = {
            id: Date.now(),
            text,
            priority,
            completed: false
        };
        this.todos.push(todo);
        this.saveTodos();
        this.render();
    }
}
\`\`\`

## 學習收穫

- 深入理解 JavaScript 物件導向程式設計
- 掌握 LocalStorage API 的使用
- 學習如何設計清晰的使用者介面`,
        technologies: JSON.stringify(['JavaScript', 'HTML', 'CSS', 'LocalStorage']),
        demo_url: 'https://example.com/todo',
        repo_url: 'https://github.com/username/todo-app'
    },
    {
        title: '天氣查詢應用',
        description: '整合第三方 API 的天氣查詢應用，提供即時天氣資訊',
        content: `# 天氣查詢應用

## 專案介紹

整合 OpenWeatherMap API 的天氣查詢應用，提供全球城市的即時天氣資訊。

## 功能特色

- 🌍 全球城市搜尋
- 🌡️ 即時溫度、濕度、風速
- 🌤️ 未來 5 天天氣預報
- 📍 地理位置定位
- 🎨 動態天氣圖示

## API 整合

\`\`\`javascript
async function getWeather(city) {
    const apiKey = 'YOUR_API_KEY';
    const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${apiKey}\`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('取得天氣資料失敗:', error);
    }
}
\`\`\`

## 技術挑戰

- 處理非同步 API 請求
- 錯誤處理和使用者回饋
- 資料格式轉換和顯示

## 成果展示

成功實作了一個實用的天氣應用，學習到如何與第三方 API 整合。`,
        technologies: JSON.stringify(['JavaScript', 'Fetch API', 'OpenWeatherMap API', 'CSS']),
        demo_url: 'https://example.com/weather',
        repo_url: 'https://github.com/username/weather-app'
    }
];

// 範例開發紀錄資料
const sampleDevlogs = [
    {
        title: '學習 JavaScript 非同步程式設計',
        content: `# 學習 JavaScript 非同步程式設計

今天深入學習了 JavaScript 的非同步程式設計，包括 Promises 和 async/await。

## 學習重點

### 1. Promise 基礎

Promise 是處理非同步操作的一種方式，有三種狀態：pending、fulfilled、rejected。

\`\`\`javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功！');
    }, 1000);
});

promise.then(result => {
    console.log(result);
});
\`\`\`

### 2. async/await

async/await 讓非同步程式碼看起來像同步程式碼，更容易理解和維護。

\`\`\`javascript
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('錯誤:', error);
    }
}
\`\`\`

## 實作練習

實作了一個簡單的 API 請求函式，並處理了錯誤情況。

## 心得

非同步程式設計一開始有點難理解，但透過實作練習後，逐漸掌握了其中的概念。`,
        category: '前端開發',
        tags: JSON.stringify(['JavaScript', 'Async', 'Promise'])
    },
    {
        title: 'CSS Grid 布局實戰',
        content: `# CSS Grid 布局實戰

今天學習並實作了 CSS Grid 布局系統，用於建立複雜的網頁版面。

## Grid 基礎

CSS Grid 是一個二維布局系統，可以同時處理行和列。

\`\`\`css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
\`\`\`

## 實作範例

建立了一個響應式的專案展示網格：

\`\`\`css
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

@media (max-width: 768px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }
}
\`\`\`

## 學習心得

Grid 比 Flexbox 更適合處理複雜的二維布局，兩者結合使用效果最好。`,
        category: '前端開發',
        tags: JSON.stringify(['CSS', 'Grid', 'Layout'])
    },
    {
        title: '建立 RESTful API 的經驗',
        content: `# 建立 RESTful API 的經驗

使用 Node.js 和 Express 建立了第一個 RESTful API。

## API 設計原則

1. 使用適當的 HTTP 方法（GET、POST、PUT、DELETE）
2. 清晰的 URL 結構
3. 統一的回應格式
4. 適當的狀態碼

## 實作範例

\`\`\`javascript
// GET /api/projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await db.all('SELECT * FROM projects');
        res.json({
            success: true,
            data: projects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
\`\`\`

## 遇到的挑戰

- 錯誤處理
- 資料驗證
- 認證和授權

## 解決方案

使用中介層來處理通用的邏輯，讓程式碼更加模組化。

## 總結

建立 API 需要考慮很多細節，但透過實作學習到了很多後端開發的知識。`,
        category: '後端開發',
        tags: JSON.stringify(['Node.js', 'Express', 'API', 'RESTful'])
    },
    {
        title: '響應式設計的最佳實踐',
        content: `# 響應式設計的最佳實踐

整理了在開發響應式網站時學到的最佳實踐。

## 核心原則

### 1. Mobile First

從行動裝置開始設計，再逐步增強到桌面版本。

\`\`\`css
/* 基礎樣式（行動裝置） */
.container {
    padding: 1rem;
}

/* 平板 */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
    }
}

/* 桌面 */
@media (min-width: 1024px) {
    .container {
        padding: 3rem;
        max-width: 1200px;
        margin: 0 auto;
    }
}
\`\`\`

### 2. 彈性單位

使用相對單位（rem、em、%）而非固定單位（px）。

### 3. 彈性圖片

\`\`\`css
img {
    max-width: 100%;
    height: auto;
}
\`\`\`

## 測試工具

- Chrome DevTools
- 實體裝置測試
- BrowserStack

## 心得

響應式設計不只是調整寬度，還要考慮使用者體驗和互動方式。`,
        category: '前端開發',
        tags: JSON.stringify(['CSS', 'Responsive', 'Mobile'])
    },
    {
        title: '使用 Git 進行版本控制',
        content: `# 使用 Git 進行版本控制

學習了 Git 的基本操作和工作流程。

## 基本指令

\`\`\`bash
# 初始化倉庫
git init

# 加入檔案
git add .

# 提交變更
git commit -m "描述訊息"

# 推送到遠端
git push origin main
\`\`\`

## 分支管理

\`\`\`bash
# 建立新分支
git checkout -b feature/new-feature

# 切換分支
git checkout main

# 合併分支
git merge feature/new-feature
\`\`\`

## 最佳實踐

1. 經常提交，保持提交訊息清晰
2. 使用分支開發新功能
3. 在合併前先拉取最新變更
4. 寫好 .gitignore 檔案

## 學習資源

- Git 官方文件
- GitHub Learning Lab
- 實際專案練習

## 總結

Git 是開發者必備的工具，掌握好版本控制能大幅提升開發效率。`,
        category: '開發工具',
        tags: JSON.stringify(['Git', 'Version Control', 'GitHub'])
    }
];

// 插入範例資料
async function seedData() {
    console.log('開始插入範例資料...');
    
    // 插入專案
    for (const project of sampleProjects) {
        await new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO projects (title, description, content, technologies, demo_url, repo_url)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [project.title, project.description, project.content, project.technologies, project.demo_url, project.repo_url],
                function(err) {
                    if (err) {
                        console.error('插入專案失敗:', err);
                        reject(err);
                    } else {
                        console.log(`✓ 已插入專案: ${project.title}`);
                        
                        // 初始化點讚計數
                        db.run(
                            'INSERT INTO likes (item_type, item_id, count) VALUES (?, ?, ?)',
                            ['project', this.lastID, 0]
                        );
                        
                        resolve();
                    }
                }
            );
        });
    }
    
    // 插入開發紀錄
    for (const log of sampleDevlogs) {
        await new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO dev_logs (title, content, category, tags)
                 VALUES (?, ?, ?, ?)`,
                [log.title, log.content, log.category, log.tags],
                function(err) {
                    if (err) {
                        console.error('插入開發紀錄失敗:', err);
                        reject(err);
                    } else {
                        console.log(`✓ 已插入開發紀錄: ${log.title}`);
                        
                        // 初始化點讚計數
                        db.run(
                            'INSERT INTO likes (item_type, item_id, count) VALUES (?, ?, ?)',
                            ['devlog', this.lastID, 0]
                        );
                        
                        resolve();
                    }
                }
            );
        });
    }
    
    console.log('\n範例資料插入完成！');
    console.log('你現在可以訪問前台查看這些範例資料。');
    
    db.close();
}

// 執行
seedData().catch(err => {
    console.error('發生錯誤:', err);
    db.close();
    process.exit(1);
});
