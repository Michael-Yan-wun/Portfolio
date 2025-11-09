class Footer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
    }
    
    render() {
        const currentYear = new Date().getFullYear();
        
        const footerHTML = `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3>關於</h3>
                            <p>這是一個展示學生開發者作品與開發歷程的個人網站。記錄成長，分享經驗。</p>
                            <div class="footer-social">
                                <a href="https://github.com" target="_blank" title="GitHub">
                                    <i class="fab fa-github"></i>
                                </a>
                                <a href="https://linkedin.com" target="_blank" title="LinkedIn">
                                    <i class="fab fa-linkedin"></i>
                                </a>
                                <a href="https://twitter.com" target="_blank" title="Twitter">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a href="mailto:contact@example.com" title="Email">
                                    <i class="fas fa-envelope"></i>
                                </a>
                            </div>
                        </div>
                        
                        <div class="footer-section">
                            <h3>快速連結</h3>
                            <ul class="footer-links">
                                <li><a href="index.html">首頁</a></li>
                                <li><a href="about.html">關於我</a></li>
                                <li><a href="projects.html">專案作品</a></li>
                                <li><a href="devlog.html">開發紀錄</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-section">
                            <h3>聯絡方式</h3>
                            <ul class="footer-links">
                                <li><i class="fas fa-envelope"></i> contact@example.com</li>
                                <li><i class="fas fa-map-marker-alt"></i> 台灣</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="footer-bottom">
                        <p>&copy; ${currentYear} DevPortfolio. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
        
        this.container.innerHTML = footerHTML;
    }
}

// 自動初始化（如果頁面有 footer-container）
document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        new Footer('footer-container');
    }
});
