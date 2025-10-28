// Game-like interactive functionality for the portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize loader (runs first)
    initializeLoader();
    
    // Initialize theme toggle
    initializeThemeToggle();
    
    // Initialize the game world
    initializeGameWorld();
    
    // Add click handlers for skill areas
    setupSkillAreaInteractions();
    
    // Add floating particle animations
    animateParticles();
    
    // Add sound effects (visual feedback)
    addVisualFeedback();
});

// Loader functionality
function initializeLoader() {
    const loader = document.getElementById('loader');
    
    if (loader) {
        // Hide loader after 3 seconds
        setTimeout(() => {
            loader.classList.add('hidden');
            
            // Remove loader from DOM after fade out animation
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 3000);
        
        // Also hide loader on any click (for better UX)
        loader.addEventListener('click', () => {
            loader.classList.add('hidden');
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        });
    }
}

// Night mode toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        root.classList.add('dark-theme');
    }
    
    // Set initial button text based on current theme
    const themeText = themeToggle.querySelector('.theme-text');
    if (themeText) {
        const isDarkMode = root.classList.contains('dark-theme');
        themeText.textContent = isDarkMode ? '☀️ Day Mode' : '🌙 Night Mode';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            root.classList.toggle('dark-theme');
            
            // Add click animation
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
            
            // Save theme preference
            const isDarkMode = root.classList.contains('dark-theme');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            
            // Update button text based on current theme
            const themeText = themeToggle.querySelector('.theme-text');
            if (themeText) {
                themeText.textContent = isDarkMode ? '☀️ Day Mode' : '🌙 Night Mode';
            }
            
            // Add theme change animation to body
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
            
            // Show theme change notification
            const themeMessage = isDarkMode ? '🌙 Night mode activated' : '☀️ Day mode activated';
            showThemeNotification(themeMessage);
        });
    }
}

// Theme change notification
function showThemeNotification(message) {
    // Remove existing theme notifications
    const existingNotification = document.querySelector('.theme-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.classList.add('theme-notification');
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100%);
        background: linear-gradient(45deg, #FFB6C1, #DDA0DD);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-family: 'Press Start 2P', cursive;
        font-size: 0.7rem;
        z-index: 10000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease;
        pointer-events: none;
        border: 2px solid rgba(255, 255, 255, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(-100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

function initializeGameWorld() {
    // Add a welcome message AFTER the loader finishes (3.5 seconds)
    setTimeout(() => {
        showWelcomeMessage();
    }, 3500);
    
    // Animate the energy bar on load (also after loader)
    setTimeout(() => {
        animateEnergyBar();
    }, 3000);
}

function setupSkillAreaInteractions() {
    const skillAreas = document.querySelectorAll('.skill-area');
    
    skillAreas.forEach(area => {
        area.addEventListener('click', function() {
            toggleSkillDetails(this);
            addClickEffect(this);
            updateEnergyBar();
        });
        
        // Add hover sound effect (visual)
        area.addEventListener('mouseenter', function() {
            addHoverEffect(this);
        });
    });
}

function toggleSkillDetails(skillArea) {
    const details = skillArea.querySelector('.skill-details');
    const isHidden = details.classList.contains('hidden');
    
    // Close all other skill details first
    document.querySelectorAll('.skill-details').forEach(detail => {
        detail.classList.add('hidden');
    });
    
    // Toggle current skill details
    if (isHidden) {
        details.classList.remove('hidden');
        details.style.animation = 'slideIn 0.5s ease-out';
        
        // Add exploration points
        addExplorationPoints(skillArea);
    }
}

function addClickEffect(element) {
    // Create a ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function addHoverEffect(element) {
    // Add a subtle glow effect
    element.style.boxShadow = '0 0 30px rgba(255, 182, 193, 0.5)';
    
    setTimeout(() => {
        element.style.boxShadow = '';
    }, 300);
}

function animateEnergyBar() {
    const energyFill = document.querySelector('.energy-fill');
    if (energyFill) {
        energyFill.style.width = '0%';
        setTimeout(() => {
            energyFill.style.transition = 'width 2s ease-out';
            energyFill.style.width = '100%';
        }, 500);
    }
}

function updateEnergyBar() {
    const energyFill = document.querySelector('.energy-fill');
    if (energyFill) {
        // Temporarily boost energy when exploring
        energyFill.style.background = 'linear-gradient(90deg, #FFD700, #FFA500, #FF6347)';
        energyFill.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.8)';
        
        setTimeout(() => {
            energyFill.style.background = 'linear-gradient(90deg, #FFB6C1, #DDA0DD, #B0E0E6)';
            energyFill.style.boxShadow = '';
        }, 1000);
    }
}

function addExplorationPoints(skillArea) {
    // Create floating "+XP" text
    const xpText = document.createElement('div');
    xpText.textContent = '+50 XP';
    xpText.style.position = 'absolute';
    xpText.style.color = '#FFD700';
    xpText.style.fontWeight = 'bold';
    xpText.style.fontSize = '1.2rem';
    xpText.style.pointerEvents = 'none';
    xpText.style.zIndex = '1001';
    xpText.style.animation = 'floatUp 2s ease-out forwards';
    xpText.style.right = '20px';
    xpText.style.top = '20px';
    
    skillArea.style.position = 'relative';
    skillArea.appendChild(xpText);
    
    setTimeout(() => {
        xpText.remove();
    }, 2000);
}

function animateParticles() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        // Randomize particle positions and timing
        const randomDelay = Math.random() * 8;
        const randomLeft = Math.random() * 90 + 5; // 5% to 95%
        
        particle.style.left = randomLeft + '%';
        particle.style.animationDelay = randomDelay + 's';
        
        // Add random rotation
        particle.style.transform = `rotate(${Math.random() * 360}deg)`;
    });
}

