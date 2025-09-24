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
        header.style.background = 'rgba(30, 60, 114, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
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
        '.theory-category',
        '.system-category',
        '.government-intervention',
        '.investment-types',
        '.fdi-decision-factors',
        '.fdi-forms',
        '.government-fdi-policies',
        '.case-study',
        '.section-title'
    ].join(','));
    
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
});

// Timeline animation for classical theories
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.theory-item');
    
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, index * 200);
    });
}

// Trigger timeline animation when section is visible
const timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateTimeline();
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', function() {
    const classicalSection = document.querySelector('.classical');
    if (classicalSection) {
        timelineObserver.observe(classicalSection);
    }
});

// Interactive hover effects for theory cards
document.addEventListener('DOMContentLoaded', function() {
    const theoryCards = document.querySelectorAll('.modern-theory-card');
    
    theoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(30, 60, 114, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
});

// FDI Decision Factors Wheel Animation
function animateFactorsWheel() {
    const factorItems = document.querySelectorAll('.factor-item');
    
    factorItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = `translate(-50%, -50%) rotate(var(--angle)) translateY(-160px) rotate(calc(-1 * var(--angle))) scale(0.8)`;
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = `translate(-50%, -50%) rotate(var(--angle)) translateY(-160px) rotate(calc(-1 * var(--angle))) scale(1)`;
        }, index * 100);
    });
}

// Trigger wheel animation
const wheelObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateFactorsWheel();
            wheelObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const factorsWheel = document.querySelector('.factors-wheel');
    if (factorsWheel) {
        wheelObserver.observe(factorsWheel);
    }
});

// Interactive case study cards
document.addEventListener('DOMContentLoaded', function() {
    const caseStudies = document.querySelectorAll('.case-study');
    
    caseStudies.forEach(caseStudy => {
        caseStudy.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 25px 50px rgba(30, 60, 114, 0.2)';
        });
        
        caseStudy.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Political spectrum interactive effects
document.addEventListener('DOMContentLoaded', function() {
    const spectrumItems = document.querySelectorAll('.spectrum-item');
    
    spectrumItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            spectrumItems.forEach(i => i.classList.remove('active-spectrum'));
            
            // Add active class to clicked item
            this.classList.add('active-spectrum');
            
            // Add some visual feedback
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            
            // Reset after animation
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            }, 300);
        });
    });
});

// Method cards interactive grid
document.addEventListener('DOMContentLoaded', function() {
    const methodCards = document.querySelectorAll('.method-card');
    
    methodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Dim other cards
            methodCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.opacity = '0.7';
                    otherCard.style.transform = 'scale(0.95)';
                }
            });
            
            // Highlight current card
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset all cards
            methodCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
                otherCard.style.transform = 'scale(1)';
                otherCard.style.zIndex = 'auto';
            });
            
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Trade flow animation enhancement
function enhanceTradeFlows() {
    const flowLines = document.querySelectorAll('.flow-line');
    
    flowLines.forEach((line, index) => {
        // Create pulsing effect
        setInterval(() => {
            line.style.opacity = '0.3';
            setTimeout(() => {
                line.style.opacity = '1';
            }, 500);
        }, 2000 + (index * 1000));
    });
}

// Initialize trade flow enhancements
window.addEventListener('load', function() {
    enhanceTradeFlows();
});

// Porter's Diamond interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const diamondElements = document.querySelectorAll('.diamond-element');
    
    diamondElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.backgroundColor = '#d35400';
            this.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = '#e67e22';
        });
        
        element.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.height / 2 - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Progressive content loading
function progressiveContentLoad() {
    const sections = document.querySelectorAll('.section');
    let delay = 0;
    
    sections.forEach(section => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, delay);
        delay += 200;
    });
}

// Initialize progressive loading
window.addEventListener('load', function() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
    });
    
    setTimeout(progressiveContentLoad, 500);
});

// Scroll-triggered counter animations for statistics
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            counter.textContent = Math.floor(start);
            
            if (start < target) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        
        updateCounter();
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrollTop < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrollTop * 0.3}px)`;
    }
});

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    const focusableElements = document.querySelectorAll([
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(','));
    
    const navMenu = document.getElementById('nav-menu');
    
    if (navMenu && navMenu.classList.contains('active')) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
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
        
        if (e.key === 'Escape') {
            document.getElementById('hamburger').click();
        }
    }
});

// Form interaction enhancements for FDI forms
document.addEventListener('DOMContentLoaded', function() {
    const formItems = document.querySelectorAll('.form-item');
    
    formItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add selected state
            formItems.forEach(otherItem => {
                otherItem.classList.remove('selected');
            });
            
            this.classList.add('selected');
            
            // Add visual feedback
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1)';
            }, 200);
        });
    });
});

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = [
        { selector: '.hamburger', name: 'Mobile menu toggle' },
        { selector: '.nav-menu', name: 'Navigation menu' },
        { selector: '.hero-title', name: 'Hero title' },
        { selector: '.factors-wheel', name: 'FDI factors wheel' }
    ];
    
    requiredElements.forEach(element => {
        if (!document.querySelector(element.selector)) {
            console.warn(`Missing element: ${element.name} (${element.selector})`);
        }
    });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', handleMissingElements);

// Performance optimization: Intersection Observer for expensive animations
const expensiveAnimationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Only run expensive animations when elements are visible
            if (entry.target.classList.contains('factors-wheel')) {
                animateFactorsWheel();
            }
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '50px'
});

// Observe elements that have expensive animations
document.addEventListener('DOMContentLoaded', function() {
    const expensiveElements = document.querySelectorAll([
        '.factors-wheel',
        '.trade-animation'
    ].join(','));
    
    expensiveElements.forEach(element => {
        expensiveAnimationObserver.observe(element);
    });
});

console.log('Chapter 2: International Trade & FDI Website loaded successfully!');