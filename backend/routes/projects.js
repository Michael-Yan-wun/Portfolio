const express = require('express');
const router = express.Router();
const {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');
const { authMiddleware } = require('../middleware/auth');

// GET /api/projects - 取得所有專案
router.get('/', getAllProjects);

// GET /api/projects/:id - 取得單一專案
router.get('/:id', getProjectById);

// POST /api/projects - 建立專案（需認證）
router.post('/', authMiddleware, createProject);

// PUT /api/projects/:id - 更新專案（需認證）
router.put('/:id', authMiddleware, updateProject);

// DELETE /api/projects/:id - 刪除專案（需認證）
router.delete('/:id', authMiddleware, deleteProject);

module.exports = router;
