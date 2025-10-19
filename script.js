// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Boot sequence
    setTimeout(function() {
        startBootSequence();
    }, 500);
    
    // Initialize modules
    initModules();
    
    // Initialize command line
    initCommandLine();
});

function startBootSequence() {
    const bootScreen = document.getElementById('boot-screen');
    const terminalBody = document.querySelector('.terminal-body');
    
    // Boot messages
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
            
            messageIndex++;
            setTimeout(displayNextMessage, 1000);
        } else {
            // Add blinking cursor at the end
            const cursorElement = document.createElement('div');
            cursorElement.className = 'terminal-line';
            cursorElement.innerHTML = '<span class="terminal-prompt">></span><span class="typing-cursor"></span>';
            terminalBody.appendChild(cursorElement);
            
            // Transition to dashboard after a delay
            setTimeout(transitionToDashboard, 2000);
        }
    }
    
    displayNextMessage();
}

function transitionToDashboard() {
    const bootScreen = document.getElementById('boot-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    
    // Fade out boot screen
    bootScreen.style.opacity = '0';
    bootScreen.style.transition = 'opacity 1s ease';
    
    setTimeout(function() {
        bootScreen.classList.remove('active');
        dashboardScreen.classList.add('active');
        
        // Fade in dashboard
        setTimeout(function() {
            dashboardScreen.style.opacity = '1';
        }, 100);
    }, 1000);
}

function initModules() {
    // Module cards
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-module');
            openModule(moduleId);
        });
        
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const moduleId = this.getAttribute('data-module');
                openModule(moduleId);
            }
        });
    });
    
    // Close module buttons
    const closeButtons = document.querySelectorAll('.close-module');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeAllModules();
        });
    });
}

function openModule(moduleId) {
    // Close any open modules first
    closeAllModules();
    
    // Show the selected module
    const moduleScreen = document.getElementById(`${moduleId}-module`);
    const dashboardScreen = document.getElementById('dashboard-screen');
    
    if (moduleScreen) {
        dashboardScreen.classList.remove('active');
        moduleScreen.classList.add('active');
        
        // Add glitch effect to the module title
        const moduleTitle = moduleScreen.querySelector('.module-title-large');
        if (moduleTitle) {
            moduleTitle.classList.add('glitch-text');
            setTimeout(() => {
                moduleTitle.classList.remove('glitch-text');
            }, 500);
        }
        
        // Special initialization for specific modules
        if (moduleId === 'about') {
            initAboutModule();
        } else if (moduleId === 'skills') {
            initSkillsModule();
        } else if (moduleId === 'funzone') {
            initFunZoneModule();
        } else if (moduleId === 'projects') {
            initProjectsModule();
        } else if (moduleId === 'contact') {
            initContactModule();
        }
    }
}

function closeAllModules() {
    const moduleScreens = document.querySelectorAll('.module-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    
    moduleScreens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    dashboardScreen.classList.add('active');
}

function initAboutModule() {
    // Animate the file lines one by one
    const fileLines = document.querySelectorAll('.file-line');
    
    fileLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, 200 * index);
    });
}

function initSkillsModule() {
    // Add hover effects to skill nodes
    const skillNodes = document.querySelectorAll('.skill-node');
    
    skillNodes.forEach(node => {
        node.addEventListener('mouseenter', function() {
            const skillName = this.querySelector('.skill-name').textContent;
            const skillLevel = this.querySelector('.skill-level').textContent;
            
            // You could add a tooltip or other effect here
        });
    });
}

function initProjectsModule() {
    // Add click handlers for project cards if needed
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent bubbling to parent
            const projectTitle = this.querySelector('.project-title').textContent;
            // You could add project detail modal here
            console.log(`Opening project: ${projectTitle}`);
        });
    });
}

function initFunZoneModule() {
    // Easter egg functionality
    const eggTrigger = document.querySelector('.egg-trigger');
    let clickCount = 0;
    
    if (eggTrigger) {
        eggTrigger.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 5) {
                // Trigger easter egg
                triggerEasterEgg();
                clickCount = 0;
            }
        });
    }
    
    // Make joke cards interactive
    const jokeCards = document.querySelectorAll('.joke-card');
    jokeCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('joke-revealed');
        });
    });
}

function initContactModule() {
    // Add form submission handler
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // Show success message
                showFormResponse('Transmission sent successfully! Badr will respond soon.', 'success');
                
                // Reset form
                contactForm.reset();
            } else {
                showFormResponse('Please fill in all fields.', 'error');
            }
        });
    }
}

