class SoundExperimentsModule {
    static config = {
        name: 'sound-experiments',
        displayName: 'SOUND EXPERIMENTS',
        icon: '🔬'
    };
    
    static tracks = [
        {
            id: 1,
            title: "COMANDANTE ON THE WHEELS OF STEEL",
            description: `Our world stands on the brink of two abysses...`, // ваш существующий текст
            shortDescription: "Comrades, dreamers, skeptics, and believers!",
            genre: "Experimental",
            bpm: "110",
            key: "Microtonal",
            duration: "3:15",
            cover: "https://f4.bcbits.com/img/a3550475376_10.jpg",
            coverType: "image",
            bandcampUrl: "https://djperch.bandcamp.com/track/comandante-on-the-wheels-of-steel",
            // Nina Protocol информация
            ninaProtocol: {
                available: true,
                mintUrl: "https://www.ninaprotocol.com/releases/dj-perch-comandante-on-the-wheels-of-steel",
                listenUrl: "https://www.ninaprotocol.com/releases/dj-perch-comandante-on-the-wheels-of-steel",
                nftAddress: "0x..." // опционально, если есть
            },
            embedCode: `<iframe style="border: 0; width: 100%; height: 472px;" src="https://bandcamp.com/EmbeddedPlayer/track=2691374158/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=big/transparent=true/" seamless><a href="https://djperch.bandcamp.com/track/comandante-on-the-wheels-of-steel">Comandante on the Wheels of Steel by Dj Perch</a></iframe>`,
            price: "Name Your Price",
            releaseDate: "August 20, 2025",
            favorite: false,
            expanded: false
        },
        // Добавьте другие треки с поддержкой Nina Protocol
    ];
    
    static currentTrack = null;
    
