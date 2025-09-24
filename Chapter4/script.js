// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
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

    // Initialize interactive components
    initializeChart();
    initializeClassifier();
    initializePPPCalculator();
    initializeFactCarousel();
});

// Chart functionality
let comparisonChart = null;

function initializeChart() {
    const ctx = document.getElementById('comparisonChart');
    if (!ctx) return;

    const chartData = {
        gdp: {
            labels: ['United States', 'China', 'Japan', 'Germany', 'India', 'United Kingdom'],
            data: [21.43, 14.34, 5.08, 3.85, 2.87, 2.83],
            label: 'GDP (Trillions USD)',
            backgroundColor: 'rgba(59, 130, 246, 0.8)'
        },
        hdi: {
            labels: ['Norway', 'Ireland', 'Switzerland', 'Hong Kong', 'Iceland', 'Germany'],
            data: [0.957, 0.955, 0.946, 0.949, 0.949, 0.947],
            label: 'Human Development Index',
            backgroundColor: 'rgba(16, 185, 129, 0.8)'
        },
        ppp: {
            labels: ['Luxembourg', 'Singapore', 'Ireland', 'Qatar', 'Switzerland', 'Norway'],
            data: [118394, 98014, 94556, 93508, 83717, 81995],
            label: 'GDP per Capita PPP (USD)',
            backgroundColor: 'rgba(245, 158, 11, 0.8)'
        }
    };

    comparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.gdp.labels,
            datasets: [{
                label: chartData.gdp.label,
                data: chartData.gdp.data,
                backgroundColor: chartData.gdp.backgroundColor,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });

    // Chart button functionality
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const chartType = this.getAttribute('data-chart');
            const data = chartData[chartType];
            
            comparisonChart.data.labels = data.labels;
            comparisonChart.data.datasets[0].label = data.label;
            comparisonChart.data.datasets[0].data = data.data;
            comparisonChart.data.datasets[0].backgroundColor = data.backgroundColor;
            comparisonChart.update();
        });
    });
}

// Country Classifier Game
let currentCountryIndex = 0;
const countries = [
    { name: 'South Korea', gdp: 31846, hdi: 22, type: 'developed' },
    { name: 'Brazil', gdp: 8897, hdi: 73, type: 'emerging' },
    { name: 'Nigeria', gdp: 2230, hdi: 161, type: 'developing' },
    { name: 'India', gdp: 1901, hdi: 131, type: 'emerging' },
    { name: 'Norway', gdp: 75420, hdi: 1, type: 'developed' },
    { name: 'Bangladesh', gdp: 1698, hdi: 133, type: 'developing' },
    { name: 'China', gdp: 10500, hdi: 85, type: 'emerging' },
    { name: 'Switzerland', gdp: 81867, hdi: 3, type: 'developed' },
    { name: 'Kenya', gdp: 1838, hdi: 143, type: 'developing' },
    { name: 'Russia', gdp: 11654, hdi: 52, type: 'emerging' }
];

function initializeClassifier() {
    updateCountryDisplay();
    
    document.querySelectorAll('.classify-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedType = this.getAttribute('data-type');
            const correctType = countries[currentCountryIndex].type;
            const feedback = document.getElementById('feedback');
            
            // Reset button styles
            document.querySelectorAll('.classify-btn').forEach(b => {
                b.classList.remove('correct', 'incorrect');
            });
            
            if (selectedType === correctType) {
                this.classList.add('correct');
                feedback.textContent = 'Correct! Great job!';
                feedback.className = 'result-feedback correct';
            } else {
                this.classList.add('incorrect');
                feedback.textContent = `Incorrect. ${countries[currentCountryIndex].name} is an ${correctType} economy.`;
                feedback.className = 'result-feedback incorrect';
                
                // Highlight correct answer
                document.querySelector(`[data-type="${correctType}"]`).classList.add('correct');
            }
            
            // Disable buttons after selection
            document.querySelectorAll('.classify-btn').forEach(b => {
                b.style.pointerEvents = 'none';
            });
            
            // Show explanation based on correct type
            setTimeout(() => {
                showExplanation(correctType);
            }, 1500);
        });
    });
    
    document.getElementById('nextCountry').addEventListener('click', nextCountry);
}

function updateCountryDisplay() {
    const country = countries[currentCountryIndex];
    document.getElementById('country-name').textContent = country.name;
    document.querySelector('.country-stats').innerHTML = `
        <span>GDP per capita: $${country.gdp.toLocaleString()}</span>
        <span>HDI Rank: ${country.hdi}</span>
    `;
}

