const express = require('express');
const router = express.Router();
const {
    getAllDevlogs,
    getDevlogById,
    createDevlog,
    updateDevlog,
    deleteDevlog
} = require('../controllers/devlogController');
const { authMiddleware } = require('../middleware/auth');

// GET /api/devlogs - 取得所有開發紀錄
router.get('/', getAllDevlogs);

// GET /api/devlogs/:id - 取得單一開發紀錄
router.get('/:id', getDevlogById);

// POST /api/devlogs - 建立開發紀錄（需認證）
router.post('/', authMiddleware, createDevlog);

// PUT /api/devlogs/:id - 更新開發紀錄（需認證）
router.put('/:id', authMiddleware, updateDevlog);

// DELETE /api/devlogs/:id - 刪除開發紀錄（需認證）
router.delete('/:id', authMiddleware, deleteDevlog);

module.exports = router;
