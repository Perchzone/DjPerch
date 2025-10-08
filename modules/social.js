class SocialModule {
    static config = {
        name: 'social',
        displayName: 'SOCIAL',
        icon: '🌐'
    };
    
    static render() {
        const socials = [
            { platform: "Instagram", emoji: "📸", url: "https://instagram.com/dj.perch" },
            { platform: "Bandcamp", emoji: "🎵", url: "https://djperch.bandcamp.com" },
            { platform: "YouTube", emoji: "🎥", url: "https://youtube.com/@djperch6250" },
            { platform: "Telegram", emoji: "📢", url: "https://t.me/dj_perch" }
        ];

        const socialGrid = socials.map(social => `
            <a href="${social.url}" class="social-item pixel-border" target="_blank" rel="noopener">
                <span class="social-emoji">${social.emoji}</span>
                <span class="social-name">${social.platform}</span>
            </a>
        `).join('');

        return `
            <div class="pixel-text-box">
                <h2>🌐 CONNECT WITH ME</h2>
                <p>Follow for updates, new releases, and behind-the-scenes content:</p>
                
                <div class="social-grid">
                    ${socialGrid}
                </div>
                
                <div class="pixel-divider"></div>
                
                <div class="social-notice pixel-border">
                    <h4>💬 STAY CONNECTED</h4>
                    <p>Join the community and be the first to know about new releases and events!</p>
                </div>
            </div>
        `;
    }
}

app.registerModule(SocialModule.config.name, SocialModule);