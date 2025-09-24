// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Add smooth scroll behavior for any future anchor links
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

    // Add hover effects to chapter cards
    const chapterCards = document.querySelectorAll('.chapter-card');
    chapterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('coming-soon')) {
                this.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click feedback for coming soon chapters
    const comingSoonCards = document.querySelectorAll('.chapter-card.coming-soon');
    comingSoonCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            // Show notification
            showNotification('This chapter will be available soon!');
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Create notification function
    function showNotification(message) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add CSS for animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Track page visits (for future analytics)
    function trackPageVisit() {
        const visits = localStorage.getItem('intl-mgmt-visits') || 0;
        localStorage.setItem('intl-mgmt-visits', parseInt(visits) + 1);
        
        // Track last visit time
        localStorage.setItem('intl-mgmt-last-visit', new Date().toISOString());
    }
    
    trackPageVisit();

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Press '1' to go to Chapter 1
        if (e.key === '1' && !e.ctrlKey && !e.altKey && !e.shiftKey) {
            const chapter1Link = document.querySelector('a[href="Chapter1/index.html"]');
            if (chapter1Link) {
                chapter1Link.click();
            }
        }
        // Press '2' to go to Chapter 2
        if (e.key === '2' && !e.ctrlKey && !e.altKey && !e.shiftKey) {
            const chapter2Link = document.querySelector('a[href="Chapter2/index.html"]');
            if (chapter2Link) {
                chapter2Link.click();
            }
        }
        // Press '3' to go to Chapter 3
        if (e.key === '3' && !e.ctrlKey && !e.altKey && !e.shiftKey) {
            const chapter3Link = document.querySelector('a[href="Chapter3/index.html"]');
            if (chapter3Link) {
                chapter3Link.click();
            }
        }
        // Press '4' to go to Chapter 4
        if (e.key === '4' && !e.ctrlKey && !e.altKey && !e.shiftKey) {
            const chapter4Link = document.querySelector('a[href="Chapter4/index.html"]');
            if (chapter4Link) {
                chapter4Link.click();
            }
        }
        // Press '5' to go to Chapter 5
        if (e.key === '5' && !e.ctrlKey && !e.altKey && !e.shiftKey) {
            const chapter5Link = document.querySelector('a[href="Chapter5/index.html"]');
            if (chapter5Link) {
                chapter5Link.click();
            }
        }
        // Press '6' to go to Chapter 6
        if (e.key === '6' && !e.ctrlKey && !e.altKey && !e.shiftKey) {
            const chapter6Link = document.querySelector('a[href="Chapter6/index.html"]');
            if (chapter6Link) {
                chapter6Link.click();
            }
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const elementsToObserve = document.querySelectorAll('.chapter-card, .resource-item');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });

    // Add loading progress indicator
    window.addEventListener('load', function() {
        const loadingIndicator = document.createElement('div');
        loadingIndicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            animation: loadingProgress 0.5s ease;
            z-index: 9999;
        `;
        
        document.body.appendChild(loadingIndicator);
        
        setTimeout(() => {
            loadingIndicator.style.opacity = '0';
            loadingIndicator.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                loadingIndicator.remove();
            }, 300);
        }, 500);
    });

    // Add dynamic background particles (optional decorative element)
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(102, 126, 234, 0.1);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 10 + 20}s linear infinite;
            `;
            particlesContainer.appendChild(particle);
        }
        
        document.body.appendChild(particlesContainer);
    }

    // Add floating particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-30px) translateX(10px);
            }
            50% {
                transform: translateY(15px) translateX(-10px);
            }
            75% {
                transform: translateY(-15px) translateX(15px);
            }
        }
        
        @keyframes loadingProgress {
            from {
                transform: translateX(-100%);
            }
            to {
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Initialize particles (optional - comment out if you prefer cleaner look)
    // createParticles();

    // Console message for developers
    console.log('%c International Management Course Hub ', 
        'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold; font-size: 16px;');
    console.log('Welcome to the International Management course platform!');
    console.log('Updated with 6 chapters including Global Economic Cooperation and International Monetary System');
});