class SupportModule {
    static config = {
        name: 'support',
        displayName: 'SUPPORT',
        icon: '💰'
    };
    
    static wallets = {
        "btc_bitcoin": {
            address: "1NpzfG2yXgYFXDq2eXVFbW4NmTdc18YWr6",
            name: "BTC (Bitcoin)",
            emoji: "₿",
            network: "Bitcoin Mainnet",
            qrFile: "./assets/qr/bitcoin-qr.jpg"
        },
        "eth_ethereum": {
            address: "0xdca3a4d37e506f170cf983b821cfb8e408a2a5d9",
            name: "ETH (Ethereum)",
            emoji: "🔷", 
            network: "Ethereum ERC20",
            qrFile: "./assets/qr/ethereum-qr.jpg"
        },
        "bnb_smartchain": {
            address: "0xdca3a4d37e506f170cf983b821cfb8e408a2a5d9",
            name: "BNB (BSC)",
            emoji: "💫",
            network: "BNB Smart Chain",
            qrFile: "./assets/qr/bsc-qr.jpg"
        },
        "sol_solana": {
            address: "5riBQVYXr2c4WkiDFomHxaFk4Ah6XjBtZLGavuqLhXai",
            name: "SOL (Solana)",
            emoji: "⚡",
            network: "Solana",
            qrFile: "./assets/qr/solana-qr.jpg"
        },
        "usdt_tron": {
            address: "TQBZbVD2PraUxN4kBJX8V2wShmLGciurrU",
            name: "USDT (TRON)",
            emoji: "💵",
            network: "TRON TRC20",
            qrFile: "./assets/qr/tron-usdt-qr.jpg"
        },
        "ton_ton": {
            address: "EQAHc8rfWcV2vk1wbNcTaJXQnvNFx5rae3KTiUyteSVO-iNx",
            name: "TON (TON)", 
            emoji: "💎",
            network: "The Open Network",
            qrFile: "./assets/qr/ton-qr.jpg"
        }
    };
    
    static currentWallet = null;
    
    static render() {
        const cryptoItems = Object.entries(this.wallets).map(([key, wallet]) => `
            <div class="crypto-item pixel-border" data-wallet-key="${key}">
                <span class="crypto-emoji">${wallet.emoji}</span>
                <span class="crypto-name">${wallet.name}</span>
                <span class="crypto-network">${wallet.network}</span>
            </div>
        `).join('');

        return `
            <div class="pixel-text-box">
                <h2>💰 SUPPORT THE REVOLUTION IN SOUND</h2>
                <p>Your support fuels the creative engine and helps bring innovative music projects to life.</p>
                
                <div class="support-intro pixel-border">
                    <h4>🎵 WHY SUPPORT DJ PERCH?</h4>
                    <p>• Fund music equipment and studio time</p>
                    <p>• Create free content for everyone</p>
                    <p>• Experiment with sound and our surroundings </p>
                    <p>• Support independent art outside mainstream</p>
                </div>
                                
                <h3>🌐 CHOOSE CRYPTOCURRENCY</h3>
                <p>Select a cryptocurrency to see wallet address and QR code:</p>
                
                <div class="crypto-grid">
                    ${cryptoItems}
                </div>
                
                <div class="pixel-divider"></div>
                
                <div class="wallet-display-container">
                    <div id="wallet-display" class="wallet-display pixel-border hidden">
                        <div class="wallet-header">
                            <h3 id="wallet-title">SELECT A WALLET</h3>
                            <button class="close-wallet-btn" id="close-wallet">✕</button>
                        </div>
                        <div class="wallet-content">
                            <div class="wallet-info">
                                <div id="wallet-emoji" class="wallet-emoji-large">💰</div>
                                <div class="wallet-details">
                                    <h4 id="wallet-name">-</h4>
                                    <p id="wallet-network">-</p>
                                </div>
                            </div>
                            <div class="wallet-address-section">
                                <h4>WALLET ADDRESS:</h4>
                                <div id="wallet-address" class="wallet-address">
                                    Select a cryptocurrency above
                                </div>
                                <button id="copy-btn" class="pixel-btn">📋 COPY ADDRESS</button>
                            </div>
                            <div class="qr-section">
                                <h4>QR CODE:</h4>
                                <div id="qr-code" class="qr-code">
                                    <div class="qr-placeholder">
                                        <div class="qr-emoji">📱</div>
                                        <p>QR code will appear here</p>
                                    </div>
                                </div>
                                <p class="qr-help">Scan with your wallet app</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="pixel-divider"></div>
                
                <div class="warning-box pixel-border">
                    <h4>⚠️ IMPORTANT SAFETY NOTES</h4>
                    <p>• Always send the correct cryptocurrency to the matching network</p>
                    <p>• Double-check addresses before sending</p>
                    <p>• Test with small amounts first</p>
                    <p>• Sending to wrong network may result in permanent loss</p>
                </div>
                
                <div class="support-footer">
                    <p>Thank you for supporting independent music and art! 🙏</p>
                    <p>Every contribution helps create more amazing content.</p>
                </div>
            </div>
        `;
    }
    
    static init() {
        this.setupEventListeners();
    }
    
    static setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.crypto-item')) {
                const cryptoItem = e.target.closest('.crypto-item');
                const walletKey = cryptoItem.getAttribute('data-wallet-key');
                this.showWallet(walletKey);
            }
            
            if (e.target.id === 'copy-btn') {
                this.copyAddress();
            }
            
            if (e.target.id === 'close-wallet') {
                this.hideWallet();
            }
        });
    }
    
    static showWallet(walletKey) {
        const wallet = this.wallets[walletKey];
        if (!wallet) return;
        
        this.currentWallet = walletKey;
        
        document.getElementById('wallet-title').textContent = `${wallet.emoji} ${wallet.name}`;
        document.getElementById('wallet-name').textContent = wallet.name;
        document.getElementById('wallet-network').textContent = wallet.network;
        document.getElementById('wallet-emoji').textContent = wallet.emoji;
        document.getElementById('wallet-address').innerHTML = `<code>${wallet.address}</code>`;
        
        this.generateQRCode(wallet);
        document.getElementById('wallet-display').classList.remove('hidden');
    }
    
    static hideWallet() {
        document.getElementById('wallet-display').classList.add('hidden');
        this.currentWallet = null;
    }
    
    static generateQRCode(wallet) {
        const qrContainer = document.getElementById('qr-code');
        
        if (wallet.qrFile) {
            // Use local QR file if available
            qrContainer.innerHTML = `
                <img src="${wallet.qrFile}" alt="QR Code for ${wallet.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
                <div class="qr-fallback" style="display: none;">
                    <div class="qr-emoji">📱</div>
                    <p>QR file not found</p>
                    <p class="qr-help">Using address: ${wallet.address.substring(0, 20)}...</p>
                </div>
            `;
        } else {
            // Fallback to generated QR code
            const qrUrl = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(wallet.address)}`;
            qrContainer.innerHTML = `<img src="${qrUrl}" alt="QR Code">`;
        }
    }
    
    static copyAddress() {
        if (!this.currentWallet) return;
        
        const wallet = this.wallets[this.currentWallet];
        const address = wallet.address;
        
        navigator.clipboard.writeText(address).then(() => {
            const btn = document.getElementById('copy-btn');
            btn.textContent = '✅ COPIED!';
            setTimeout(() => {
                btn.textContent = '📋 COPY ADDRESS';
            }, 2000);
        });
    }
}

app.registerModule(SupportModule.config.name, SupportModule);