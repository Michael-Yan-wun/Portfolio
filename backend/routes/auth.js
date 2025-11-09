const express = require('express');
const router = express.Router();
const { login, verify } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

// POST /api/auth/login - 登入
router.post('/login', login);

// POST /api/auth/verify - 驗證 token
router.post('/verify', authMiddleware, verify);

module.exports = router;
