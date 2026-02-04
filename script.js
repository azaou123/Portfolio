// script.js - Fixed Version
let easterEggCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 BadrOS v2.5 Initializing...');
    startBootSequence();
    initEventListeners();
});

function initEventListeners() {
    // Module cards click events
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            const module = this.getAttribute('data-module');
            if (module) {
                openModule(module);
            }
        });
    });

    // Close module buttons
    const closeButtons = document.querySelectorAll('.close-module');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeAllModules();
        });
    });

    // Joke cards
    const jokeCards = document.querySelectorAll('.joke-card');
    jokeCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('joke-revealed');
        });
    });

    // Easter egg button
    const eggButton = document.querySelector('.egg-trigger');
    if (eggButton) {
        eggButton.addEventListener('click', triggerEasterEgg);
    }

    // Submit button
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitContactForm);
    }

    // Command line
    const commandInput = document.getElementById('command-input');
    if (commandInput) {
        commandInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim().toLowerCase();
                this.value = '';
                if (command) {
                    processCommand(command);
                }
            }
        });
    }
}

function startBootSequence() {
    const bootScreen = document.getElementById('boot-screen');
    const terminalBody = document.querySelector('.terminal-body');
    
    if (!bootScreen || !terminalBody) {
        console.error('❌ Boot screen elements not found');
        showDashboard();
        return;
    }
    
    const bootMessages = [
        "> Initializing BadrOS v2.5...",
        "> Loading core modules...",
        "> Checking system integrity...",
        "> Loading modules: Study | Work | Health | Humor",
        "> System online.",
        "> Welcome to Badr's Digital Universe."
    ];
    
    let messageIndex = 0;
    
    function displayNextMessage() {
        if (messageIndex < bootMessages.length) {
            const message = bootMessages[messageIndex];
            const messageElement = document.createElement('div');
            messageElement.className = 'terminal-line';
            messageElement.innerHTML = `<span class="terminal-prompt">${message}</span>`;
            
            terminalBody.appendChild(messageElement);
            terminalBody.scrollTop = terminalBody.scrollHeight;
            
            messageIndex++;
            setTimeout(displayNextMessage, 800);
        } else {
            const cursorElement = document.createElement('div');
            cursorElement.className = 'terminal-line';
            cursorElement.innerHTML = '<span class="terminal-prompt">></span><span class="typing-cursor"></span>';
            terminalBody.appendChild(cursorElement);
            terminalBody.scrollTop = terminalBody.scrollHeight;
            
            setTimeout(showDashboard, 2000);
        }
    }
    
    displayNextMessage();
}

function showDashboard() {
    const bootScreen = document.getElementById('boot-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    
    if (!bootScreen || !dashboardScreen) {
        console.error('❌ Screens not found');
        return;
    }
    
    bootScreen.style.opacity = '0';
    bootScreen.style.transition = 'opacity 1s ease';
    
    setTimeout(function() {
        bootScreen.classList.remove('active');
        dashboardScreen.classList.add('active');
        
        const commandInput = document.getElementById('command-input');
        if (commandInput) {
            setTimeout(() => commandInput.focus(), 100);
        }
        
        console.log('✅ Dashboard loaded successfully');
    }, 1000);
}

function openModule(moduleId) {
    console.log(`📂 Opening module: ${moduleId}`);
    
    closeAllModules();
    
    const moduleScreen = document.getElementById(`${moduleId}-module`);
    const dashboardScreen = document.getElementById('dashboard-screen');
    
    if (moduleScreen && dashboardScreen) {
        dashboardScreen.classList.remove('active');
        moduleScreen.classList.add('active');
        
        // Scroll to top of module
        moduleScreen.scrollTop = 0;
        
        const moduleTitle = moduleScreen.querySelector('.module-title-large');
        if (moduleTitle) {
            moduleTitle.classList.add('glitch-text');
            setTimeout(() => {
                moduleTitle.classList.remove('glitch-text');
            }, 500);
        }
        
        switch(moduleId) {
            case 'about':
                initAboutModule();
                break;
            case 'skills':
                initSkillsModule();
                break;
        }
        
        console.log(`✅ Module ${moduleId} opened successfully`);
    } else {
        console.error(`❌ Module screen not found: ${moduleId}`);
    }
}

function closeAllModules() {
    console.log('📂 Closing all modules');
    
    const moduleScreens = document.querySelectorAll('.module-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    
    moduleScreens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    if (dashboardScreen) {
        dashboardScreen.classList.add('active');
        dashboardScreen.scrollTop = 0;
    }
}

function initAboutModule() {
    console.log('👤 Initializing About module');
    const fileLines = document.querySelectorAll('#about-module .file-line');
    
    fileLines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.opacity = '1';
        }, 150 * index);
    });
}

