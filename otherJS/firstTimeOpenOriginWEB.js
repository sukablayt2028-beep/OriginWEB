// Setup screen for first-time OriginWEB users
// This creates an in-OS setup experience

const setupScreenHTML = `
<div id="setupOSScreen" class="setupOSScreen">
    <div class="setupOSContainer">
        <div class="setupOSHeader">
            <div class="setupOSLogo">OriginOS</div>
            <h1>Welcome to OriginWEB</h1>
            <p>Let's set up your device</p>
        </div>

        <div class="setupOSContent">
            <!-- Step 1: Welcome -->
            <div class="setupOSStep active" data-step="1">
                <div class="stepIcon">👋</div>
                <h2>Welcome!</h2>
                <p>This is your first time launching OriginWEB. Let's customize your device to make it perfect for you.</p>
                <button class="setupOSBtn primary" onclick="window.osSetupNext()">Get Started</button>
            </div>

            <!-- Step 2: Device Name -->
            <div class="setupOSStep" data-step="2">
                <div class="stepIcon">📱</div>
                <h2>Name Your Device</h2>
                <p>Give your device a unique name</p>
                <input type="text" class="setupOSInput" id="osDeviceNameInput" placeholder="My OriginOS Phone" maxlength="30" />
                <div class="setupOSButtonGroup">
                    <button class="setupOSBtn secondary" onclick="window.osSetupPrev()">Back</button>
                    <button class="setupOSBtn primary" onclick="window.osSetupNext()">Next</button>
                </div>
            </div>

            <!-- Step 3: Display Settings -->
            <div class="setupOSStep" data-step="3">
                <div class="stepIcon">⚙️</div>
                <h2>Display & Effects</h2>
                <p>Choose your visual preferences</p>
                
                <div class="setupOSToggleGroup">
                    <div class="setupOSToggleItem">
                        <div class="toggleLabel">
                            <span class="toggleName">Dark Mode</span>
                            <span class="toggleDesc">Easier on the eyes</span>
                        </div>
                        <div class="osToggleBtnContainer" onclick="window.osSetupToggle(this)">
                            <input type="checkbox" id="osToggleDarkMode" />
                            <div class="osToggleBg"></div>
                        </div>
                    </div>

                    <div class="setupOSToggleItem">
                        <div class="toggleLabel">
                            <span class="toggleName">Blur Effects</span>
                            <span class="toggleDesc">Glass morphism UI</span>
                        </div>
                        <div class="osToggleBtnContainer" onclick="window.osSetupToggle(this)">
                            <input type="checkbox" id="osToggleBlur" checked />
                            <div class="osToggleBg"></div>
                        </div>
                    </div>

                    <div class="setupOSToggleItem">
                        <div class="toggleLabel">
                            <span class="toggleName">Animations</span>
                            <span class="toggleDesc">Smooth transitions</span>
                        </div>
                        <div class="osToggleBtnContainer" onclick="window.osSetupToggle(this)">
                            <input type="checkbox" id="osToggleAnimations" checked />
                            <div class="osToggleBg"></div>
                        </div>
                    </div>
                </div>

                <div class="setupOSButtonGroup">
                    <button class="setupOSBtn secondary" onclick="window.osSetupPrev()">Back</button>
                    <button class="setupOSBtn primary" onclick="window.osSetupNext()">Next</button>
                </div>
            </div>

            <!-- Step 4: Unlock Animation -->
            <div class="setupOSStep" data-step="4">
                <div class="stepIcon">🔓</div>
                <h2>Choose Lock Animation</h2>
                <p>Select your favorite unlock style</p>
                
                <div class="setupOSAnimGrid">
                    <button class="setupOSAnimOption active" data-anim="OriginOS" onclick="window.osSelectAnim(this)">
                        <div class="animPreview">🌊</div>
                        <span>OriginOS</span>
                    </button>
                    <button class="setupOSAnimOption" data-anim="ColorOS" onclick="window.osSelectAnim(this)">
                        <div class="animPreview">🎨</div>
                        <span>ColorOS</span>
                    </button>
                    <button class="setupOSAnimOption" data-anim="HyperOS" onclick="window.osSelectAnim(this)">
                        <div class="animPreview">✨</div>
                        <span>HyperOS</span>
                    </button>
                    <button class="setupOSAnimOption" data-anim="HarmonyOS" onclick="window.osSelectAnim(this)">
                        <div class="animPreview">🌟</div>
                        <span>HarmonyOS</span>
                    </button>
                </div>

                <div class="setupOSButtonGroup">
                    <button class="setupOSBtn secondary" onclick="window.osSetupPrev()">Back</button>
                    <button class="setupOSBtn primary" onclick="window.osSetupNext()">Next</button>
                </div>
            </div>

            <!-- Step 5: Complete -->
            <div class="setupOSStep" data-step="5">
                <div class="stepIcon completeIcon">✓</div>
                <h2>All Set!</h2>
                <p>Your OriginWEB device is ready</p>
                
                <div class="setupOSSummary">
                    <div class="summaryItem">
                        <span class="summaryLabel">Device Name</span>
                        <span class="summaryValue" id="summaryDeviceName">My OriginOS Phone</span>
                    </div>
                    <div class="summaryItem">
                        <span class="summaryLabel">Lock Animation</span>
                        <span class="summaryValue" id="summaryAnimation">OriginOS</span>
                    </div>
                </div>

                <button class="setupOSBtn primary full" onclick="window.osSetupComplete()">Start Using OriginWEB</button>
            </div>
        </div>

        <div class="setupOSProgress">
            <div class="progressDots">
                <span class="dot active" data-step="1"></span>
                <span class="dot" data-step="2"></span>
                <span class="dot" data-step="3"></span>
                <span class="dot" data-step="4"></span>
                <span class="dot" data-step="5"></span>
            </div>
        </div>
    </div>
</div>
`;

