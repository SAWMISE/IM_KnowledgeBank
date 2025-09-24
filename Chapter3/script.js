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

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements that should be revealed
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.culture-card, .dimension-card, .hall-card, .impact-card, .challenge-card, .timeline-item, .adaptation-card, .lesson-card, .tip-card');
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
});

// Interactive Hofstede Dimension Sliders
function createInteractiveDimensions() {
    const dimensionCards = document.querySelectorAll('.dimension-card');
    
    dimensionCards.forEach(card => {
        const scaleBar = card.querySelector('.scale-bar');
        const indicator = card.querySelector('.scale-indicator');
        
        if (scaleBar && indicator) {
            scaleBar.style.cursor = 'pointer';
            
            scaleBar.addEventListener('click', (e) => {
                const rect = scaleBar.getBoundingClientRect();
                const clickPosition = e.clientX - rect.left;
                const percentage = (clickPosition / rect.width) * 100;
                
                indicator.style.left = percentage + '%';
                
                // Add visual feedback
                scaleBar.style.background = `linear-gradient(to right, #2563eb ${percentage}%, #e2e8f0 ${percentage}%)`;
                
                // Reset after animation
                setTimeout(() => {
                    scaleBar.style.background = '#e2e8f0';
                }, 1000);
            });
        }
    });
}

// Initialize interactive elements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createInteractiveDimensions();
    initializeCounters();
    initializeTooltips();
});

// Animated Counters for Statistics
function initializeCounters() {
    const counters = document.querySelectorAll('.stat h3, .stat-item h3');
    
    const animateCounter = (counter) => {
        const target = counter.innerText;
        const isNumber = /^\d+/.test(target);
        
        if (isNumber) {
            const finalNumber = parseInt(target.replace(/[^\d]/g, ''));
            const increment = finalNumber / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalNumber) {
                    counter.innerText = target;
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.floor(current) + target.replace(/^\d+/, '');
                }
            }, 20);
        }
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Initialize Tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.innerText = e.target.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.cssText = `
                position: absolute;
                top: ${rect.top - 40}px;
                left: ${rect.left + rect.width / 2}px;
                transform: translateX(-50%);
                background: #1e293b;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 14px;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            setTimeout(() => tooltip.style.opacity = '1', 10);
        });
        
        element.addEventListener('mouseleave', () => {
            const tooltips = document.querySelectorAll('.tooltip');
            tooltips.forEach(tooltip => tooltip.remove());
        });
    });
}

// Interactive Case Study Timeline
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            timelineItems.forEach(i => i.classList.remove('timeline-active'));
            
            // Add active class to clicked item
            item.classList.add('timeline-active');
            
            // Add visual feedback
            const marker = item.querySelector('.timeline-marker');
            if (marker) {
                marker.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    marker.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
}

// Progress Bar
function initializeProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #10b981);
        z-index: 1002;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createInteractiveDimensions();
    initializeCounters();
    initializeTooltips();
    initializeTimeline();
    initializeProgressBar();
    
    // Add fade-in animation to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('fade-in');
    }
    
    // Lazy load images (if any are added later)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add CSS for timeline interaction
const additionalCSS = `
.timeline-active .timeline-content {
    transform: scale(1.02);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.15) !important;
}
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);