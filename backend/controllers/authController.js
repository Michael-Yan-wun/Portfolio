const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { dbGet } = require('../config/database');
const { JWT_SECRET } = require('../middleware/auth');

// 登入
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // 驗證輸入
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: '請提供使用者名稱和密碼'
            });
        }
        
        // 查詢使用者
        const user = await dbGet(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
        
        if (!user) {
            return res.status(401).json({
                success: false,
                error: '使用者名稱或密碼錯誤'
            });
        }
        
        // 驗證密碼
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: '使用者名稱或密碼錯誤'
            });
        }
        
        // 產生 JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            success: true,
            token,
            expiresIn: '24h'
        });
    } catch (error) {
        console.error('登入錯誤:', error);
        res.status(500).json({
            success: false,
            error: '登入時發生錯誤'
        });
    }
};

// 驗證 token
const verify = async (req, res) => {
    try {
        // 如果通過 authMiddleware，表示 token 有效
        res.json({
            valid: true,
            user: {
                id: req.user.id,
                username: req.user.username
            }
        });
    } catch (error) {
        console.error('驗證錯誤:', error);
        res.status(500).json({
            success: false,
            error: '驗證時發生錯誤'
        });
    }
};

module.exports = {
    login,
    verify
};
