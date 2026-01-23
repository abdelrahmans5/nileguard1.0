/**
 * Index/Home Page Script
 * ======================
 */

let vantaEffect = null;

/**
 * Initialize Vanta.js Waves effect on hero
 */
function initializeHeroVanta() {
    const hero = document.getElementById('hero');

    // Ensure dependencies exist
    if (!hero || !window.VANTA || !window.THREE) {
        return;
    }

    // Clean up previous instance if any
    if (vantaEffect && vantaEffect.destroy) {
        vantaEffect.destroy();
    }

    vantaEffect = window.VANTA.WAVES({
        el: hero,
        color: 0x0066cc,            // لون الأمواج (أزرق) - بصيغة hex
        shininess: 30,              // درجة اللمعان (0-100)
        waveHeight: 20,             // ارتفاع الأمواج (كلما زاد = أمواج أعلى)
        waveSpeed: 0.8,             // سرعة حركة الأمواج (0.5-2.0)
        zoom: 1.1,                  // تكبير/تصغير الكاميرا
        mouseControls: true,        // التحكم بالماوس (يتحرك مع مؤشر الفأرة)
        touchControls: true,        // التحكم باللمس (للموبايل)
        gyroControls: false,        // التحكم بالـ Gyroscope (حركة الموبايل)
        minHeight: 200.0,           // الحد الأدنى لارتفاع العنصر
        minWidth: 200.0,            // الحد الأدنى لعرض العنصر
        backgroundColor: 0x0a0e27   // لون الخلفية (أزرق غامق)
    });
}

/**
 * Initialize hero section animations
 */
function initializeHeroAnimations() {
    // Try Vanta waves effect; if not available fallback to static image
    if (window.VANTA && window.THREE) {
        initializeHeroVanta();
    } else {
        setHeroBackground('https://images.unsplash.com/photo-1716639154156-db53b75a22ad?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    }

    // Hero title animation intentionally removed for an immediate static load
}

/**
 * Initialize intro card animations
 */
function initializeIntroCards() {
    gsap.utils.toArray('.intro-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power3.out'
        });
    });
}

/**
 * Initialize mission card animations with floating effect
 */
function initializeMissionCards() {
    gsap.utils.toArray('.mission-card').forEach((card, index) => {
        // Entrance animation
        gsap.from(card, {
            scrollTrigger: {
                trigger: '.mission-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            scale: 0.8,
            y: 50,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'back.out'
        });

        // Floating animation
        gsap.timeline({ repeat: -1 })
            .to(card, {
                y: -15,
                duration: 2,
                ease: 'sine.inOut'
            })
            .to(card, {
                y: 0,
                duration: 2,
                ease: 'sine.inOut'
            });
    });
}

/**
 * Initialize CTA section animations
 */
function initializeCTAAnimations() {
    const ctaSection = document.querySelector('.cta-section');

    if (ctaSection) {
        gsap.from('.cta-content h2', {
            scrollTrigger: {
                trigger: '.cta-section',
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });

        gsap.from('.cta-content p', {
            scrollTrigger: {
                trigger: '.cta-section',
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out'
        });

    }
}

/**
 * Add button hover animations
 */
function initializeButtonAnimations() {
    document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', function () {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

/**
 * Initialize ripple effect on cards
 */
function initializeCardRipples() {
    document.querySelectorAll('.intro-card, .mission-card').forEach(card => {
        card.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.position = 'absolute';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.background = 'radial-gradient(circle, rgba(0,191,255,0.5), transparent)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            gsap.to(ripple, {
                scale: 4,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
                onComplete: () => ripple.remove()
            });
        });
    });
}

/**
 * Animate icon circles with pulse
 */
function initializeIconAnimations() {
    document.querySelectorAll('.icon-circle').forEach((icon, index) => {
        gsap.timeline({ repeat: -1 })
            .to(icon, {
                boxShadow: '0 0 20px rgba(0, 191, 255, 0.5)',
                duration: 1.5,
                ease: 'sine.inOut'
            })
            .to(icon, {
                boxShadow: '0 0 5px rgba(0, 191, 255, 0.2)',
                duration: 1.5,
                ease: 'sine.inOut'
            });
    });
}

/**
 * Animated SVG paths
 */
function initializeSVGAnimations() {
    document.querySelectorAll('.icon-svg path, .icon-svg circle').forEach(path => {
        const length = path.getTotalLength ? path.getTotalLength() : 0;

        if (length > 0) {
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;

            gsap.to(path, {
                scrollTrigger: {
                    trigger: path.closest('[class*="card"]') || path,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                strokeDashoffset: 0,
                duration: 1.5,
                ease: 'power2.out'
            });
        }
    });
}



/**
 * Scroll progress bar animation
 */
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #1E90FF, #00BFFF);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        progressBar.style.width = scrollPercent + '%';
    });
}

/**
 * Initialize partners marquee animation - TV Ticker Style
 * Continuous infinite scrolling like news ticker
 */
function initializePartnersMarquee() {
    const marqueeWrapper = document.querySelector('.marquee-wrapper');
    const marqueeContent = document.getElementById('marqueeContent');

    if (!marqueeContent || !marqueeWrapper) {
        console.warn('⚠️ Marquee elements not found');
        return;
    }

    // Mark the element to prevent double initialization
    if (marqueeContent.dataset.marqueeInitialized) {
        console.log('✅ Marquee already initialized');
        return;
    }

    marqueeContent.dataset.marqueeInitialized = 'true';

    // Get original cards count before cloning
    const originalCards = Array.from(marqueeContent.querySelectorAll('.partner-card'));

    if (originalCards.length === 0) {
        console.warn('⚠️ No partner cards found');
        return;
    }

    // Clone cards for seamless infinite loop
    originalCards.forEach(card => {
        marqueeContent.appendChild(card.cloneNode(true));
    });

    // Use setTimeout to ensure DOM layout is calculated before animation
    setTimeout(() => {
        const totalWidth = marqueeContent.scrollWidth;
        const halfWidth = totalWidth / 2;

        if (halfWidth === 0) {
            console.warn('⚠️ Marquee content width is 0');
            return;
        }

        // Kill any existing animations
        gsap.killTweensOf(marqueeContent);

        // TV ticker style animation - continuous, smooth scrolling
        gsap.to(marqueeContent, {
            x: -halfWidth,
            duration: 60,
            ease: 'none',
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => (parseFloat(x) % halfWidth))
            }
        });

        console.log('✅ Partners Marquee Running! Width:', halfWidth);
    }, 100);
}

/**
 * Initialize all home page animations
 */
function initializeHomePageAnimations() {
    console.log('🎬 Initializing Home Page Animations...');

    initializeHeroAnimations();
    initializeIntroCards();
    initializeMissionCards();
    initializeCTAAnimations();
    initializeButtonAnimations();
    initializeCardRipples();
    initializeIconAnimations();
    initializeSVGAnimations();
    initializeMouseFollowEffect();
    initializeScrollProgress();
    initializePartnersMarquee();

    console.log('✅ Home Page Animations Initialized!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHomePageAnimations);
} else {
    initializeHomePageAnimations();
}
