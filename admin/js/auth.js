// 後台認證模組

// 檢查認證狀態
async function checkAuth() {
    const token = storage.get('jwt_token');
    
    if (!token) {
        redirectToLogin();
        return false;
    }
    
    try {
        const response = await api.verifyToken(token);
        
        if (!response.valid) {
            storage.remove('jwt_token');
            redirectToLogin();
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('驗證錯誤:', error);
        storage.remove('jwt_token');
        redirectToLogin();
        return false;
    }
}

// 跳轉到登入頁面
function redirectToLogin() {
    if (!window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
}

// 登出
function logout() {
    storage.remove('jwt_token');
    api.showSuccessMessage('已登出');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 500);
}

// 取得 token
function getToken() {
    return storage.get('jwt_token');
}

// 在所有後台頁面載入時檢查認證（除了登入頁面）
if (!window.location.pathname.includes('login.html')) {
    document.addEventListener('DOMContentLoaded', async () => {
        const isAuthenticated = await checkAuth();
        
        if (!isAuthenticated) {
            return;
        }
        
        // 綁定登出按鈕
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('確定要登出嗎？')) {
                    logout();
                }
            });
        }
    });
}
