// API 測試檔案
// 這是一個簡單的測試腳本，用於驗證 API 功能

const http = require('http');

const BASE_URL = 'http://localhost:3000';

// 測試輔助函式
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

// 測試案例
async function runTests() {
    console.log('開始執行 API 測試...\n');
    
    let passedTests = 0;
    let failedTests = 0;
    let token = null;
    
    // 測試 1: 取得所有專案
    try {
        console.log('測試 1: GET /api/projects');
        const response = await makeRequest('/api/projects');
        
        if (response.status === 200 && response.data.success && Array.isArray(response.data.data)) {
            console.log('✓ 通過 - 成功取得專案列表');
            console.log(`  找到 ${response.data.data.length} 個專案`);
            passedTests++;
        } else {
            console.log('✗ 失敗 - 回應格式不正確');
            failedTests++;
        }
    } catch (error) {
        console.log('✗ 失敗 -', error.message);
        failedTests++;
    }
    
    console.log('');
    
    // 測試 2: 取得單一專案
    try {
        console.log('測試 2: GET /api/projects/1');
        const response = await makeRequest('/api/projects/1');
        
        if (response.status === 200 && response.data.success && response.data.data) {
            console.log('✓ 通過 - 成功取得專案詳情');
            console.log(`  專案標題: ${response.data.data.title}`);
            passedTests++;
        } else {
            console.log('✗ 失敗 - 回應格式不正確');
            failedTests++;
        }
    } catch (error) {
        console.log('✗ 失敗 -', error.message);
        failedTests++;
    }
    
    console.log('');
    
    // 測試 3: 取得所有開發紀錄
    try {
        console.log('測試 3: GET /api/devlogs');
        const response = await makeRequest('/api/devlogs');
        
        if (response.status === 200 && response.data.success && Array.isArray(response.data.data)) {
            console.log('✓ 通過 - 成功取得開發紀錄列表');
            console.log(`  找到 ${response.data.data.length} 個開發紀錄`);
            passedTests++;
        } else {
            console.log('✗ 失敗 - 回應格式不正確');
            failedTests++;
        }
    } catch (error) {
        console.log('✗ 失敗 -', error.message);
        failedTests++;
    }
    
    console.log('');
    
    // 測試 4: 登入
    try {
        console.log('測試 4: POST /api/auth/login');
        const response = await makeRequest('/api/auth/login', 'POST', {
            username: 'admin',
            password: 'admin123'
        });
        
        if (response.status === 200 && response.data.success && response.data.token) {
            console.log('✓ 通過 - 登入成功');
            token = response.data.token;
            passedTests++;
        } else {
            console.log('✗ 失敗 - 登入失敗');
            failedTests++;
        }
    } catch (error) {
        console.log('✗ 失敗 -', error.message);
        failedTests++;
    }
    
    console.log('');
    
    // 測試 5: 驗證 token
    if (token) {
        try {
            console.log('測試 5: POST /api/auth/verify');
            const response = await makeRequest('/api/auth/verify', 'POST', null, token);
            
            if (response.status === 200 && response.data.valid) {
                console.log('✓ 通過 - Token 驗證成功');
                passedTests++;
            } else {
                console.log('✗ 失敗 - Token 驗證失敗');
                failedTests++;
            }
        } catch (error) {
            console.log('✗ 失敗 -', error.message);
            failedTests++;
        }
    } else {
        console.log('測試 5: 跳過（無 token）');
    }
    
    console.log('');
    
    // 測試 6: 取得點讚數
    try {
        console.log('測試 6: GET /api/likes/project/1');
        const response = await makeRequest('/api/likes/project/1');
        
        if (response.status === 200 && response.data.success && typeof response.data.count === 'number') {
            console.log('✓ 通過 - 成功取得點讚數');
            console.log(`  點讚數: ${response.data.count}`);
            passedTests++;
        } else {
            console.log('✗ 失敗 - 回應格式不正確');
            failedTests++;
        }
    } catch (error) {
        console.log('✗ 失敗 -', error.message);
        failedTests++;
    }
    
    console.log('');
    
    // 測試 7: 增加點讚
    try {
        console.log('測試 7: POST /api/likes/project/1');
        const response = await makeRequest('/api/likes/project/1', 'POST');
        
        if (response.status === 200 && response.data.success && typeof response.data.count === 'number') {
            console.log('✓ 通過 - 成功增加點讚');
            console.log(`  新的點讚數: ${response.data.count}`);
            passedTests++;
        } else {
            console.log('✗ 失敗 - 回應格式不正確');
            failedTests++;
        }
    } catch (error) {
        console.log('✗ 失敗 -', error.message);
        failedTests++;
    }
    
    console.log('');
    console.log('='.repeat(50));
    console.log(`測試完成！`);
    console.log(`通過: ${passedTests}`);
    console.log(`失敗: ${failedTests}`);
    console.log(`總計: ${passedTests + failedTests}`);
    console.log('='.repeat(50));
    
    process.exit(failedTests > 0 ? 1 : 0);
}

// 執行測試
runTests().catch(error => {
    console.error('測試執行錯誤:', error);
    process.exit(1);
});