function initSkillsModule() {
    console.log('🎯 Initializing Skills module');
    const skillNodes = document.querySelectorAll('.skill-node');
    
    skillNodes.forEach((node, index) => {
        node.style.opacity = '0';
        node.style.transform = 'scale(0.5)';
        setTimeout(() => {
            node.style.transition = 'all 0.5s ease';
            node.style.opacity = '1';
            node.style.transform = 'scale(1)';
        }, 100 * index);
    });
}

(function() {
        emailjs.init("Wt7FLPsGkNDXnhf30"); // ← Replace with your actual public key
    })();

    function submitContactForm() {
        console.log('📨 Submitting contact form...');
        
        const btn = document.querySelector('.submit-btn');
        const btnText = btn.querySelector('.btn-text');
        const btnLoader = btn.querySelector('.btn-loader');
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !message) {
            showFormResponse('Please fill in all required fields.', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormResponse('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        btn.disabled = true;
        
        // Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject || 'No subject',
            message: message,
            to_name: 'Badr',
            reply_to: email,
            date: new Date().toLocaleString()
        };
        
        // Send email using EmailJS
        emailjs.send(
            'service_pabu0ob',      // ← Replace with your EmailJS service ID
            'template_z80aicg',     // ← Replace with your EmailJS template ID
            templateParams
        )
        .then(function(response) {
            console.log('✅ Email sent successfully!', response.status, response.text);
            showFormResponse('Transmission sent successfully! Badr will respond soon.', 'success');
            
            // Reset form
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('subject').value = '';
            document.getElementById('message').value = '';
            
            // Reset button
            setTimeout(() => {
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
                btn.disabled = false;
            }, 1500);
            
        }, function(error) {
            console.error('❌ Email sending failed:', error);
            showFormResponse('Transmission failed. Please try again or contact azaoubadr@gmail.com', 'error');
            
            // Reset button
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
            btn.disabled = false;
        });
    }
    
    function showFormResponse(message, type) {
        const responseDiv = document.getElementById('form-response');
        responseDiv.textContent = message;
        responseDiv.className = 'form-response';
        responseDiv.classList.add(type);
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                responseDiv.classList.remove('show');
            }, 5000);
        }
    }
function showFormResponse(message, type) {
    const responseElement = document.getElementById('form-response');
    if (responseElement) {
        responseElement.textContent = message;
        responseElement.className = `form-response ${type}`;
        
        setTimeout(() => {
            responseElement.textContent = '';
            responseElement.className = '';
        }, 5000);
    }
}

function triggerEasterEgg() {
    easterEggCount++;
    console.log(`🥚 Easter egg click: ${easterEggCount}`);
    
    if (easterEggCount >= 5) {
        console.log('🎉 Easter egg triggered!');
        
        const glitchEffect = document.createElement('div');
        glitchEffect.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #ff00ff, #00ffff);
            opacity: 0.7;
            z-index: 9999;
            pointer-events: none;
            animation: glitch 0.2s infinite;
        `;
        document.body.appendChild(glitchEffect);
        
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            color: #00ff41;
            padding: 2rem;
            border: 2px solid #00ff41;
            border-radius: 8px;
            z-index: 10000;
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            white-space: pre-line;
            max-width: 90%;
            box-shadow: 0 0 30px #00ff41;
            font-family: 'JetBrains Mono', monospace;
        `;
        message.textContent = '🎉 Easter Egg Found! 🎉\n\n"Debugging is like being a detective\nin a crime movie where you are\nalso the murderer."\n\n- Badr, probably';
        document.body.appendChild(message);
        
        easterEggCount = 0;
        
        setTimeout(() => {
            if (glitchEffect.parentNode) {
                document.body.removeChild(glitchEffect);
            }
            if (message.parentNode) {
                document.body.removeChild(message);
            }
        }, 4000);
    }
}