function showExplanation(type) {
    const explanations = {
        developed: 'Developed economies have high GDP per capita, low HDI rankings (closer to 1), and strong institutions.',
        emerging: 'Emerging markets show rapid growth with moderate GDP per capita and improving HDI rankings.',
        developing: 'Developing countries typically have lower GDP per capita and higher HDI rankings (further from 1).'
    };
    
    const feedback = document.getElementById('feedback');
    feedback.textContent += ` ${explanations[type]}`;
}

function nextCountry() {
    currentCountryIndex = (currentCountryIndex + 1) % countries.length;
    updateCountryDisplay();
    
    // Reset buttons
    document.querySelectorAll('.classify-btn').forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        btn.style.pointerEvents = 'auto';
    });
    
    // Clear feedback
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'result-feedback';
}

// PPP Calculator
function initializePPPCalculator() {
    const pppRates = {
        usa: 1.0,
        india: 3.5,
        china: 2.3,
        brazil: 2.1
    };
    
    document.getElementById('calculatePPP').addEventListener('click', function() {
        const amount = parseFloat(document.getElementById('amount').value);
        const country = document.getElementById('country').value;
        const resultDiv = document.getElementById('pppResult');
        
        if (isNaN(amount) || amount <= 0) {
            resultDiv.innerHTML = '<div style="color: #ef4444;">Please enter a valid amount</div>';
            return;
        }
        
        const pppValue = amount * pppRates[country];
        const countryNames = {
            usa: 'United States',
            india: 'India',
            china: 'China',
            brazil: 'Brazil'
        };
        
        resultDiv.innerHTML = `
            <div>$${amount.toLocaleString()} USD has the purchasing power of</div>
            <div style="font-size: 1.25rem; font-weight: bold; color: #1e40af;">
                $${pppValue.toLocaleString()} in ${countryNames[country]}
            </div>
        `;
    });
}

// Fact Carousel
let currentFactIndex = 0;
const facts = [
    {
        icon: 'fas fa-lightbulb',
        text: "China's economy has doubled every 8 years for the last 3 decades - the fastest rate for a major economy in recorded history."
    },
    {
        icon: 'fas fa-globe',
        text: 'The term "emerging markets" was coined in 1981 by Antoine van Agtmael to make "Third-World Equity Fund" sound more positive.'
    },
    {
        icon: 'fas fa-chart-line',
        text: 'If measured by purchasing power parity, emerging markets already account for more economic output than developed countries.'
    },
    {
        icon: 'fas fa-coins',
        text: 'The UAE has 202 different nationalities in its workforce, with only 20% being actual UAE citizens.'
    },
    {
        icon: 'fas fa-industry',
        text: 'If California were an independent country, it would be the 5th largest economy in the world, ahead of India and the UK.'
    },
    {
        icon: 'fas fa-mobile-alt',
        text: 'Many developing countries leapfrogged traditional infrastructure by adopting mobile technology directly, skipping landline phones entirely.'
    }
];

function initializeFactCarousel() {
    updateFactDisplay();
    
    document.getElementById('nextFact').addEventListener('click', function() {
        currentFactIndex = (currentFactIndex + 1) % facts.length;
        updateFactDisplay();
    });
}

function updateFactDisplay() {
    const factItems = document.querySelectorAll('.fact-item');
    factItems.forEach((item, index) => {
        if (index === currentFactIndex) {
            item.classList.add('active');
            item.innerHTML = `
                <i class="${facts[currentFactIndex].icon}"></i>
                <p>${facts[currentFactIndex].text}</p>
            `;
        } else {
            item.classList.remove('active');
        }
    });
}

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.economy-card, .stat-card, .tool-card, .impact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Error handling for external dependencies
window.addEventListener('error', function(e) {
    console.warn('Resource failed to load:', e.target.src || e.target.href);
    // Gracefully handle missing Chart.js
    if (e.target.src && e.target.src.includes('chart')) {
        document.querySelector('.chart-section').innerHTML = `
            <h3>Interactive Chart</h3>
            <div style="text-align: center; padding: 2rem; background: #f3f4f6; border-radius: 10px;">
                <p>Chart functionality requires Chart.js library</p>
                <p>Please ensure internet connection for full functionality</p>
            </div>
        `;
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);