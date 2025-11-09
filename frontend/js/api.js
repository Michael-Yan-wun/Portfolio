class API {
    constructor(baseURL = 'http://localhost:3000/api') {
        this.baseURL = baseURL;
    }
    
    async request(endpoint, options = {}) {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            this.showErrorMessage(error.message);
            throw error;
        }
    }
    
    showErrorMessage(message) {
        // 顯示 Toast 通知
        const toast = document.createElement('div');
        toast.className = 'toast error-message';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
    
    showSuccessMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'toast success-message';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
    
    // 專案 API
    async getAllProjects() {
        return await this.request('/projects');
    }
    
    async getProjectById(id) {
        return await this.request(`/projects/${id}`);
    }
    
    async createProject(projectData, token) {
        return await this.request('/projects', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(projectData)
        });
    }
    
    async updateProject(id, projectData, token) {
        return await this.request(`/projects/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(projectData)
        });
    }
    
    async deleteProject(id, token) {
        return await this.request(`/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    
    // 開發紀錄 API
    async getAllDevlogs(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = queryString ? `/devlogs?${queryString}` : '/devlogs';
        return await this.request(endpoint);
    }
    
    async getDevlogById(id) {
        return await this.request(`/devlogs/${id}`);
    }
    
    async createDevlog(devlogData, token) {
        return await this.request('/devlogs', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(devlogData)
        });
    }
    
    async updateDevlog(id, devlogData, token) {
        return await this.request(`/devlogs/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(devlogData)
        });
    }
    
    async deleteDevlog(id, token) {
        return await this.request(`/devlogs/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    
    // 點讚 API
    async getLikeCount(itemType, itemId) {
        return await this.request(`/likes/${itemType}/${itemId}`);
    }
    
    async addLike(itemType, itemId) {
        return await this.request(`/likes/${itemType}/${itemId}`, {
            method: 'POST'
        });
    }
    
    // 認證 API
    async login(username, password) {
        return await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
    }
    
    async verifyToken(token) {
        return await this.request('/auth/verify', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    
    // 圖片上傳 API
    async uploadImage(file, token) {
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

// 建立全域 API 實例
const api = new API();
