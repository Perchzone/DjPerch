class AboutModule {
    static config = {
        name: 'about',
        displayName: 'ABOUT',
        icon: '💎',
        default: true
    };
    
    static render() {
        return `
            <div class="pixel-text-box">
                <h2>💎 FUEL THE REVOLUTIONARY EXPERIENCE</h2>
                <p>It all began with a passion for DJing, gradually accumulating new skills, knowledge, and life experiences along the way.</p>
                
<p> DJ Perch has been digging in the crates and spinning vinyl since way back in 2005. His weapon of choice? A killer mix of funk, disco, soul, hip-hop, and trippy experimental electronics.<p/>
<p>In 2022, he caught a serious analog synth fever. Now, he's a complete Terminator on the decks, mixing raw turntablism techniques, with deep, modular soundscapes. Don't sleep on this.<p/>

                <p>Today, my work represents the culmination of my journey—everything I've absorbed, processed, and mixed with my own hands and mind.</p>
                
                <p>Constantly revolutionizing approaches and perspectives through sound and performance.</p>
                
                <div class="pixel-divider"></div>
                
                
                
                
                
                <div class="about-features">
                    <div class="feature-item pixel-border">
                        <div class="photo-container">
                            <img src="./assets/Perch1.jpg" class="feature-photo">
                            <div class="photo-overlay">2010</div>
                        </div>
                        
                    </div>
                    <div class="feature-item pixel-border">
                        <div class="photo-container">
                            <img src="./assets/Perch2.jpg" class="feature-photo">

                            <div class="photo-overlay">2011</div>
                        </div>
                        
                    </div>
                    <div class="feature-item pixel-border">
                        <div class="photo-container">
                            <img src="./assets/Perch3.jpg"   class="feature-photo">
                            <div class="photo-overlay">2024</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        `;
    }
}

app.registerModule(AboutModule.config.name, AboutModule);