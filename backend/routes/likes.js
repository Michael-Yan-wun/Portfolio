const express = require('express');
const router = express.Router();
const { getLikeCount, addLike } = require('../controllers/likeController');

// GET /api/likes/:itemType/:itemId - 取得點讚數
router.get('/:itemType/:itemId', getLikeCount);

// POST /api/likes/:itemType/:itemId - 增加點讚
router.post('/:itemType/:itemId', addLike);

module.exports = router;