    static render() {
        const trackItems = this.tracks.map(track => `
            <div class="track-item pixel-border" data-track-id="${track.id}">
                <div class="track-header">
                    ${this.renderTrackCover(track, 'small')}
                    <div class="track-basic-info">
                        <h3>${track.title}</h3>
                        <div class="track-meta-small">
                            <span class="genre-tag">${track.genre}</span>
                            <span class="duration">${track.duration}</span>
                            ${track.ninaProtocol?.available ? '<span class="nina-tag">🎵 NINA</span>' : ''}
                        </div>
                    </div>
                    <button class="expand-btn" data-track-id="${track.id}">
                        ${track.expanded ? '▲' : '▼'}
                    </button>
                </div>
            </div>
        `).join('');

        return `
            <div class="pixel-text-box">
                <h2>🔬 SOUND EXPERIMENTS</h2>
                <p>Exploring the boundaries of audio perception and digital sound manipulation:</p>
                
                <div class="bandcamp-notice pixel-border">
                    <h4>🔬 EXPERIMENTAL RELEASES</h4>
                    <p>All sound experiments are available for free streaming and download. Support the research! 🎛️</p>
                    <a href="https://djperch.bandcamp.com" target="_blank" class="pixel-btn">VISIT BANDCAMP STORE</a>
                </div>

                <!-- Добавляем Nina Protocol Notice -->
                <div class="nina-notice pixel-border">
                    <h4>🔄 DECENTRALIZED MUSIC ON NINA PROTOCOL</h4>
                    <p>Listen and mint this track as NFT on the decentralized Nina Protocol platform!</p>
                    <a href="https://www.ninaprotocol.com/profiles/dj-perch" target="_blank" class="pixel-btn nina-btn">🌐 EXPLORE NINA PROTOCOL</a>
                </div>
                
                <div class="pixel-divider"></div>
                
                <h3>🎛️ CURRENT RESEARCH PROJECTS</h3>
                <div class="tracks-grid">
                    ${trackItems}
                </div>
                
                <div class="pixel-divider"></div>
                
                <!-- Track Display Area -->
                <div class="track-display-container">
                    <div id="track-display" class="track-display pixel-border hidden">
                        <div class="track-display-header">
                            <h3 id="track-title">SELECT A TRACK</h3>
                            <button class="close-track-btn" id="close-track">✕</button>
                        </div>
                        <div class="track-display-content">
                            <div class="track-info">
                                <div id="track-cover" class="track-cover-large">
                                    <div class="cover-placeholder">⚛️</div>
                                </div>
                                <div class="track-details">
                                    <h4 id="track-name">-</h4>
                                    <div class="track-meta-display">
                                        <span id="track-genre" class="genre-tag">-</span>
                                        <span id="track-bpm" class="bpm">-</span>
                                        <span id="track-key" class="key-tag">-</span>
                                        <span id="track-duration" class="duration">-</span>
                                        ${this.renderNinaTag()}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="player-section">
                                <h4>AUDIO PLAYER:</h4>
                                <div id="audio-player" class="audio-player-large">
                                    <div class="player-placeholder">
                                        <div class="player-emoji">🎵</div>
                                        <p>Click on a track to load the player</p>
                                    </div>
                                </div>
                                <div class="player-actions">
                                    <a href="#" id="bandcamp-link" target="_blank" class="pixel-btn">🎵 BANDCAMP</a>
                                    <a href="#" id="nina-listen-link" target="_blank" class="pixel-btn nina-btn" style="display: none;">🌐 NINA PROTOCOL</a>
                                    <button id="favorite-btn" class="favorite-btn">🤍</button>
                                </div>
                            </div>
                            
                            <div class="description-section">
                                <h4>DESCRIPTION:</h4>
                                <div id="track-description" class="track-description">
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

    static renderNinaTag() {
        return `<span id="nina-protocol-tag" class="nina-tag-large" style="display: none;">🎵 NINA PROTOCOL</span>`;
    }
    
    static renderTrackCover(track, size = 'large') {
        const isImage = track.cover.startsWith('http') || track.coverType === 'image';
        const isSmall = size === 'large';
        
        if (isImage) {
            return `
                <div class="track-cover ${isSmall ? 'track-cover-large' : ''}">
                    <img src="${track.cover}" alt="${track.title}" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
                    <span class="cover-fallback" style="display: none;">${this.getFallbackEmoji(track)}</span>
                </div>
            `;
        } else {
            return `
                <div class="track-cover ${isSmall ? 'track-cover-large' : ''} emoji-cover">
                    ${track.cover}
                </div>
            `;
        }
    }
    
    static getFallbackEmoji(track) {
        return track.coverType === 'emoji' ? track.cover : '🎵';
    }
    
    static init() {
        this.setupEventListeners();
    }
    
    static setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.track-item')) {
                const trackItem = e.target.closest('.track-item');
                const trackId = parseInt(trackItem.getAttribute('data-track-id'));
                this.showTrack(trackId);
            }
            
            if (e.target.classList.contains('expand-btn')) {
                const trackId = parseInt(e.target.getAttribute('data-track-id'));
                this.toggleTrackExpand(trackId, e.target);
            }
            
            if (e.target.id === 'close-track' || e.target.classList.contains('close-track-btn')) {
                this.hideTrack();
            }
            
            if (e.target.id === 'favorite-btn') {
                this.toggleFavorite();
            }
            
            if (e.target.id === 'read-more-btn') {
                this.toggleDescription();
            }
        });
    }
    
    static showTrack(trackId) {
        const track = this.tracks.find(t => t.id === trackId);
        if (!track) return;
        
        this.currentTrack = trackId;
        
        document.getElementById('track-title').textContent = `${this.getFallbackEmoji(track)} ${track.title}`;
        document.getElementById('track-name').textContent = track.title;
        
        const trackCoverElement = document.getElementById('track-cover');
        trackCoverElement.innerHTML = this.renderTrackCover(track, 'large');
        
        document.getElementById('track-genre').textContent = track.genre;
        document.getElementById('track-bpm').textContent = `${track.bpm} BPM`;
        document.getElementById('track-key').textContent = track.key;
        document.getElementById('track-duration').textContent = track.duration;
        
        // Показываем/скрываем тег Nina Protocol
        const ninaTag = document.getElementById('nina-protocol-tag');
        if (track.ninaProtocol?.available) {
            ninaTag.style.display = 'inline-block';
        } else {
            ninaTag.style.display = 'none';
        }
        
        const shortDesc = document.querySelector('.short-description');
        const fullDesc = document.querySelector('.full-description');
        shortDesc.textContent = track.shortDescription;
        fullDesc.innerHTML = this.formatDescription(track.description);
        
        document.getElementById('bandcamp-link').href = track.bandcampUrl;
        
        // Настраиваем кнопку Nina Protocol
        const ninaListenLink = document.getElementById('nina-listen-link');
        if (track.ninaProtocol?.available) {
            ninaListenLink.href = track.ninaProtocol.listenUrl;
            ninaListenLink.style.display = 'inline-block';
            ninaListenLink.textContent = '🌐 NINA PROTOCOL';
        } else {
            ninaListenLink.style.display = 'none';
        }
        
        const favBtn = document.getElementById('favorite-btn');
        favBtn.textContent = track.favorite ? '💖' : '🤍';
        favBtn.classList.toggle('favorited', track.favorite);
        
        this.generatePlayer(track);
        
        document.getElementById('track-display').classList.remove('hidden');
        document.getElementById('track-display').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    static formatDescription(text) {
        return text.replace(/\n/g, '<br>');
    }
    
    static hideTrack() {
        document.getElementById('track-display').classList.add('hidden');
        this.currentTrack = null;
    }
    
    static generatePlayer(track) {
        const playerContainer = document.getElementById('audio-player');
        
        if (track.embedCode) {
            playerContainer.innerHTML = track.embedCode;
        } else {
            playerContainer.innerHTML = `
                <div class="large-bandcamp-player">
                    <div class="player-header">
                        <h4>${track.title} - Preview</h4>
                        <p>Full track available on Bandcamp and Nina Protocol</p>
                    </div>
                    <div class="player-placeholder-large">
                        <div class="large-player-emoji">🎵</div>
                        <p>Track preview coming soon</p>
                        <div class="player-links">
                            <a href="${track.bandcampUrl}" target="_blank" class="pixel-btn">🎧 BANDCAMP</a>
                            ${track.ninaProtocol?.available ? 
                                `<a href="${track.ninaProtocol.listenUrl}" target="_blank" class="pixel-btn nina-btn">🌐 NINA PROTOCOL</a>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    static toggleFavorite() {
        if (!this.currentTrack) return;
        
        const track = this.tracks.find(t => t.id === this.currentTrack);
        if (track) {
            track.favorite = !track.favorite;
            const favBtn = document.getElementById('favorite-btn');
            favBtn.textContent = track.favorite ? '💖' : '🤍';
            favBtn.classList.toggle('favorited', track.favorite);
        }
    }
    
    static toggleDescription() {
        const fullDesc = document.querySelector('.full-description');
        const readMoreBtn = document.getElementById('read-more-btn');
        
        fullDesc.classList.toggle('hidden');
        readMoreBtn.textContent = fullDesc.classList.contains('hidden') ? 'Read more ▼' : 'Show less ▲';
    }
    
    static toggleTrackExpand(trackId, button) {
        const track = this.tracks.find(t => t.id === trackId);
        if (track) {
            track.expanded = !track.expanded;
            button.textContent = track.expanded ? '▲' : '▼';
        }
    }
}

app.registerModule(SoundExperimentsModule.config.name, SoundExperimentsModule);