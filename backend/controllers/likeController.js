const { dbRun, dbGet } = require('../config/database');

// 取得點讚數
const getLikeCount = async (req, res) => {
    try {
        const { itemType, itemId } = req.params;
        
        // 驗證 itemType
        if (itemType !== 'project' && itemType !== 'devlog') {
            return res.status(400).json({
                success: false,
                error: '無效的項目類型'
            });
        }
        
        const likeData = await dbGet(
            'SELECT count FROM likes WHERE item_type = ? AND item_id = ?',
            [itemType, itemId]
        );
        
        res.json({
            success: true,
            count: likeData ? likeData.count : 0
        });
    } catch (error) {
        console.error('取得點讚數錯誤:', error);
        res.status(500).json({
            success: false,
            error: '取得點讚數時發生錯誤'
        });
    }
};

// 增加點讚
const addLike = async (req, res) => {
    try {
        const { itemType, itemId } = req.params;
        
        // 驗證 itemType
        if (itemType !== 'project' && itemType !== 'devlog') {
            return res.status(400).json({
                success: false,
                error: '無效的項目類型'
            });
        }
        
        // 檢查是否已存在點讚記錄
        const existingLike = await dbGet(
            'SELECT * FROM likes WHERE item_type = ? AND item_id = ?',
            [itemType, itemId]
        );
        
        let newCount;
        
        if (existingLike) {
            // 更新點讚數
            newCount = existingLike.count + 1;
            await dbRun(
                'UPDATE likes SET count = ? WHERE item_type = ? AND item_id = ?',
                [newCount, itemType, itemId]
            );
        } else {
            // 建立新的點讚記錄
            newCount = 1;
            await dbRun(
                'INSERT INTO likes (item_type, item_id, count) VALUES (?, ?, ?)',
                [itemType, itemId, newCount]
            );
        }
        
        res.json({
            success: true,
            count: newCount
        });
    } catch (error) {
        console.error('增加點讚錯誤:', error);
        res.status(500).json({
            success: false,
            error: '增加點讚時發生錯誤'
        });
    }
};

module.exports = {
    getLikeCount,
    addLike
};
