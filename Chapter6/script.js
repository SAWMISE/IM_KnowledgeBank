// Mobile Navigation Toggle
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

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animated counter for hero stats
function animateCounters() {
    const stats = [
        { element: document.querySelector('.stat:nth-child(1) h3'), end: 187, duration: 2000 },
        { element: document.querySelector('.stat:nth-child(2) h3'), end: 750, duration: 2000, prefix: '$', suffix: 'B' },
        { element: document.querySelector('.stat:nth-child(3) h3'), end: 46.9, duration: 2000, prefix: '$', suffix: 'B' }
    ];
    
    stats.forEach(stat => {
        if (stat.element) {
            animateValue(stat.element, 0, stat.end, stat.duration, stat.prefix || '', stat.suffix || '');
        }
    });
}

function animateValue(element, start, end, duration, prefix = '', suffix = '') {
    const startTime = performance.now();
    const isFloat = end % 1 !== 0;
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        const current = start + (end - start) * easedProgress;
        const displayValue = isFloat ? current.toFixed(1) : Math.round(current);
        
        element.textContent = prefix + displayValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger counter animation for hero stats
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
            
            // Trigger timeline animations
            if (entry.target.classList.contains('timeline-item')) {
                entry.target.style.animationDelay = entry.target.dataset.delay || '0ms';
                entry.target.classList.add('slide-in');
            }
            
            // Trigger card animations
            if (entry.target.classList.contains('imf-card') || 
                entry.target.classList.contains('impact-card') ||
                entry.target.classList.contains('institution-card')) {
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.classList.add('fade-in-up');
                }, delay);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-item, .imf-card, .impact-card, .institution-card, .theme-card, .hero-stats').forEach(el => {
    observer.observe(el);
});

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .timeline-item {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.6s ease;
    }
    
    .timeline-item:nth-child(even) {
        transform: translateX(30px);
    }
    
    .timeline-item.slide-in {
        opacity: 1;
        transform: translateX(0);
    }
    
    .imf-card, .impact-card, .institution-card, .theme-card {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.6s ease;
    }
    
    .fade-in-up {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    /* Ensure theme cards are visible */
    .themes-grid {
        min-height: 400px;
    }
    
    .theme-card {
        opacity: 1 !important;
        transform: translateY(0) !important;
        display: block !important;
    }
`;
document.head.appendChild(style);

// Add active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav links
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: #2563eb !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const currencyAnimation = document.querySelector('.currency-animation');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (currencyAnimation && scrolled < window.innerHeight) {
        currencyAnimation.style.transform = `translateY(${scrolled * -0.2}px) rotate(${scrolled * 0.1}deg)`;
    }
});

// Card hover effects
document.querySelectorAll('.imf-card, .impact-card, .institution-card, .career-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Timeline item hover effects
document.querySelectorAll('.timeline-content').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const marker = this.parentNode.querySelector('.timeline-marker');
        if (marker) {
            marker.style.transform = 'translateX(-50%) scale(1.5)';
            marker.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3)';
            marker.style.transition = 'all 0.3s ease';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const marker = this.parentNode.querySelector('.timeline-marker');
        if (marker) {
            marker.style.transform = 'translateX(-50%) scale(1)';
            marker.style.boxShadow = 'none';
        }
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    z-index: 9999;
    transition: width 0.3s ease;
`;
document.body.appendChild(progressBar);

// Add floating particles effect to hero background
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 15 + 10}s linear infinite;
            pointer-events: none;
        `;
        hero.appendChild(particle);
    }
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
    
    .hero {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(particleStyle);

// Add smooth reveal animation for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    sectionObserver.observe(section);
});

// Add CSS for section visibility
const sectionStyle = document.createElement('style');
sectionStyle.textContent = `
    .section-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(sectionStyle);

// Add focus management for accessibility
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #3b82f6';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Performance optimization - throttle scroll events
let ticking = false;

function updateOnScroll() {
    const scrolled = window.pageYOffset;
    
    // Update progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrolled / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
    
    // Update navbar
    if (scrolled > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Parallax effect
    const heroContent = document.querySelector('.hero-content');
    const currencyAnimation = document.querySelector('.currency-animation');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (currencyAnimation && scrolled < window.innerHeight) {
        currencyAnimation.style.transform = `translateY(${scrolled * -0.2}px) rotate(${scrolled * 0.1}deg)`;
    }
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

// Replace multiple scroll listeners with single throttled one
window.addEventListener('scroll', requestTick);

// Initialize everything when page loads
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    createParticles();
    
    // Stagger animation for hero elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-stats, .cta-button');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
});

// Add keyboard navigation support for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

console.log('International Monetary System website loaded successfully!');
console.log('Features: responsive design, smooth animations, accessibility, and educational content.');