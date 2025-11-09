const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 中介層
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 靜態檔案服務
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// 路由
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const devlogRoutes = require('./routes/devlogs');
const likeRoutes = require('./routes/likes');
const uploadRoutes = require('./routes/upload');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/devlogs', devlogRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/upload', uploadRoutes);

// 錯誤處理中介層
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || '伺服器錯誤';
    
    res.status(statusCode).json({
        success: false,
        error: message
    });
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`伺服器運行在 http://localhost:${PORT}`);
});