function processCommand(command) {
    console.log(`⌨️ Processing command: ${command}`);
    
    const commands = {
        'about': 'about',
        'projects': 'projects',
        'skills': 'skills',
        'fun': 'funzone',
        'funzone': 'funzone',
        'contact': 'contact',
        'help': 'help',
        'clear': 'clear',
        'exit': 'exit',
        'home': 'exit'
    };
    
    if (commands[command]) {
        switch(command) {
            case 'help':
                showCommandHelp();
                break;
            case 'clear':
                clearCommandHistory();
                break;
            case 'exit':
            case 'home':
                closeAllModules();
                addCommandResponse('Returning to dashboard...');
                break;
            default:
                openModule(commands[command]);
                addCommandResponse(`Opening ${command} module...`);
        }
    } else if (command) {
        addCommandResponse(`Command not found: "${command}". Type "help" for available commands.`);
    }
}

function showCommandHelp() {
    const helpText = `Available commands:
• about     - Open About module
• projects  - Open Projects module  
• skills    - Open Skills module
• fun       - Open Fun Zone module
• contact   - Open Contact module
• help      - Show this help
• clear     - Clear command history
• exit/home - Return to dashboard`;
    
    addCommandResponse(helpText);
}

function clearCommandHistory() {
    const responses = document.querySelectorAll('.command-response');
    responses.forEach(response => {
        response.remove();
    });
    addCommandResponse('Command history cleared.');
}

function addCommandResponse(text) {
    const dashboardScreen = document.getElementById('dashboard-screen');
    const commandLine = document.querySelector('.command-line');
    
    if (dashboardScreen && commandLine) {
        const responseElement = document.createElement('div');
        responseElement.className = 'command-response';
        responseElement.style.cssText = `
            margin-bottom: 1rem;
            color: var(--terminal-green);
            font-family: 'JetBrains Mono', monospace;
            white-space: pre-line;
            padding: 0.5rem;
            background: rgba(0, 0, 0, 0.5);
            border-left: 2px solid var(--terminal-green);
            padding-left: 1rem;
        `;
        responseElement.textContent = text;
        
        const screenContent = dashboardScreen.querySelector('.screen-content');
        if (screenContent) {
            screenContent.insertBefore(responseElement, commandLine);
            
            // Scroll to the response
            responseElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Prevent body scroll when modules are open
function preventBodyScroll() {
    const activeModules = document.querySelectorAll('.module-screen.active');
    if (activeModules.length > 0) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Add scroll prevention observer
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
            preventBodyScroll();
        }
    });
});

// Observe all screens for class changes
document.addEventListener('DOMContentLoaded', function() {
    const screens = document.querySelectorAll('.screen, .module-screen');
    screens.forEach(screen => {
        observer.observe(screen, { attributes: true });
    });
});

// Global error handling
window.addEventListener('error', function(e) {
    console.error('❌ Global error:', e.error);
});

// Prevent default touch behaviors that might interfere with scrolling
document.addEventListener('touchmove', function(e) {
    // Allow scrolling on scrollable elements
    let node = e.target;
    while (node) {
        if (node.classList && (node.classList.contains('screen') || 
            node.classList.contains('module-screen') ||
            node.classList.contains('terminal-body'))) {
            return;
        }
        node = node.parentNode;
    }
}, { passive: true });

// Add smooth scroll behavior
document.querySelectorAll('.screen, .module-screen').forEach(screen => {
    screen.style.scrollBehavior = 'smooth';
});

console.log('✅ BadrOS v2.5 JavaScript loaded successfully');