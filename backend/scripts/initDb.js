const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// 資料庫檔案路徑
const dbPath = path.join(__dirname, '../../database/portfolio.db');
const sqlPath = path.join(__dirname, '../../database/init.sql');

// 建立資料庫連線
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('無法連接資料庫:', err.message);
        process.exit(1);
    }
    console.log('已連接到 SQLite 資料庫');
});

// 讀取 SQL 初始化腳本
const initSQL = fs.readFileSync(sqlPath, 'utf8');

// 執行初始化腳本
db.exec(initSQL, async (err) => {
    if (err) {
        console.error('執行 SQL 腳本時發生錯誤:', err.message);
        db.close();
        process.exit(1);
    }
    
    console.log('資料表建立成功');
    
    // 建立預設管理員帳號
    const defaultUsername = 'admin';
    const defaultPassword = 'admin123';
    
    try {
        // 檢查是否已存在管理員帳號
        db.get('SELECT * FROM users WHERE username = ?', [defaultUsername], async (err, row) => {
            if (err) {
                console.error('查詢使用者時發生錯誤:', err.message);
                db.close();
                process.exit(1);
            }
            
            if (row) {
                console.log('管理員帳號已存在');
                db.close();
                console.log('資料庫初始化完成！');
                console.log('預設管理員帳號: admin');
                console.log('預設密碼: admin123');
                return;
            }
            
            // 加密密碼
            const passwordHash = await bcrypt.hash(defaultPassword, 10);
            
            // 插入管理員帳號
            db.run(
                'INSERT INTO users (username, password_hash) VALUES (?, ?)',
                [defaultUsername, passwordHash],
                (err) => {
                    if (err) {
                        console.error('建立管理員帳號時發生錯誤:', err.message);
                        db.close();
                        process.exit(1);
                    }
                    
                    console.log('預設管理員帳號建立成功');
                    console.log('使用者名稱: admin');
                    console.log('密碼: admin123');
                    
                    db.close((err) => {
                        if (err) {
                            console.error('關閉資料庫時發生錯誤:', err.message);
                        }
                        console.log('資料庫初始化完成！');
                    });
                }
            );
        });
    } catch (error) {
        console.error('發生錯誤:', error.message);
        db.close();
        process.exit(1);
    }
});
