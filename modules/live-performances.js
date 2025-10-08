class LivePerformancesModule {
    static config = {
        name: 'live-performances',
        displayName: 'LIVE PERFORMANCES',
        icon: '🎭'
    };
    
    static performances = [
        {
            id: 1,
            title: "BEACH BEAT",
            description: `It was in the morning, while breakfasting`,
            shortDescription: "Live finger drumming and beatmaking!",
            genre: "Beatmaking Performance",
            duration: "8:13",
            venue: "Banzai Beach",
            date: "6 October 2025",
            youtubeUrl: "https://youtu.be/pz9UyQUNlPQ",
            youtubeId: "pz9UyQUNlPQ", // YouTube video ID
            status: "Past Event",
            favorite: false,
            expanded: false
        },
    ];
    
    static currentPerformance = null;
    
    static getYouTubeThumbnail(youtubeId, quality = 'hqdefault') {
        // quality: 'default', 'mqdefault', 'hqdefault', 'sddefault', 'maxresdefault'
        return `https://i.ytimg.com/vi/${youtubeId}/${quality}.jpg`;
    }
    
    static getYouTubeEmbedUrl(youtubeId) {
        return `https://www.youtube.com/embed/${youtubeId}?rel=0&showinfo=0`;
    }
    
    static render() {
        const performanceItems = this.performances.map(performance => `
            <div class="performance-item pixel-border" data-performance-id="${performance.id}">
                <div class="performance-header">
                    ${this.renderPerformanceCover(performance, 'small')}
                    <div class="performance-basic-info">
                        <h3>${performance.title}</h3>
                        <div class="performance-meta-small">
                            <span class="genre-tag">${performance.genre}</span>
                            <span class="duration">${performance.duration}</span>
                            <span class="performance-status ${performance.status.toLowerCase().replace(' ', '-')}">
                                ${performance.status}
                            </span>
                        </div>
                    </div>
                    <button class="expand-btn" data-performance-id="${performance.id}">
                        ${performance.expanded ? '▲' : '▼'}
                    </button>
                </div>
            </div>
        `).join('');

        return `
            <div class="pixel-text-box">
                <h2>🎭 LIVE PERFORMANCES</h2>
                <p>Immersive audio-visual experiences and experimental live sets:</p>
                
                <div class="performances-intro pixel-border">
                    <h4>🎥 VIDEO DOCUMENTATION</h4>
                    <p>Watch full performances, behind-the-scenes, and experimental sessions on YouTube!</p>
                    <a href="https://www.youtube.com/@djperch6250/videos" target="_blank" class="pixel-btn">SUBSCRIBE ON YOUTUBE</a>
                </div>
                
                <div class="pixel-divider"></div>
                
                <h3>📅 PERFORMANCE ARCHIVE</h3>
                <div class="performances-grid">
                    ${performanceItems}
                </div>
                
                <div class="pixel-divider"></div>
                
                <!-- Performance Display Area -->
                <div class="performance-display-container">
                    <div id="performance-display" class="performance-display pixel-border hidden">
                        <div class="performance-display-header">
                            <h3 id="performance-title">SELECT A PERFORMANCE</h3>
                            <button class="close-performance-btn" id="close-performance">✕</button>
                        </div>
                        <div class="performance-display-content">
                            <div class="performance-info">
                                <div id="performance-cover" class="performance-cover-large">
                                    <div class="cover-placeholder">🎭</div>
                                </div>
                                <div class="performance-details">
                                    <h4 id="performance-name">-</h4>
                                    <div class="performance-meta-display">
                                        <span id="performance-genre" class="genre-tag">-</span>
                                        <span id="performance-duration" class="duration">-</span>
                                        <span id="performance-venue" class="venue-tag">-</span>
                                        <span id="performance-date" class="date-tag">-</span>
                                        <span id="performance-status" class="performance-status">-</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="video-section">
                                <h4>VIDEO PLAYER:</h4>
                                <div id="video-player" class="video-player-large">
                                    <div class="video-placeholder">
                                        <div class="video-emoji">🎬</div>
                                        <p>Click on a performance to load the video</p>
                                    </div>
                                </div>
                                <div class="video-actions">
                                    <a href="#" id="youtube-link" target="_blank" class="pixel-btn">📺 WATCH ON YOUTUBE</a>
                                    <button id="favorite-btn" class="favorite-btn">🤍</button>
                                </div>
                            </div>
                            
                            <div class="description-section">
                                <h4>DESCRIPTION:</h4>
                                <div id="performance-description" class="performance-description">
                                    <p class="short-description">-</p>
                                    <p class="full-description hidden">-</p>
                                    <button id="read-more-btn" class="read-more-btn">Read more ▼</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    static renderPerformanceCover(performance, size = 'small') {
        if (performance.youtubeId) {
            const thumbnailUrl = this.getYouTubeThumbnail(performance.youtubeId, size === 'small' ? 'mqdefault' : 'hqdefault');
            return `
                <div class="performance-cover ${size === 'small' ? 'performance-cover-small' : 'performance-cover-large'}">
                    <img src="${thumbnailUrl}" alt="${performance.title}" 
                         class="youtube-thumbnail"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
                    <div class="thumbnail-fallback" style="display: none;">
                        <span class="fallback-emoji">🎭</span>
                    </div>
                    <div class="play-overlay">
                        <span class="play-icon">▶</span>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="performance-cover ${size === 'small' ? 'performance-cover-small' : 'performance-cover-large'} no-thumbnail">
                    <span class="fallback-emoji">🎭</span>
                </div>
            `;
        }
    }
    
    static init() {
        this.setupEventListeners();
    }
    
    static setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.performance-item')) {
                const performanceItem = e.target.closest('.performance-item');
                const performanceId = parseInt(performanceItem.getAttribute('data-performance-id'));
                this.showPerformance(performanceId);
            }
            
            if (e.target.classList.contains('expand-btn')) {
                const performanceId = parseInt(e.target.getAttribute('data-performance-id'));
                this.togglePerformanceExpand(performanceId, e.target);
            }
            
            if (e.target.id === 'close-performance' || e.target.classList.contains('close-performance-btn')) {
                this.hidePerformance();
            }
            
            if (e.target.id === 'favorite-btn') {
                this.toggleFavorite();
            }
            
            if (e.target.id === 'read-more-btn') {
                this.toggleDescription();
            }
        });
    }
    
    static showPerformance(performanceId) {
        const performance = this.performances.find(p => p.id === performanceId);
        if (!performance) return;
        
        this.currentPerformance = performanceId;
        
        document.getElementById('performance-title').textContent = performance.title;
        document.getElementById('performance-name').textContent = performance.title;
        
        const performanceCoverElement = document.getElementById('performance-cover');
        performanceCoverElement.innerHTML = this.renderPerformanceCover(performance, 'large');
        
        document.getElementById('performance-genre').textContent = performance.genre;
        document.getElementById('performance-duration').textContent = performance.duration;
        document.getElementById('performance-venue').textContent = performance.venue;
        document.getElementById('performance-date').textContent = new Date(performance.date).toLocaleDateString();
        document.getElementById('performance-status').textContent = performance.status;
        document.getElementById('performance-status').className = `performance-status ${performance.status.toLowerCase().replace(' ', '-')}`;
        
        const shortDesc = document.querySelector('.short-description');
        const fullDesc = document.querySelector('.full-description');
        shortDesc.textContent = performance.shortDescription;
        fullDesc.innerHTML = this.formatDescription(performance.description);
        
        document.getElementById('youtube-link').href = performance.youtubeUrl;
        
        const favBtn = document.getElementById('favorite-btn');
        favBtn.textContent = performance.favorite ? '💖' : '🤍';
        favBtn.classList.toggle('favorited', performance.favorite);
        
        this.generateVideoPlayer(performance);
        
        document.getElementById('performance-display').classList.remove('hidden');
        document.getElementById('performance-display').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    static formatDescription(text) {
        return text.replace(/\n/g, '<br>');
    }
    
    static hidePerformance() {
        document.getElementById('performance-display').classList.add('hidden');
        this.currentPerformance = null;
    }
    
    static generateVideoPlayer(performance) {
        const videoContainer = document.getElementById('video-player');
        
        if (performance.youtubeId) {
            const embedUrl = this.getYouTubeEmbedUrl(performance.youtubeId);
            videoContainer.innerHTML = `
                <div class="youtube-embed-container">
                    <iframe src="${embedUrl}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                </div>
            `;
        } else {
            videoContainer.innerHTML = `
                <div class="video-placeholder">
                    <div class="video-emoji">🎥</div>
                    <h4>${performance.title}</h4>
                    <p>Video documentation coming soon</p>
                    <a href="${performance.youtubeUrl}" target="_blank" class="pixel-btn">📺 WATCH ON YOUTUBE</a>
                </div>
            `;
        }
    }
    
    static toggleFavorite() {
        if (!this.currentPerformance) return;
        
        const performance = this.performances.find(p => p.id === this.currentPerformance);
        if (performance) {
            performance.favorite = !performance.favorite;
            const favBtn = document.getElementById('favorite-btn');
            favBtn.textContent = performance.favorite ? '💖' : '🤍';
            favBtn.classList.toggle('favorited', performance.favorite);
        }
    }
    
    static toggleDescription() {
        const fullDesc = document.querySelector('.full-description');
        const readMoreBtn = document.getElementById('read-more-btn');
        
        fullDesc.classList.toggle('hidden');
        readMoreBtn.textContent = fullDesc.classList.contains('hidden') ? 'Read more ▼' : 'Show less ▲';
    }
    
    static togglePerformanceExpand(performanceId, button) {
        const performance = this.performances.find(p => p.id === performanceId);
        if (performance) {
            performance.expanded = !performance.expanded;
            button.textContent = performance.expanded ? '▲' : '▼';
        }
    }
}

app.registerModule(LivePerformancesModule.config.name, LivePerformancesModule);