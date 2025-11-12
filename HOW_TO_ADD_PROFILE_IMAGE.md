# 如何新增個人照片

## 📸 照片放置位置

將你的個人照片放在以下路徑：

```
frontend/assets/images/profile.jpg
```

## 📋 步驟說明

### 1. 準備照片
- **建議尺寸**: 至少 400x400 像素（正方形）
- **檔案格式**: JPG、PNG 或 WebP
- **檔案大小**: 建議小於 500KB
- **照片內容**: 清晰的個人照片或專業形象照

### 2. 放置照片

#### 方法一：直接複製檔案
```bash
# 將你的照片複製到指定位置
cp /path/to/your/photo.jpg frontend/assets/images/profile.jpg
```

#### 方法二：使用檔案管理器
1. 開啟專案資料夾
2. 進入 `frontend/assets/images/` 目錄
3. 將你的照片複製到這個資料夾
4. 重新命名為 `profile.jpg`

### 3. 支援的檔案名稱

如果你想使用其他檔案名稱或格式，可以修改 `frontend/about.html` 中的路徑：

```html
<!-- 原始路徑 -->
<img src="/assets/images/profile.jpg" ...>

<!-- 如果你的照片是 PNG 格式 -->
<img src="/assets/images/profile.png" ...>

<!-- 如果你想用其他名稱 -->
<img src="/assets/images/michael-photo.jpg" ...>
```

## 🎨 照片優化建議

### 使用線上工具優化照片
1. **TinyPNG** (https://tinypng.com/) - 壓縮 PNG/JPG
2. **Squoosh** (https://squoosh.app/) - Google 的圖片優化工具
3. **ImageOptim** (Mac) - 本地圖片優化工具

### 使用命令列優化（可選）

#### 安裝 ImageMagick
```bash
# macOS
brew install imagemagick

# Ubuntu/Debian
sudo apt-get install imagemagick
```

#### 優化照片
```bash
# 調整大小為 400x400 並優化
convert your-photo.jpg -resize 400x400^ -gravity center -extent 400x400 -quality 85 frontend/assets/images/profile.jpg
```

## 🔄 更新照片後

### 1. 清除瀏覽器快取
- Chrome: `Ctrl+Shift+R` (Windows) 或 `Cmd+Shift+R` (Mac)
- Firefox: `Ctrl+F5` (Windows) 或 `Cmd+Shift+R` (Mac)

### 2. 驗證照片顯示
訪問關於我頁面：http://localhost:3000/about.html

## 🎯 照片樣式說明

目前的照片樣式包含：
- ✅ 圓形裁切（border-radius: 50%）
- ✅ 紫色邊框（4px solid）
- ✅ 陰影效果
- ✅ 自動裁切適應（object-fit: cover）
- ✅ 備用圖示（如果照片載入失敗）

## 🛠️ 自訂照片樣式

如果你想修改照片樣式，編輯 `frontend/about.html`：

```html
<img src="/assets/images/profile.jpg" 
     alt="Michael 的個人照片" 
     style="
         width: 200px;              /* 寬度 */
         height: 200px;             /* 高度 */
         border-radius: 50%;        /* 圓形：50%，方形：0% */
         object-fit: cover;         /* 裁切方式 */
         border: 4px solid var(--primary);  /* 邊框 */
         box-shadow: 0 10px 30px rgba(155, 135, 245, 0.3);  /* 陰影 */
     ">
```

### 樣式變化範例

#### 方形照片
```css
border-radius: 10%;  /* 改為 10% 或 0% */
```

#### 更大的照片
```css
width: 300px;
height: 300px;
```

#### 不同的邊框顏色
```css
border: 4px solid #ec4899;  /* 粉紅色 */
```

## 📱 響應式設計

照片在不同裝置上的顯示：
- **桌面**: 200x200px
- **平板**: 自動調整
- **行動裝置**: 自動調整

如果需要針對行動裝置調整大小，可以在 `frontend/css/responsive.css` 中加入：

```css
@media (max-width: 767px) {
    .profile-image {
        width: 150px !important;
        height: 150px !important;
    }
}
```

## ❓ 常見問題

### Q: 照片沒有顯示？
A: 檢查以下項目：
1. 檔案路徑是否正確：`frontend/assets/images/profile.jpg`
2. 檔案名稱是否正確（區分大小寫）
3. 伺服器是否正在運行
4. 清除瀏覽器快取

### Q: 照片變形了？
A: 確保使用 `object-fit: cover`，這會自動裁切照片以適應圓形。

### Q: 想使用 PNG 透明背景？
A: 可以！只需：
1. 將 PNG 檔案放在 `frontend/assets/images/profile.png`
2. 修改 HTML 中的 `src="/assets/images/profile.png"`
3. 可以移除 `background` 樣式以顯示透明效果

### Q: 如何使用網路上的照片？
A: 可以直接使用網址：
```html
<img src="https://example.com/your-photo.jpg" ...>
```

## 🚀 提交到 Git

新增照片後，記得提交到版本控制：

```bash
git add frontend/assets/images/profile.jpg
git commit -m "feat: 新增個人照片"
git push origin develop
```

## 📝 注意事項

⚠️ **隱私提醒**：
- 確保你有權使用該照片
- 考慮是否要將個人照片提交到公開的 GitHub 倉庫
- 如果不想公開，可以在 `.gitignore` 中加入：
  ```
  frontend/assets/images/profile.*
  ```

## 🎉 完成

放置照片後，重新整理頁面就能看到你的個人照片了！

如果有任何問題，請參考上述說明或檢查瀏覽器的開發者工具（F12）查看錯誤訊息。
