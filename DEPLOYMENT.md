# 部署指南

本指南說明如何將作品集網站部署到生產環境。

## 部署架構

### 選項 1: 全棧部署（推薦）

將前端和後端部署在同一個伺服器上。

**適合平台：**
- Railway
- Render
- Heroku
- VPS (DigitalOcean, Linode, AWS EC2)

### 選項 2: 分離部署

前端部署到靜態主機，後端部署到 Node.js 主機。

**前端平台：**
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

**後端平台：**
- Railway
- Render
- Heroku
- VPS

## 部署前準備

### 1. 環境變數設定

複製 `.env.example` 為 `.env` 並設定：

```bash
cd backend
cp .env.example .env
```

編輯 `.env` 檔案：

```env
PORT=3000
NODE_ENV=production
JWT_SECRET=使用強隨機字串（至少32字元）
```

⚠️ **重要**: 絕對不要將 `.env` 檔案提交到版本控制！

### 2. 產生強隨機 JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. 初始化生產資料庫

```bash
cd backend
npm run init-db
```

### 4. 修改預設密碼

首次登入後立即修改管理員密碼。

## Railway 部署（推薦）

### 步驟 1: 準備專案

1. 將專案推送到 GitHub
2. 確認 `.gitignore` 已設定正確

### 步驟 2: 建立 Railway 專案

1. 訪問 https://railway.app
2. 使用 GitHub 登入
3. 點擊 "New Project"
4. 選擇 "Deploy from GitHub repo"
5. 選擇你的專案

### 步驟 3: 設定環境變數

在 Railway 專案設定中加入：
- `NODE_ENV=production`
- `JWT_SECRET=你的密鑰`
- `PORT=3000`

### 步驟 4: 設定啟動命令

Railway 會自動偵測 `package.json` 的 `start` 腳本。

### 步驟 5: 部署

Railway 會自動部署。部署完成後會提供一個 URL。

## Render 部署

### 步驟 1: 建立 Web Service

1. 訪問 https://render.com
2. 點擊 "New +" → "Web Service"
3. 連接 GitHub 倉庫

### 步驟 2: 設定

- **Name**: portfolio-website
- **Environment**: Node
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`

### 步驟 3: 環境變數

加入環境變數：
- `NODE_ENV=production`
- `JWT_SECRET=你的密鑰`

### 步驟 4: 部署

點擊 "Create Web Service" 開始部署。

## VPS 部署（進階）

### 步驟 1: 準備伺服器

```bash
# 更新系統
sudo apt update && sudo apt upgrade -y

# 安裝 Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 安裝 PM2
sudo npm install -g pm2
```

### 步驟 2: 上傳專案

```bash
# 使用 git clone
git clone https://github.com/your-username/portfolio-website.git
cd portfolio-website
```

### 步驟 3: 安裝相依套件

```bash
cd backend
npm install --production
```

### 步驟 4: 設定環境變數

```bash
cp .env.example .env
nano .env  # 編輯環境變數
```

### 步驟 5: 初始化資料庫

```bash
npm run init-db
```

### 步驟 6: 使用 PM2 啟動

```bash
pm2 start server.js --name portfolio
pm2 save
pm2 startup
```

### 步驟 7: 設定 Nginx（可選）

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 步驟 8: 設定 SSL（使用 Let's Encrypt）

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 前端分離部署

如果選擇將前端部署到靜態主機：

### 步驟 1: 修改 API URL

編輯 `frontend/js/api.js`：

```javascript
class API {
    constructor(baseURL = 'https://your-backend-url.com/api') {
        this.baseURL = baseURL;
    }
    // ...
}
```

### 步驟 2: 部署到 Netlify

1. 將 `frontend` 目錄推送到 GitHub
2. 在 Netlify 建立新站點
3. 連接 GitHub 倉庫
4. 設定 Build settings:
   - Base directory: `frontend`
   - Publish directory: `frontend`

### 步驟 3: 設定 CORS

在後端 `server.js` 中設定 CORS：

```javascript
app.use(cors({
    origin: 'https://your-frontend-url.netlify.app'
}));
```

## 部署後檢查清單

- [ ] 網站可以正常訪問
- [ ] 前台所有頁面正常運作
- [ ] 後台登入功能正常
- [ ] API 端點正常回應
- [ ] 圖片上傳功能正常
- [ ] 資料庫讀寫正常
- [ ] SSL 憑證已設定（HTTPS）
- [ ] 環境變數已正確設定
- [ ] 預設密碼已修改
- [ ] 備份策略已建立

## 監控和維護

### 日誌監控

使用 PM2 查看日誌：

```bash
pm2 logs portfolio
```

### 效能監控

```bash
pm2 monit
```

### 自動重啟

PM2 會在應用崩潰時自動重啟。

### 資料庫備份

定期備份 SQLite 資料庫：

```bash
# 建立備份
cp database/portfolio.db database/portfolio.db.backup-$(date +%Y%m%d)

# 設定自動備份（crontab）
0 2 * * * cp /path/to/database/portfolio.db /path/to/backups/portfolio.db.backup-$(date +\%Y\%m\%d)
```

## 更新部署

### Railway/Render

推送到 GitHub 會自動觸發重新部署。

### VPS

```bash
cd portfolio-website
git pull
cd backend
npm install
pm2 restart portfolio
```

## 故障排除

### 應用無法啟動

1. 檢查日誌：`pm2 logs`
2. 確認環境變數已設定
3. 確認資料庫檔案存在
4. 確認埠號未被佔用

### 資料庫錯誤

1. 確認資料庫檔案權限
2. 重新初始化資料庫
3. 檢查磁碟空間

### 圖片上傳失敗

1. 確認 uploads 目錄存在
2. 確認目錄有寫入權限
3. 檢查檔案大小限制

## 安全性建議

1. **使用 HTTPS**: 必須使用 SSL/TLS
2. **強密碼**: 使用強隨機 JWT secret
3. **定期更新**: 保持相依套件最新
4. **備份**: 定期備份資料庫
5. **監控**: 設定錯誤監控和告警
6. **限流**: 考慮加入 API 限流
7. **防火牆**: 設定適當的防火牆規則

## 效能優化

1. **啟用 gzip 壓縮**
2. **設定快取標頭**
3. **使用 CDN** 提供靜態資源
4. **圖片優化** 使用 WebP 格式
5. **資料庫索引** 為常用查詢建立索引

## 成本估算

### 免費方案
- Railway: 免費額度（有限制）
- Render: 免費方案（有限制）
- Netlify: 免費方案（前端）

### 付費方案
- Railway: $5/月起
- Render: $7/月起
- VPS: $5-10/月

## 需要幫助？

如果在部署過程中遇到問題：
1. 檢查平台的文件
2. 查看應用日誌
3. 確認環境變數設定
4. 檢查網路和防火牆設定
