// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
        header.style.background = 'rgba(102, 126, 234, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll([
        '.definition-card',
        '.form-category',
        '.perspective',
        '.step',
        '.stakeholder-card',
        '.section-title'
    ].join(','));
    
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Counter animation for statistics (if you want to add numbers)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start < target) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrollTop < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrollTop * 0.3}px)`;
    }
});

// Interactive hover effects for cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll([
        '.definition-card',
        '.form-category',
        '.stakeholder-card'
    ].join(','));
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Progressive loading of content
function loadContentProgressively() {
    const sections = document.querySelectorAll('.section');
    let currentSection = 0;
    
    function showNextSection() {
        if (currentSection < sections.length) {
            sections[currentSection].style.opacity = '1';
            sections[currentSection].style.transform = 'translateY(0)';
            currentSection++;
            setTimeout(showNextSection, 200);
        }
    }
    
    // Initially hide all sections except hero
    sections.forEach((section, index) => {
        if (index > 0) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s ease';
        }
    });
    
    // Start progressive loading after hero loads
    setTimeout(showNextSection, 1000);
}

// Initialize progressive loading
window.addEventListener('load', loadContentProgressively);

// Add interactive elements to the globalization debate section
document.addEventListener('DOMContentLoaded', function() {
    const perspectives = document.querySelectorAll('.perspective');
    
    perspectives.forEach(perspective => {
        perspective.addEventListener('click', function() {
            // Remove active class from all perspectives
            perspectives.forEach(p => p.classList.remove('active-perspective'));
            
            // Add active class to clicked perspective
            this.classList.add('active-perspective');
            
            // Add some visual feedback
            this.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.2)';
            
            setTimeout(() => {
                perspectives.forEach(p => {
                    p.classList.remove('active-perspective');
                    p.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                });
            }, 2000);
        });
    });
});

// Search functionality (if you want to add a search feature)
function addSearchFunctionality() {
    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search content...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px;
        border: none;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        z-index: 1001;
        display: none;
    `;
    
    document.body.appendChild(searchInput);
    
    // Toggle search with Ctrl+K
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            searchInput.style.display = searchInput.style.display === 'none' ? 'block' : 'none';
            if (searchInput.style.display === 'block') {
                searchInput.focus();
            }
        }
    });
    
    // Simple search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li');
        
        textElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (searchTerm && text.includes(searchTerm)) {
                element.style.backgroundColor = 'yellow';
            } else {
                element.style.backgroundColor = '';
            }
        });
    });
}

// Initialize search functionality
// addSearchFunctionality(); // Uncomment if you want search feature

// Performance optimization: Lazy loading for images (if you add images later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = [
        { selector: '.hamburger', name: 'Mobile menu toggle' },
        { selector: '.nav-menu', name: 'Navigation menu' },
        { selector: '.hero-title', name: 'Hero title' }
    ];
    
    requiredElements.forEach(element => {
        if (!document.querySelector(element.selector)) {
            console.warn(`Missing element: ${element.name} (${element.selector})`);
        }
    });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', handleMissingElements);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    const focusableElements = document.querySelectorAll([
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(','));
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Trap focus within modal or menu when open
    if (navMenu && navMenu.classList.contains('active')) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
        
        // Close menu with Escape
        if (e.key === 'Escape') {
            document.getElementById('hamburger').click();
        }
    }
});

console.log('International Business Website loaded successfully!');