function showWelcomeMessage() {
    // Create a temporary welcome overlay
    const welcomeOverlay = document.createElement('div');
    welcomeOverlay.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 20px;
            border: 3px solid #DDA0DD;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: welcomeFadeIn 0.5s ease-out;
        ">
            <h2 style="color: #4B0082; margin-bottom: 15px; font-family: 'Press Start 2P', cursive; font-size: 1.2rem;">
                🎮 Welcome to Developer's Valley! 🎮
            </h2>
            <p style="color: #663399; margin-bottom: 20px;">
                Click on the different areas to explore my skills and projects!
            </p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: linear-gradient(45deg, #FFB6C1, #DDA0DD);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 15px;
                cursor: pointer;
                font-weight: bold;
            ">
                Start Exploring! ✨
            </button>
        </div>
    `;
    
    document.body.appendChild(welcomeOverlay);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (welcomeOverlay.parentElement) {
            welcomeOverlay.remove();
        }
    }, 5000);
}

function addVisualFeedback() {
    // Add contact button interactions
    const contactBtns = document.querySelectorAll('.contact-btn');
    
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a "message sent" effect
            const feedback = document.createElement('div');
            feedback.textContent = '📧 Message sent to developer!';
            feedback.style.position = 'fixed';
            feedback.style.top = '50%';
            feedback.style.left = '50%';
            feedback.style.transform = 'translate(-50%, -50%)';
            feedback.style.background = 'rgba(34, 139, 34, 0.9)';
            feedback.style.color = 'white';
            feedback.style.padding = '15px 25px';
            feedback.style.borderRadius = '15px';
            feedback.style.zIndex = '10001';
            feedback.style.animation = 'popIn 0.5s ease-out';
            
            document.body.appendChild(feedback);
            
            setTimeout(() => {
                feedback.remove();
            }, 2000);
        });
    });
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes floatUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-50px);
        }
    }
    
    @keyframes welcomeFadeIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes popIn {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        50% {
            transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;

document.head.appendChild(style);

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('skill-area')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

// Add tab navigation support
const skillAreas = document.querySelectorAll('.skill-area');
skillAreas.forEach(area => {
    area.setAttribute('tabindex', '0');
    area.setAttribute('role', 'button');
    area.setAttribute('aria-label', `Explore ${area.querySelector('h3').textContent}`);
});
