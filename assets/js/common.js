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
 * Counter animation - counts up numbers with thousands separators
 */
function animateCounters(selector = '.stat-value') {
    const counters = document.querySelectorAll(selector);

    counters.forEach(counter => {
        const target = parseFloat(counter.dataset.target) || 0;
        const unit = counter.dataset.unit || '';

        ScrollTrigger.create({
            trigger: counter,
            onEnter: () => {
                if (!counter.classList.contains('animated')) {
                    // Fallback counter using GSAP
                    gsap.to({ value: 0 }, {
                        value: target,
                        duration: 2.5,
                        ease: 'power2.out',
                        onUpdate: function () {
                            const num = Math.round(this.targets()[0].value);
                            // Format with thousands separator
                            counter.textContent = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        },
                        onComplete: () => {
                            counter.classList.add('animated');
                        }
                    });
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
 * Global data (products and quiz questions loaded from JSON files)
 * See: assets/data/ for actual data
 */
window.dummyData = {
    // Data moved to separate JSON files for better performance and maintainability
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
    animateCounters(); // Animate stat counters on scroll
    initializeFooterNewsletter(); // Newsletter form handler

    console.log('✅ NileGuard Application Ready!');
}

/**
 * Handle footer newsletter signup form
 */
function initializeFooterNewsletter() {
    const form = document.getElementById('footerNewsletterForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailInput = form.querySelector('.footer-input');
        const email = emailInput.value.trim();

        // Basic email validation
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate form submission (in real app, send to backend)
        const submitBtn = form.querySelector('.footer-btn-submit');
        const originalContent = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '✓ Subscribed!';
        submitBtn.style.background = 'var(--success-green)';

        // Reset after 3 seconds
        setTimeout(() => {
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
        }, 3000);

        console.log('Newsletter signup:', email);
    });
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

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle window resize
window.addEventListener('resize', debounce(() => {
    console.log('Window resized');
}, 250));
