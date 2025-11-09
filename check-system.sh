#!/bin/bash

# 系統檢查腳本

echo "================================"
echo "開發者作品集網站 - 系統檢查"
echo "================================"
echo ""

# 檢查 Node.js
echo "檢查 Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✓ Node.js 已安裝: $NODE_VERSION"
else
    echo "✗ Node.js 未安裝"
    exit 1
fi

echo ""

# 檢查 npm
echo "檢查 npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✓ npm 已安裝: $NPM_VERSION"
else
    echo "✗ npm 未安裝"
    exit 1
fi

echo ""

# 檢查資料庫
echo "檢查資料庫..."
if [ -f "database/portfolio.db" ]; then
    echo "✓ 資料庫檔案存在"
else
    echo "✗ 資料庫檔案不存在"
    echo "  請執行: cd backend && npm run init-db"
    exit 1
fi

echo ""

# 檢查 node_modules
echo "檢查相依套件..."
if [ -d "backend/node_modules" ]; then
    echo "✓ 相依套件已安裝"
else
    echo "✗ 相依套件未安裝"
    echo "  請執行: cd backend && npm install"
    exit 1
fi

echo ""

# 檢查伺服器
echo "檢查伺服器..."
if curl -s http://localhost:3000/api/projects > /dev/null 2>&1; then
    echo "✓ 伺服器正在運行"
else
    echo "⚠ 伺服器未運行"
    echo "  請執行: cd backend && npm start"
fi

echo ""

# 檢查範例資料
echo "檢查範例資料..."
RESPONSE=$(curl -s http://localhost:3000/api/projects)
if echo "$RESPONSE" | grep -q "個人作品集網站"; then
    echo "✓ 範例資料已載入"
else
    echo "⚠ 範例資料未載入"
    echo "  可選執行: cd backend && npm run seed"
fi

echo ""
echo "================================"
echo "系統檢查完成！"
echo "================================"
echo ""
echo "訪問網站:"
echo "  前台: http://localhost:3000/"
echo "  後台: http://localhost:3000/admin/login.html"
echo ""
echo "預設帳號:"
echo "  使用者名稱: admin"
echo "  密碼: admin123"
echo ""
