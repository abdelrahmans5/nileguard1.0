/**
 * Animation Module - Essential animations for Blue Future
 * ====================================================
 * Kept only the most commonly used animations to reduce bundle size
 */

/**
 * Hover lift animation for cards and buttons
 */
function addHoverLift(selector) {
    document.querySelectorAll(selector).forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(element, {
                y: -8,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

/**
 * Fade in and scale animation for sections on scroll
 */
function observeElementsOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.observe').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Create floating animation (for mission cards)
 */
function addFloatingAnimation(selector, distance = 20, duration = 3) {
    document.querySelectorAll(selector).forEach(element => {
        gsap.timeline({ repeat: -1 })
            .to(element, {
                y: -distance,
                duration: duration / 2,
                ease: 'sine.inOut'
            })
            .to(element, {
                y: 0,
                duration: duration / 2,
                ease: 'sine.inOut'
            });
    });
}

/**
 * Slide in animation
 */
function slideInAnimation(element, direction = 'left', distance = 100, duration = 0.6) {
    const fromProps = {};

    if (direction === 'left') fromProps.x = -distance;
    if (direction === 'right') fromProps.x = distance;
    if (direction === 'up') fromProps.y = distance;
    if (direction === 'down') fromProps.y = -distance;

    fromProps.opacity = 0;

    gsap.from(element, {
        ...fromProps,
        duration: duration,
        ease: 'power3.out'
    });
}

/**
 * Create stagger animation for multiple elements
 */
function staggerAnimation(elements, fromProps, toProps, staggerDelay = 0.1) {
    gsap.from(elements, {
        ...fromProps,
        stagger: staggerDelay,
        duration: 0.6
    });
}
