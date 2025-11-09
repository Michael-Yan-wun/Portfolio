const { dbRun, dbGet, dbAll } = require('../config/database');

// 取得所有開發紀錄
const getAllDevlogs = async (req, res) => {
    try {
        const { category, tag, limit, offset } = req.query;
        
        let sql = 'SELECT * FROM dev_logs WHERE 1=1';
        const params = [];
        
        // 篩選分類
        if (category) {
            sql += ' AND category = ?';
            params.push(category);
        }
        
        // 篩選標籤
        if (tag) {
            sql += ' AND tags LIKE ?';
            params.push(`%"${tag}"%`);
        }
        
        // 排序
        sql += ' ORDER BY created_at DESC';
        
        // 分頁
        if (limit) {
            sql += ' LIMIT ?';
            params.push(parseInt(limit));
            
            if (offset) {
                sql += ' OFFSET ?';
                params.push(parseInt(offset));
            }
        }
        
        const devlogs = await dbAll(sql, params);
        
        // 取得總數
        let countSql = 'SELECT COUNT(*) as total FROM dev_logs WHERE 1=1';
        const countParams = [];
        
        if (category) {
            countSql += ' AND category = ?';
            countParams.push(category);
        }
        
        if (tag) {
            countSql += ' AND tags LIKE ?';
            countParams.push(`%"${tag}"%`);
        }
        
        const countResult = await dbGet(countSql, countParams);
        
        // 解析 JSON 字串欄位
        const parsedDevlogs = devlogs.map(devlog => ({
            ...devlog,
            tags: devlog.tags ? JSON.parse(devlog.tags) : []
        }));
        
        res.json({
            success: true,
            data: parsedDevlogs,
            total: countResult.total
        });
    } catch (error) {
        console.error('取得開發紀錄列表錯誤:', error);
        res.status(500).json({
            success: false,
            error: '取得開發紀錄列表時發生錯誤'
        });
    }
};

// 取得單一開發紀錄
const getDevlogById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const devlog = await dbGet(
            'SELECT * FROM dev_logs WHERE id = ?',
            [id]
        );
        
        if (!devlog) {
            return res.status(404).json({
                success: false,
                error: '找不到該開發紀錄'
            });
        }
        
        // 取得點讚數
        const likeData = await dbGet(
            'SELECT count FROM likes WHERE item_type = ? AND item_id = ?',
            ['devlog', id]
        );
        
        // 解析 JSON 字串欄位
        const parsedDevlog = {
            ...devlog,
            tags: devlog.tags ? JSON.parse(devlog.tags) : [],
            likes: likeData ? likeData.count : 0
        };
        
        res.json({
            success: true,
            data: parsedDevlog
        });
    } catch (error) {
        console.error('取得開發紀錄詳情錯誤:', error);
        res.status(500).json({
            success: false,
            error: '取得開發紀錄詳情時發生錯誤'
        });
    }
};

// 建立開發紀錄
const createDevlog = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;
        
        // 驗證必填欄位
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                error: '請提供標題和內容'
            });
        }
        
        // 將 tags 陣列轉換為 JSON 字串
        const tagsJson = JSON.stringify(tags || []);
        
        const result = await dbRun(
            `INSERT INTO dev_logs (title, content, category, tags)
             VALUES (?, ?, ?, ?)`,
            [title, content, category, tagsJson]
        );
        
        // 初始化點讚計數
        await dbRun(
            'INSERT INTO likes (item_type, item_id, count) VALUES (?, ?, ?)',
            ['devlog', result.id, 0]
        );
        
        res.status(201).json({
            success: true,
            data: {
                id: result.id,
                title,
                content,
                category,
                tags: tags || []
            }
        });
    } catch (error) {
        console.error('建立開發紀錄錯誤:', error);
        res.status(500).json({
            success: false,
            error: '建立開發紀錄時發生錯誤'
        });
    }
};

// 更新開發紀錄
const updateDevlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, category, tags } = req.body;
        
        // 檢查開發紀錄是否存在
        const existingDevlog = await dbGet(
            'SELECT * FROM dev_logs WHERE id = ?',
            [id]
        );
        
        if (!existingDevlog) {
            return res.status(404).json({
                success: false,
                error: '找不到該開發紀錄'
            });
        }
        
        // 將 tags 陣列轉換為 JSON 字串
        const tagsJson = JSON.stringify(tags || []);
        
        await dbRun(
            `UPDATE dev_logs 
             SET title = ?, content = ?, category = ?, tags = ?, updated_at = CURRENT_TIMESTAMP
             WHERE id = ?`,
            [title, content, category, tagsJson, id]
        );
        
        res.json({
            success: true,
            data: {
                id: parseInt(id),
                title,
                content,
                category,
                tags: tags || []
            }
        });
    } catch (error) {
        console.error('更新開發紀錄錯誤:', error);
        res.status(500).json({
            success: false,
            error: '更新開發紀錄時發生錯誤'
        });
    }
};

// 刪除開發紀錄
const deleteDevlog = async (req, res) => {
    try {
        const { id } = req.params;
        
        // 檢查開發紀錄是否存在
        const existingDevlog = await dbGet(
            'SELECT * FROM dev_logs WHERE id = ?',
            [id]
        );
        
        if (!existingDevlog) {
            return res.status(404).json({
                success: false,
                error: '找不到該開發紀錄'
            });
        }
        
        // 刪除開發紀錄
        await dbRun('DELETE FROM dev_logs WHERE id = ?', [id]);
        
        // 刪除相關的點讚記錄
        await dbRun('DELETE FROM likes WHERE item_type = ? AND item_id = ?', ['devlog', id]);
        
        res.json({
            success: true,
            message: '開發紀錄已刪除'
        });
    } catch (error) {
        console.error('刪除開發紀錄錯誤:', error);
        res.status(500).json({
            success: false,
            error: '刪除開發紀錄時發生錯誤'
        });
    }
};

module.exports = {
    getAllDevlogs,
    getDevlogById,
    createDevlog,
    updateDevlog,
    deleteDevlog
};
