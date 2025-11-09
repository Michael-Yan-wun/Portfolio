const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { authMiddleware } = require('../middleware/auth');
const { dbRun } = require('../config/database');

// 設定 multer 儲存
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        // 產生唯一檔名
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'image-' + uniqueSuffix + ext);
    }
});

// 檔案過濾器
const fileFilter = (req, file, cb) => {
    // 允許的檔案類型
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('不支援的檔案類型。僅允許 JPG、PNG、GIF 和 WebP 格式'), false);
    }
};

// 設定 multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

// POST /api/upload - 上傳圖片（需認證）
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: '請選擇要上傳的圖片'
            });
        }
        
        const filename = req.file.filename;
        const filepath = `/uploads/${filename}`;
        
        // 儲存圖片資訊到資料庫
        await dbRun(
            'INSERT INTO images (filename, filepath) VALUES (?, ?)',
            [filename, filepath]
        );
        
        res.json({
            success: true,
            url: filepath
        });
    } catch (error) {
        console.error('上傳圖片錯誤:', error);
        res.status(500).json({
            success: false,
            error: error.message || '上傳圖片時發生錯誤'
        });
    }
});

module.exports = router;
