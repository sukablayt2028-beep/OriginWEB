let currentStep = 1;
const totalSteps = 5;
let selectedTheme = 'OriginOS';

function nextStep() {
  if (currentStep < totalSteps) {
    // Validate current step
    if (currentStep === 2) {
      const deviceName = document.getElementById('deviceNameInput').value.trim();
      if (!deviceName) {
        alert('Please enter a device name');
        return;
      }
    }
    
    currentStep++;
    updateStep();
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateStep();
  }
}

function updateStep() {
  // Hide all steps
  document.querySelectorAll('.setupStep').forEach(step => {
    step.classList.remove('active');
  });
  
  // Show current step
  document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
  
  // Update progress bar
  const progress = (currentStep / totalSteps) * 100;
  document.querySelector('.progressBar::after').style.width = progress + '%';
  document.getElementById('currentStep').textContent = currentStep;
  
  // Update summary if on final step
  if (currentStep === 5) {
    document.getElementById('summaryDeviceName').textContent = 
      document.getElementById('deviceNameInput').value || 'My OriginOS Device';
    document.getElementById('summaryTheme').textContent = selectedTheme;
  }
}

function selectTheme(element) {
  document.querySelectorAll('.themeOption').forEach(option => {
    option.classList.remove('active');
  });
  element.classList.add('active');
  selectedTheme = element.getAttribute('data-theme');
}

function completeSetup() {
  const deviceName = document.getElementById('deviceNameInput').value || 'My OriginOS Device';
  const enableAnimations = document.getElementById('enableAnimations').checked;
  const enableBlur = document.getElementById('enableBlur').checked;
  const enableDockBar = document.getElementById('enableDockBar').checked;
  
  // Save settings to localStorage
  localStorage.setItem('setupCompleted', 'true');
  localStorage.setItem('deviceName', deviceName);
  localStorage.setItem('enableAnimations', enableAnimations);
  localStorage.setItem('enableBlur', enableBlur);
  localStorage.setItem('enableDockBar', enableDockBar);
  localStorage.setItem('selectedTheme', selectedTheme);
  localStorage.setItem('phoneName', deviceName);
  
  // Apply theme selection to existing settings
  if (typeof window !== 'undefined' && window.location) {
    // Redirect to main application
    window.location.href = '/OriginWEB/index.html';
  }
}

// Initialize progress bar width with CSS
window.addEventListener('load', () => {
  const style = document.createElement('style');
  style.textContent = `.progressBar::after { width: 20%; }`;
  document.head.appendChild(style);
  
  // Check if setup was already completed
  if (localStorage.getItem('setupCompleted') === 'true') {
    // Load saved settings
    const deviceName = localStorage.getItem('deviceName');
    if (deviceName) {
      document.getElementById('deviceNameInput').value = deviceName;
    }
    const enableAnimations = localStorage.getItem('enableAnimations') === 'true';
    document.getElementById('enableAnimations').checked = enableAnimations;
    const enableBlur = localStorage.getItem('enableBlur') === 'true';
    document.getElementById('enableBlur').checked = enableBlur;
    const enableDockBar = localStorage.getItem('enableDockBar') === 'true';
    document.getElementById('enableDockBar').checked = enableDockBar;
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'Enter') {
    nextStep();
  } else if (e.key === 'ArrowLeft') {
    prevStep();
  }
});