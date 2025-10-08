// Main Application Controller
class DJPerchApp {
    constructor() {
        this.modules = new Map();
        this.navContainer = document.getElementById('main-nav');
        this.contentContainer = document.getElementById('main-content');
        this.currentModule = null;
        
        this.init();
    }
    
    init() {
        console.log('🎵 DJ Perch App Initializing...');
        this.setupEventListeners();
        
        setTimeout(() => {
            this.createNavigation();
            this.switchToModule('about');
        }, 100);
    }
    
    registerModule(moduleName, moduleClass) {
        this.modules.set(moduleName, moduleClass);
        console.log(`✅ Module registered: ${moduleName}`);
    }
    
    createNavigation() {
        console.log('Creating navigation with modules:', Array.from(this.modules.keys()));
        
        let navHTML = '';
        this.modules.forEach((module, name) => {
            const isActive = name === 'about' ? 'active' : '';
            navHTML += `
                <button class="pixel-btn ${isActive}" data-module="${name}">
                    ${module.config.icon} ${module.config.displayName}
                </button>
            `;
        });
        
        this.navContainer.innerHTML = navHTML;
    }
    
    switchToModule(moduleName) {
        if (!this.modules.has(moduleName)) {
            console.error(`Module not found: ${moduleName}`);
            return;
        }
        
        const module = this.modules.get(moduleName);
        
        document.querySelectorAll('.pixel-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-module="${moduleName}"]`).classList.add('active');
        
        this.contentContainer.innerHTML = module.render();
        this.currentModule = moduleName;
        
        if (module.init) {
            module.init();
        }
        
        console.log(`🔀 Switched to module: ${moduleName}`);
    }
    
    setupEventListeners() {
        this.navContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('pixel-btn')) {
                const moduleName = e.target.getAttribute('data-module');
                this.switchToModule(moduleName);
            }
        });
    }
}

const app = new DJPerchApp();