// Add CSS styles
const setupStyleSheet = document.createElement('style');
setupStyleSheet.textContent = `
.setupOSScreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeInSetup 0.4s ease-out;
}

@keyframes fadeInSetup {
    from { opacity: 0; }
    to { opacity: 1; }
}

.setupOSContainer {
    width: 95%;
    max-width: 420px;
    background: rgba(26, 26, 26, 0.95);
    border-radius: 25px;
    padding: 35px 25px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
}

.setupOSHeader {
    text-align: center;
    margin-bottom: 30px;
}

.setupOSLogo {
    font-size: 24px;
    font-weight: 800;
    background: linear-gradient(135deg, #007aff 0%, #34c759 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 12px;
    letter-spacing: 1px;
}

.setupOSHeader h1 {
    font-size: 26px;
    color: #ffffff;
    margin-bottom: 6px;
    font-weight: 700;
}

.setupOSHeader p {
    font-size: 13px;
    color: #888888;
}

.setupOSContent {
    min-height: 240px;
    margin-bottom: 25px;
}

.setupOSStep {
    display: none;
    animation: fadeInStep 0.3s ease-out;
}

.setupOSStep.active {
    display: block;
}

@keyframes fadeInStep {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.stepIcon {
    font-size: 48px;
    text-align: center;
    margin-bottom: 16px;
}

.stepIcon.completeIcon {
    font-size: 56px;
    animation: bounceCheck 0.6s ease-out;
}

@keyframes bounceCheck {
    0% { transform: scale(0) rotate(-45deg); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1) rotate(0); }
}

.setupOSStep h2 {
    font-size: 20px;
    color: #ffffff;
    text-align: center;
    margin-bottom: 8px;
    font-weight: 600;
}

.setupOSStep p {
    font-size: 13px;
    color: #888888;
    text-align: center;
    margin-bottom: 22px;
}

.setupOSInput {
    width: 100%;
    padding: 12px 16px;
    margin-bottom: 20px;
    border: 1.5px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
    font-size: 15px;
    font-family: inherit;
    transition: all 0.3s ease;
}

.setupOSInput:focus {
    outline: none;
    border-color: #007aff;
    background: rgba(0, 122, 255, 0.1);
}

.setupOSInput::placeholder {
    color: #555555;
}

.setupOSToggleGroup {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 22px;
}

.setupOSToggleItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    transition: all 0.3s ease;
}

.setupOSToggleItem:hover {
    background: rgba(255, 255, 255, 0.08);
}

.toggleLabel {
    display: flex;
    flex-direction: column;
}

.toggleName {
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
}

.toggleDesc {
    font-size: 12px;
    color: #888888;
    margin-top: 2px;
}

.osToggleBtnContainer {
    position: relative;
    width: 50px;
    height: 28px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.osToggleBtnContainer input {
    display: none;
}

.osToggleBg {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 24px;
    height: 24px;
    background: #555555;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.osToggleBtnContainer.active .osToggleBg {
    left: calc(100% - 26px);
    background: #34c759;
}

.setupOSAnimGrid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 22px;
}

.setupOSAnimOption {
    padding: 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-radius: 14px;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.setupOSAnimOption:hover {
    border-color: #007aff;
    background: rgba(0, 122, 255, 0.1);
}

.setupOSAnimOption.active {
    background: linear-gradient(135deg, #007aff 0%, #0056d6 100%);
    border-color: #007aff;
    box-shadow: 0 8px 20px rgba(0, 122, 255, 0.3);
}

.animPreview {
    font-size: 32px;
}

.setupOSAnimOption span {
    font-size: 12px;
    font-weight: 500;
}

.setupOSSummary {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    padding: 16px;
    margin-bottom: 22px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.summaryItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.summaryLabel {
    font-size: 13px;
    color: #888888;
}

.summaryValue {
    font-size: 14px;
    font-weight: 500;
    color: #007aff;
}

.setupOSButtonGroup {
    display: flex;
    gap: 10px;
    margin-bottom: 0;
}

.setupOSBtn {
    flex: 1;
    padding: 12px 20px;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-family: inherit;
}

.setupOSBtn.primary {
    background: linear-gradient(135deg, #007aff 0%, #0056d6 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
}

.setupOSBtn.primary:active {
    transform: scale(0.98);
}

.setupOSBtn.primary.full {
    width: 100%;
}

.setupOSBtn.secondary {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.15);
}

.setupOSBtn.secondary:hover {
    background: rgba(255, 255, 255, 0.12);
}

.setupOSProgress {
    display: flex;
    justify-content: center;
}

.progressDots {
    display: flex;
    gap: 8px;
}

.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: all 0.3s ease;
}

.dot.active {
    background: #007aff;
    width: 20px;
    border-radius: 3px;
}

@media (max-width: 480px) {
    .setupOSContainer {
        width: 100%;
        max-width: 100%;
        border-radius: 0;
        padding: 30px 20px;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .setupOSAnimGrid {
        grid-template-columns: 1fr;
    }
}
`;

