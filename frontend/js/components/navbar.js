class Navbar {
    constructor(containerId, currentPage) {
        this.container = document.getElementById(containerId);
        this.currentPage = currentPage;
        this.isMenuOpen = false;
        this.render();
        this.attachEvents();
    }
    
    render() {
        const navHTML = `
            <nav class="navbar">
                <div class="container navbar-container">
                    <a href="index.html" class="navbar-logo">DevPortfolio</a>
                    
                    <ul class="navbar-menu" id="navbarMenu">
                        <li><a href="index.html" class="${this.currentPage === 'home' ? 'active' : ''}">首頁</a></li>
                        <li><a href="about.html" class="${this.currentPage === 'about' ? 'active' : ''}">關於我</a></li>
                        <li><a href="projects.html" class="${this.currentPage === 'projects' ? 'active' : ''}">專案作品</a></li>
                        <li><a href="devlog.html" class="${this.currentPage === 'devlog' ? 'active' : ''}">開發紀錄</a></li>
                    </ul>
                    
                    <div class="navbar-toggle" id="navbarToggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        `;
        
        this.container.innerHTML = navHTML;
    }
    
    attachEvents() {
        const toggle = document.getElementById('navbarToggle');
        const menu = document.getElementById('navbarMenu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                this.isMenuOpen = !this.isMenuOpen;
                toggle.classList.toggle('active');
                menu.classList.toggle('active');
            });
            
            // 點擊選單項目後關閉選單（行動裝置）
            const menuLinks = menu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 767) {
                        this.isMenuOpen = false;
                        toggle.classList.remove('active');
                        menu.classList.remove('active');
                    }
                });
            });
            
            // 點擊外部關閉選單
            document.addEventListener('click', (e) => {
                if (this.isMenuOpen && 
                    !toggle.contains(e.target) && 
                    !menu.contains(e.target)) {
                    this.isMenuOpen = false;
                    toggle.classList.remove('active');
                    menu.classList.remove('active');
                }
            });
        }
        
        // 捲動時改變導航列樣式
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            }
            
            lastScroll = currentScroll;
        });
    }
}

// 自動初始化（如果頁面有 navbar-container）
document.addEventListener('DOMContentLoaded', () => {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        // 從 body 的 data-page 屬性取得當前頁面
        const currentPage = document.body.dataset.page || 'home';
        new Navbar('navbar-container', currentPage);
    }
});
