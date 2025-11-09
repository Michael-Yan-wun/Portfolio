const { dbRun, dbGet, dbAll } = require('../config/database');

// 取得所有專案
const getAllProjects = async (req, res) => {
    try {
        const projects = await dbAll(
            'SELECT * FROM projects ORDER BY created_at DESC'
        );
        
        // 解析 JSON 字串欄位
        const parsedProjects = projects.map(project => ({
            ...project,
            technologies: project.technologies ? JSON.parse(project.technologies) : []
        }));
        
        res.json({
            success: true,
            data: parsedProjects
        });
    } catch (error) {
        console.error('取得專案列表錯誤:', error);
        res.status(500).json({
            success: false,
            error: '取得專案列表時發生錯誤'
        });
    }
};

// 取得單一專案
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const project = await dbGet(
            'SELECT * FROM projects WHERE id = ?',
            [id]
        );
        
        if (!project) {
            return res.status(404).json({
                success: false,
                error: '找不到該專案'
            });
        }
        
        // 取得點讚數
        const likeData = await dbGet(
            'SELECT count FROM likes WHERE item_type = ? AND item_id = ?',
            ['project', id]
        );
        
        // 解析 JSON 字串欄位
        const parsedProject = {
            ...project,
            technologies: project.technologies ? JSON.parse(project.technologies) : [],
            likes: likeData ? likeData.count : 0
        };
        
        res.json({
            success: true,
            data: parsedProject
        });
    } catch (error) {
        console.error('取得專案詳情錯誤:', error);
        res.status(500).json({
            success: false,
            error: '取得專案詳情時發生錯誤'
        });
    }
};

// 建立專案
const createProject = async (req, res) => {
    try {
        const { title, description, content, technologies, thumbnail_url, demo_url, repo_url } = req.body;
        
        // 驗證必填欄位
        if (!title) {
            return res.status(400).json({
                success: false,
                error: '請提供專案標題'
            });
        }
        
        // 將 technologies 陣列轉換為 JSON 字串
        const technologiesJson = JSON.stringify(technologies || []);
        
        const result = await dbRun(
            `INSERT INTO projects (title, description, content, technologies, thumbnail_url, demo_url, repo_url)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, description, content, technologiesJson, thumbnail_url, demo_url, repo_url]
        );
        
        // 初始化點讚計數
        await dbRun(
            'INSERT INTO likes (item_type, item_id, count) VALUES (?, ?, ?)',
            ['project', result.id, 0]
        );
        
        res.status(201).json({
            success: true,
            data: {
                id: result.id,
                title,
                description,
                content,
                technologies: technologies || [],
                thumbnail_url,
                demo_url,
                repo_url
            }
        });
    } catch (error) {
        console.error('建立專案錯誤:', error);
        res.status(500).json({
            success: false,
            error: '建立專案時發生錯誤'
        });
    }
};

// 更新專案
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, content, technologies, thumbnail_url, demo_url, repo_url } = req.body;
        
        // 檢查專案是否存在
        const existingProject = await dbGet(
            'SELECT * FROM projects WHERE id = ?',
            [id]
        );
        
        if (!existingProject) {
            return res.status(404).json({
                success: false,
                error: '找不到該專案'
            });
        }
        
        // 將 technologies 陣列轉換為 JSON 字串
        const technologiesJson = JSON.stringify(technologies || []);
        
        await dbRun(
            `UPDATE projects 
             SET title = ?, description = ?, content = ?, technologies = ?, 
                 thumbnail_url = ?, demo_url = ?, repo_url = ?, updated_at = CURRENT_TIMESTAMP
             WHERE id = ?`,
            [title, description, content, technologiesJson, thumbnail_url, demo_url, repo_url, id]
        );
        
        res.json({
            success: true,
            data: {
                id: parseInt(id),
                title,
                description,
                content,
                technologies: technologies || [],
                thumbnail_url,
                demo_url,
                repo_url
            }
        });
    } catch (error) {
        console.error('更新專案錯誤:', error);
        res.status(500).json({
            success: false,
            error: '更新專案時發生錯誤'
        });
    }
};

// 刪除專案
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        
        // 檢查專案是否存在
        const existingProject = await dbGet(
            'SELECT * FROM projects WHERE id = ?',
            [id]
        );
        
        if (!existingProject) {
            return res.status(404).json({
                success: false,
                error: '找不到該專案'
            });
        }
        
        // 刪除專案
        await dbRun('DELETE FROM projects WHERE id = ?', [id]);
        
        // 刪除相關的點讚記錄
        await dbRun('DELETE FROM likes WHERE item_type = ? AND item_id = ?', ['project', id]);
        
        res.json({
            success: true,
            message: '專案已刪除'
        });
    } catch (error) {
        console.error('刪除專案錯誤:', error);
        res.status(500).json({
            success: false,
            error: '刪除專案時發生錯誤'
        });
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};