document.head.appendChild(setupStyleSheet);

// Setup state
let osSetupStep = 1;
let osSelectedAnim = 'OriginOS';

// Setup functions
window.osSetupNext = function() {
    if (osSetupStep === 2) {
        const deviceName = document.getElementById('osDeviceNameInput').value.trim();
        if (!deviceName) {
            alert('Please enter a device name');
            return;
        }
    }
    
    if (osSetupStep < 5) {
        osSetupStep++;
        updateOSSetupStep();
    }
};

window.osSetupPrev = function() {
    if (osSetupStep > 1) {
        osSetupStep--;
        updateOSSetupStep();
    }
};

window.osSelectAnim = function(element) {
    document.querySelectorAll('.setupOSAnimOption').forEach(el => {
        el.classList.remove('active');
    });
    element.classList.add('active');
    osSelectedAnim = element.getAttribute('data-anim');
};

window.osSetupToggle = function(element) {
    element.classList.toggle('active');
    const checkbox = element.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
};

function updateOSSetupStep() {
    document.querySelectorAll('.setupOSStep').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelector(`[data-step="${osSetupStep}"]`).classList.add('active');
    
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.remove('active');
    });
    document.querySelector(`.dot[data-step="${osSetupStep}"]`).classList.add('active');
    
    if (osSetupStep === 5) {
        document.getElementById('summaryDeviceName').textContent = 
            document.getElementById('osDeviceNameInput').value || 'My OriginOS Phone';
        document.getElementById('summaryAnimation').textContent = osSelectedAnim;
    }
}

window.osSetupComplete = function() {
    const deviceName = document.getElementById('osDeviceNameInput').value || 'My OriginOS Phone';
    const enableDarkMode = document.getElementById('osToggleDarkMode').checked;
    const enableBlur = document.getElementById('osToggleBlur').checked;
    const enableAnimations = document.getElementById('osToggleAnimations').checked;
    
    // Save preferences
    localStorage.setItem('setupCompleted', 'true');
    localStorage.setItem('phoneName', deviceName);
    localStorage.setItem('unlockAnimation', osSelectedAnim);
    
    if (enableDarkMode) {
        localStorage.setItem('darkMode', '1');
        phone.classList.add('darkMode');
        document.getElementById('toggleDarkMode').classList.add('active');
    }
    
    if (!enableBlur) {
        localStorage.setItem('turnBlurOff', '1');
        document.getElementById('blurAllApp').classList.add('displayN');
    }
    
    // Close setup screen
    const setupScreen = document.getElementById('setupOSScreen');
    setupScreen.style.animation = 'fadeOutSetup 0.4s ease-out';
    
    setTimeout(() => {
        setupScreen.remove();
    }, 400);
};

// Add fadeout animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
@keyframes fadeOutSetup {
    from { opacity: 1; }
    to { opacity: 0; }
}
`;
document.head.appendChild(fadeOutStyle);

// Initialize setup screen and add to phone
const tempDiv = document.createElement('div');
tempDiv.innerHTML = setupScreenHTML;
phone.insertBefore(tempDiv.firstElementChild, phone.firstChild);

console.log('OriginWEB Setup Screen initialized');
