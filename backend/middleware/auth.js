const jwt = require('jsonwebtoken');

// JWT 密鑰（生產環境應使用環境變數）
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// JWT 驗證中介層
const authMiddleware = (req, res, next) => {
    try {
        // 從 Authorization header 取得 token
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: '未提供認證 token'
            });
        }
        
        const token = authHeader.substring(7); // 移除 "Bearer " 前綴
        
        // 驗證 token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // 將使用者資訊附加到 request 物件
        req.user = decoded;
        
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: 'Token 已過期'
            });
        }
        
        return res.status(401).json({
            success: false,
            error: '無效的 token'
        });
    }
};

module.exports = {
    authMiddleware,
    JWT_SECRET
};
