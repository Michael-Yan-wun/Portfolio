class ProjectCard {
    constructor(projectData) {
        this.data = projectData;
    }
    
    render() {
        const thumbnailUrl = this.data.thumbnail_url || '/assets/images/placeholder.jpg';
        const technologies = this.data.technologies || [];
        
        return `
            <div class="project-card" data-id="${this.data.id}" onclick="window.location.href='project-detail.html?id=${this.data.id}'">
                <img src="${thumbnailUrl}" alt="${this.data.title}" class="project-card-image" loading="lazy">
                <div class="project-card-content">
                    <h3 class="project-card-title">${this.data.title}</h3>
                    <p class="project-card-description">${this.data.description || '暫無描述'}</p>
                    <div class="tech-tags">
                        ${this.renderTechTags(technologies)}
                    </div>
                </div>
            </div>
        `;
    }
    
    renderTechTags(technologies) {
        if (!technologies || technologies.length === 0) {
            return '';
        }
        
        return technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
    }
}

// 輔助函式：渲染多個專案卡片
function renderProjectCards(projects, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (!projects || projects.length === 0) {
        container.innerHTML = '<p class="text-center">目前沒有專案</p>';
        return;
    }
    
    const cardsHTML = projects.map(project => {
        const card = new ProjectCard(project);
        return card.render();
    }).join('');
    
    container.innerHTML = cardsHTML;
}
