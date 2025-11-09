// 整合測試 - 測試完整的使用者流程

const http = require('http');

const BASE_URL = 'http://localhost:3000';

function makeRequest(path, method = 'GET', data = null, token = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
        
        const req = http.request(options, (res) => {
            let body = '';
            
            res.on('data', (chunk) => {
                body += chunk;
            });
            
            res.on('end', () => {
                try {
                    const response = JSON.parse(body);
                    resolve({ status: res.statusCode, data: response });
                } catch (error) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

async function runIntegrationTests() {
    console.log('開始執行整合測試...\n');
    console.log('測試場景：完整的專案管理流程\n');
    
    let token = null;
    let projectId = null;
    
    try {
        // 步驟 1: 管理員登入
        console.log('步驟 1: 管理員登入');
        const loginResponse = await makeRequest('/api/auth/login', 'POST', {
            username: 'admin',
            password: 'admin123'
        });
        
        if (loginResponse.data.success && loginResponse.data.token) {
            token = loginResponse.data.token;
            console.log('✓ 登入成功\n');
        } else {
            throw new Error('登入失敗');
        }
        
        // 步驟 2: 建立新專案
        console.log('步驟 2: 建立新專案');
        const newProject = {
            title: '測試專案',
            description: '這是一個測試專案',
            content: '# 測試內容\n\n這是測試用的 Markdown 內容。',
            technologies: ['JavaScript', 'Node.js'],
            demo_url: 'https://example.com',
            repo_url: 'https://github.com/test/repo'
        };
        
        const createResponse = await makeRequest('/api/projects', 'POST', newProject, token);
        
        if (createResponse.data.success && createResponse.data.data.id) {
            projectId = createResponse.data.data.id;
            console.log(`✓ 專案建立成功 (ID: ${projectId})\n`);
        } else {
            throw new Error('建立專案失敗');
        }
        
        // 步驟 3: 讀取專案詳情
        console.log('步驟 3: 讀取專案詳情');
        const getResponse = await makeRequest(`/api/projects/${projectId}`);
        
        if (getResponse.data.success && getResponse.data.data.title === newProject.title) {
            console.log('✓ 成功讀取專案詳情\n');
        } else {
            throw new Error('讀取專案失敗');
        }
        
        // 步驟 4: 更新專案
        console.log('步驟 4: 更新專案');
        const updatedProject = {
            ...newProject,
            title: '測試專案（已更新）',
            description: '這是更新後的描述'
        };
        
        const updateResponse = await makeRequest(`/api/projects/${projectId}`, 'PUT', updatedProject, token);
        
        if (updateResponse.data.success) {
            console.log('✓ 專案更新成功\n');
        } else {
            throw new Error('更新專案失敗');
        }
        
        // 步驟 5: 訪客為專案點讚
        console.log('步驟 5: 訪客為專案點讚');
        const likeResponse = await makeRequest(`/api/likes/project/${projectId}`, 'POST');
        
        if (likeResponse.data.success && likeResponse.data.count > 0) {
            console.log(`✓ 點讚成功 (點讚數: ${likeResponse.data.count})\n`);
        } else {
            throw new Error('點讚失敗');
        }
        
        // 步驟 6: 查詢點讚數
        console.log('步驟 6: 查詢點讚數');
        const getLikeResponse = await makeRequest(`/api/likes/project/${projectId}`);
        
        if (getLikeResponse.data.success && getLikeResponse.data.count > 0) {
            console.log(`✓ 成功查詢點讚數 (${getLikeResponse.data.count})\n`);
        } else {
            throw new Error('查詢點讚數失敗');
        }
        
        // 步驟 7: 刪除專案
        console.log('步驟 7: 刪除測試專案');
        const deleteResponse = await makeRequest(`/api/projects/${projectId}`, 'DELETE', null, token);
        
        if (deleteResponse.data.success) {
            console.log('✓ 專案刪除成功\n');
        } else {
            throw new Error('刪除專案失敗');
        }
        
        // 步驟 8: 驗證專案已刪除
        console.log('步驟 8: 驗證專案已刪除');
        const verifyResponse = await makeRequest(`/api/projects/${projectId}`);
        
        if (verifyResponse.status === 404) {
            console.log('✓ 確認專案已刪除\n');
        } else {
            throw new Error('專案仍然存在');
        }
        
        console.log('='.repeat(50));
        console.log('整合測試完成！所有測試通過 ✓');
        console.log('='.repeat(50));
        
        process.exit(0);
        
    } catch (error) {
        console.error('\n✗ 測試失敗:', error.message);
        console.log('='.repeat(50));
        process.exit(1);
    }
}

// 執行測試
runIntegrationTests();