function showFormResponse(message, type) {
    // Remove any existing response messages
    const existingResponse = document.querySelector('.form-response');
    if (existingResponse) {
        existingResponse.remove();
    }
    
    // Create new response message
    const responseElement = document.createElement('div');
    responseElement.className = `form-response ${type}`;
    responseElement.textContent = message;
    responseElement.style.marginTop = '1rem';
    responseElement.style.padding = '0.8rem';
    responseElement.style.borderRadius = '5px';
    responseElement.style.textAlign = 'center';
    responseElement.style.fontWeight = '600';
    
    if (type === 'success') {
        responseElement.style.background = 'rgba(0, 255, 65, 0.2)';
        responseElement.style.border = '1px solid var(--terminal-green)';
        responseElement.style.color = 'var(--terminal-green)';
    } else {
        responseElement.style.background = 'rgba(255, 65, 65, 0.2)';
        responseElement.style.border = '1px solid #ff4141';
        responseElement.style.color = '#ff4141';
    }
    
    const contactForm = document.querySelector('.contact-form');
    contactForm.appendChild(responseElement);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        responseElement.remove();
    }, 5000);
}

function triggerEasterEgg() {
    // Create a fun easter egg effect
    const funZone = document.getElementById('funzone-module');
    const glitchEffect = document.createElement('div');
    
    glitchEffect.style.position = 'fixed';
    glitchEffect.style.top = '0';
    glitchEffect.style.left = '0';
    glitchEffect.style.width = '100%';
    glitchEffect.style.height = '100%';
    glitchEffect.style.background = 'linear-gradient(45deg, #ff00ff, #00ffff)';
    glitchEffect.style.opacity = '0.7';
    glitchEffect.style.zIndex = '9999';
    glitchEffect.style.pointerEvents = 'none';
    glitchEffect.style.animation = 'glitch 0.2s infinite';
    
    document.body.appendChild(glitchEffect);
    
    // Add a funny message
    const message = document.createElement('div');
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = 'rgba(0, 0, 0, 0.8)';
    message.style.color = '#00ff41';
    message.style.padding = '2rem';
    message.style.border = '2px solid #00ff41';
    message.style.borderRadius = '8px';
    message.style.zIndex = '10000';
    message.style.fontSize = '1.5rem';
    message.style.fontWeight = 'bold';
    message.style.textAlign = 'center';
    message.textContent = 'Easter Egg Found!\n\n"Debugging is like being a detective in a crime movie where you are also the murderer."';
    
    document.body.appendChild(message);
    
    // Remove effects after a few seconds
    setTimeout(() => {
        document.body.removeChild(glitchEffect);
        document.body.removeChild(message);
    }, 3000);
}

function initCommandLine() {
    const commandInput = document.querySelector('.command-input');
    
    if (commandInput) {
        commandInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim().toLowerCase();
                this.value = '';
                
                processCommand(command);
            }
        });
    }
}

function processCommand(command) {
    // Simple command processing
    const commands = {
        'about': 'about',
        'projects': 'projects',
        'skills': 'skills',
        'fun': 'funzone',
        'contact': 'contact',
        'help': 'help',
        'clear': 'clear',
        'exit': 'exit'
    };
    
    if (commands[command]) {
        if (command === 'help') {
            showCommandHelp();
        } else if (command === 'clear') {
            // Clear command line - in a real terminal we'd clear the history
            // For this demo, we'll just show a message
            addCommandResponse('Command history cleared.');
        } else if (command === 'exit') {
            closeAllModules();
        } else {
            openModule(commands[command]);
        }
    } else {
        addCommandResponse(`Command not found: ${command}. Type "help" for available commands.`);
    }
}

function showCommandHelp() {
    const helpText = `
Available commands:
- about: Open About module
- projects: Open Projects module
- skills: Open Skills module
- fun: Open Fun Zone module
- contact: Open Contact module
- help: Show this help
- clear: Clear command history
- exit: Return to dashboard
    `;
    
    addCommandResponse(helpText);
}

function addCommandResponse(text) {
    const commandLine = document.querySelector('.command-line');
    const responseElement = document.createElement('div');
    responseElement.className = 'terminal-line';
    responseElement.style.marginTop = '0.5rem';
    responseElement.innerHTML = `<span class="terminal-prompt">${text}</span>`;
    
    commandLine.parentNode.insertBefore(responseElement, commandLine);
    
    // Scroll to bottom
    responseElement.scrollIntoView({ behavior: 'smooth' });
}