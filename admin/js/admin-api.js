// 後台 API 客戶端（繼承前台 API 類別）

class AdminAPI extends API {
    constructor() {
        super();
    }
    
    // 取得 token
    getAuthToken() {
        return storage.get('jwt_token');
    }
    
    // 帶認證的請求
    async authenticatedRequest(endpoint, options = {}) {
        const token = this.getAuthToken();
        
        if (!token) {
            throw new Error('未登入');
        }
        
        return await this.request(endpoint, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`
            }
        });
    }
    
    // 專案管理
    async createProjectWithAuth(projectData) {
        return await this.authenticatedRequest('/projects', {
            method: 'POST',
            body: JSON.stringify(projectData)
        });
    }
    
    async updateProjectWithAuth(id, projectData) {
        return await this.authenticatedRequest(`/projects/${id}`, {
            method: 'PUT',
            body: JSON.stringify(projectData)
        });
    }
    
    async deleteProjectWithAuth(id) {
        return await this.authenticatedRequest(`/projects/${id}`, {
            method: 'DELETE'
        });
    }
    
    // 開發紀錄管理
    async createDevlogWithAuth(devlogData) {
        return await this.authenticatedRequest('/devlogs', {
            method: 'POST',
            body: JSON.stringify(devlogData)
        });
    }
    
    async updateDevlogWithAuth(id, devlogData) {
        return await this.authenticatedRequest(`/devlogs/${id}`, {
            method: 'PUT',
            body: JSON.stringify(devlogData)
        });
    }
    
    async deleteDevlogWithAuth(id) {
        return await this.authenticatedRequest(`/devlogs/${id}`, {
            method: 'DELETE'
        });
    }
    
    // 圖片上傳
    async uploadImageWithAuth(file) {
        const token = this.getAuthToken();
        
        if (!token) {
            throw new Error('未登入');
        }
        
        const formData = new FormData();
        formData.append('image', file);
        
        try {
            const url = `${this.baseURL}/upload`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || '上傳失敗');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Upload Error:', error);
            this.showErrorMessage(error.message);
            throw error;
        }
    }
}

// 建立全域後台 API 實例
const adminApi = new AdminAPI();
