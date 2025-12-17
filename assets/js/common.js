/**
 * Common JavaScript - Shared functionality across all pages
 * =========================================================
 */

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize Particles (Water effect on hero section)
 */
async function initializeParticles() {
    const particlesContainer = document.querySelector('.water-particles');

    if (!particlesContainer || !window.tsParticles) {
        return;
    }

    try {
        await tsParticles.load("tsparticles", {
            particles: {
                number: {
                    value: 30,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ["#00BFFF", "#1E90FF"]
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.5,
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.1
                    }
                },
                size: {
                    value: 3,
                    animation: {
                        enable: true,
                        speed: 2,
                        minimumValue: 1
                    }
                },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: "up",
                    random: true,
                    straight: false,
                    outMode: "out"
                }
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onClick: {
                        enable: true,
                        mode: "push"
                    }
                }
            }
        });
    } catch (error) {
        console.warn('Particles not initialized:', error);
    }
}

/**
 * Update navbar style on scroll
 */
function initializeNavbarScroll() {
    const navbar = document.getElementById('navbar');

    if (!navbar) return;

    // Simple, reliable scroll handler
    const handleScroll = () => {
        if (window.pageYOffset > 50) {
            if (!navbar.classList.contains('scrolled')) {
                navbar.classList.add('scrolled');
            }
        } else {
            if (navbar.classList.contains('scrolled')) {
                navbar.classList.remove('scrolled');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();
}

/**
 * Smooth scroll for anchor links
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Counter animation with CountUp.js
 */
function animateCounters(selector = '.stat-value') {
    const counters = document.querySelectorAll(selector);

    counters.forEach(counter => {
        const target = parseFloat(counter.dataset.target) || 0;
        const unit = counter.dataset.unit || '';
        const decimals = counter.dataset.decimals ? parseInt(counter.dataset.decimals) : (Number.isInteger(target) ? 0 : 1);

        ScrollTrigger.create({
            trigger: counter,
            onEnter: () => {
                if (!counter.classList.contains('animated')) {
                    const countUp = new CountUp(counter, 0, target, {
                        duration: 2,
                        separator: ',',
                        decimalPlaces: decimals
                    });

                    if (countUp.error) {
                        console.error('CountUp error:', countUp.error);
                    } else {
                        countUp.start();
                        counter.classList.add('animated');
                    }
                }
            },
            once: true
        });
    });
}

/**
 * Set hero background image
 * @param {string} imageUrl - URL of the water background image
 */
function setHeroBackground(imageUrl) {
    const hero = document.querySelector('.hero');
    if (hero && imageUrl) {
        hero.style.backgroundImage = `url('${imageUrl}')`;
    }
}

/**
 * Initialize localStorage for cart persistence
 */
function initializeLocalStorage() {
    // Check if cart exists in localStorage
    if (!localStorage.getItem('nileguard_cart')) {
        localStorage.setItem('nileguard_cart', JSON.stringify([]));
    }
}

/**
 * Update cart count in navbar
 */
function updateCartCount() {
    const cartData = JSON.parse(localStorage.getItem('nileguard_cart') || '[]');
    const cartCount = cartData.reduce((total, item) => total + (item.quantity || 1), 0);

    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;

        // Animate when count changes
        gsap.to(cartCountElement, {
            scale: 1.3,
            duration: 0.3,
            yoyo: true,
            repeat: 1
        });
    }
}

/**
 * Dummy data generator for development
 */
window.dummyData = {
    products: [
        { id: 1, name: 'WaterSense Low-Flow Showerhead', icon: '🚿', price: 29, waterSaved: 45000, category: 'home', description: '2.0 GPM WaterSense certified. Saves ~12,000 gallons/year for a family of four (≈45,000 L).' },
        { id: 2, name: 'Faucet Aerator Pack', icon: '🚰', price: 15, waterSaved: 26000, category: 'home', description: '1.5 GPM aerators cut sink use by ~30%. Typical household saves ≈26,000 L/year.' },
        { id: 3, name: 'Dual-Flush Conversion Kit', icon: '🚽', price: 39, waterSaved: 54000, category: 'home', description: 'Converts existing tank to dual-flush. Average savings ≈54,000 L/year per household.' },
        { id: 4, name: 'Smart Leak Detector', icon: '🔧', price: 69, waterSaved: 11000, category: 'home', description: 'Wi‑Fi leak + freeze alerts. Avoids small leaks that waste ~3,000 gallons/year (≈11,000 L).' },
        { id: 5, name: 'Drip Irrigation Starter Kit', icon: '🌱', price: 65, waterSaved: 150000, category: 'garden', description: 'Delivers water at roots; reduces outdoor use by up to 50%. ≈150,000 L/year for 200 m² garden.' },
        { id: 6, name: 'Soil Moisture Sensor Controller', icon: '📡', price: 89, waterSaved: 50000, category: 'garden', description: 'Skips irrigation when soil is wet. Typical savings ≈50,000 L/season for lawns.' },
        { id: 7, name: 'Rain Barrel Kit (200L)', icon: '🌧️', price: 120, waterSaved: 20000, category: 'garden', description: 'Harvest rainwater for gardens. 200 L barrel can offset ≈20,000 L/year in many climates.' },
        { id: 8, name: 'Greywater Laundry Diverter', icon: '♻️', price: 210, waterSaved: 90000, category: 'industrial', description: 'Routes washing machine water to irrigation where permitted. Saves ≈90,000 L/year.' }
    ],

    quizQuestions: [
        {
            question: 'What percentage of the world\'s freshwater is used for agriculture?',
            options: ['40%', '70%', '20%', '10%'],
            correct: 1
        },
        {
            question: 'How much water does a leaking faucet waste per year?',
            options: ['500 gallons', '3,000 gallons', '10,000 gallons', '50,000 gallons'],
            correct: 1
        },
        {
            question: 'Which country uses the most water per capita?',
            options: ['USA', 'China', 'India', 'Brazil'],
            correct: 0
        },
        {
            question: 'What is the recommended shower duration to save water?',
            options: ['10 minutes', '5 minutes', '2 minutes', '15 minutes'],
            correct: 1
        },
        {
            question: 'What percentage of water is lost in distribution pipelines?',
            options: ['10%', '25%', '40%', '60%'],
            correct: 2
        }
    ],

    nileRegions: [
        { name: 'Cairo', waterScarcity: 75, population: 21 },
        { name: 'Giza', waterScarcity: 80, population: 4.3 },
        { name: 'Alexandria', waterScarcity: 60, population: 5.1 },
        { name: 'Aswan', waterScarcity: 90, population: 0.3 },
        { name: 'Luxor', waterScarcity: 85, population: 0.5 },
        { name: 'Assiut', waterScarcity: 75, population: 4.1 }
    ]
};

/**
 * Initialize all common functionality
 */
function initializeApp() {
    console.log('🌊 Initializing NileGuard Application...');

    initializeParticles();
    initializeNavbarScroll();
    initializeSmoothScroll();
    initializeLocalStorage();
    updateCartCount();

    console.log('✅ NileGuard Application Ready!');
}

/**
 * Debounce utility function
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

/**
 * Throttle utility function
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Format number with thousands separator
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Get random color from theme
 */
function getRandomThemeColor() {
    const colors = [
        'var(--primary-blue)',
        'var(--primary-aqua)',
        'var(--success-green)',
        'var(--warning-yellow)',
        'var(--danger-red)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle window resize
window.addEventListener('resize', debounce(() => {
    console.log('Window resized');
}, 250));
