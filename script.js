// Initialize particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(139,0,0,0.9) 100%)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(139,0,0,0.8) 100%)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Animate pillar cards
    const pillarCards = document.querySelectorAll('.pillar-card');
    pillarCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate rank items
    const rankItems = document.querySelectorAll('.rank-item');
    rankItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Animate leadership cards
    const leaderCards = document.querySelectorAll('.leader-card');
    leaderCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        title.style.transition = 'all 0.8s ease';
        observer.observe(title);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroBackground && heroContent) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Pillar card interactions
document.querySelectorAll('.pillar-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.03)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add click interaction for mobile
    card.addEventListener('click', function() {
        const details = this.querySelector('.pillar-details');
        if (details) {
            details.style.maxHeight = details.style.maxHeight ? '0' : '500px';
        }
    });
});

// Interactive rank system
document.querySelectorAll('.rank-item').forEach(item => {
    item.addEventListener('click', function() {
        // Close all other rank items
        document.querySelectorAll('.rank-item').forEach(otherItem => {
            if (otherItem !== this) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current rank item
        this.classList.toggle('active');
        
        // Smooth scroll to the expanded item
        if (this.classList.contains('active')) {
            setTimeout(() => {
                this.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 100);
        }
    });
    
    // Hover effects
    item.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
            this.style.background = 'linear-gradient(135deg, rgba(139, 0, 0, 0.2), rgba(255, 215, 0, 0.1))';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.background = 'var(--glass-bg)';
        }
    });
});

// Cool shadow effect following mouse
document.addEventListener('mousemove', (e) => {
    const shadow = document.querySelector('.mouse-shadow');
    if (!shadow) {
        const newShadow = document.createElement('div');
        newShadow.className = 'mouse-shadow';
        newShadow.style.cssText = `
            position: fixed;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            transform: translate(-50%, -50%);
            filter: blur(20px);
        `;
        document.body.appendChild(newShadow);
    }
    
    const shadowElement = document.querySelector('.mouse-shadow');
    if (shadowElement) {
        shadowElement.style.left = e.clientX + 'px';
        shadowElement.style.top = e.clientY + 'px';
    }
});

// Add glow effect to buttons on hover
document.querySelectorAll('.cta-button, .join-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 1s infinite, glow 1s ease-in-out infinite alternate';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.animation = 'pulse 2s infinite';
    });
});

// Typing effect for hero title (optional)
function typeWriter() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    
    setTimeout(type, 1000);
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', typeWriter);

// Background music and sound toggle
let soundEnabled = false;
const backgroundMusic = document.getElementById('backgroundMusic');
const soundToggle = document.createElement('button');
soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
soundToggle.title = 'Click to play/pause music';
soundToggle.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(139, 0, 0, 0.8), rgba(255, 215, 0, 0.6));
    border: 2px solid var(--gold-accent);
    color: white;
    cursor: pointer;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
        // Reset audio and try to play
        backgroundMusic.currentTime = 0;
        backgroundMusic.play().then(() => {
            soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            console.log('Music started successfully!');
        }).catch(e => {
            console.log('Music play failed:', e);
            alert('Music could not play. Browser may require user interaction first.');
            soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            soundEnabled = false;
        });
    } else {
        backgroundMusic.pause();
        soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        console.log('Music paused');
    }
});

// Add hover effect
soundToggle.addEventListener('mouseenter', () => {
    soundToggle.style.transform = 'scale(1.1)';
});

soundToggle.addEventListener('mouseleave', () => {
    soundToggle.style.transform = 'scale(1)';
});

document.body.appendChild(soundToggle);

// Try to set volume and prepare audio
backgroundMusic.volume = 0.3; // Set volume to 30%
backgroundMusic.load(); // Preload the audio

console.log('Gaming audio system initialized. Click the sound button to play epic background music!');

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-based animations
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroBackground && heroContent) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console Easter egg
console.log('%c THE ELITE REVOLUTIONARY ', 'background: #8b0000; color: #ffd700; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Power. Strategy. Domination. ', 'background: #000; color: #fff; font-size: 14px; padding: 5px;');
