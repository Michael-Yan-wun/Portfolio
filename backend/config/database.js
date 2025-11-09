const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 資料庫檔案路徑
const dbPath = path.join(__dirname, '../../database/portfolio.db');

// 建立資料庫連線
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('無法連接資料庫:', err.message);
        throw err;
    }
    console.log('已連接到 SQLite 資料庫');
});

// 將 callback 風格的方法轉換為 Promise
const dbRun = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, changes: this.changes });
        });
    });
};

const dbGet = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const dbAll = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

module.exports = {
    db,
    dbRun,
    dbGet,
    dbAll
};
