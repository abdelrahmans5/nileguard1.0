/**
 * Animation Module - Reusable animations across pages
 * ==================================================
 */

/**
 * Animate a sequence of elements with stagger effect
 */
function staggerAnimation(elements, fromProps, toProps, staggerDelay = 0.1) {
    gsap.from(elements, {
        ...fromProps,
        stagger: staggerDelay,
        duration: 0.6
    });
}

/**
 * Pulse animation for cards
 */
function createPulseAnimation(element) {
    gsap.timeline({ repeat: -1 })
        .to(element, {
            scale: 1.02,
            duration: 0.6,
            ease: 'sine.inOut'
        })
        .to(element, {
            scale: 1,
            duration: 0.6,
            ease: 'sine.inOut'
        });
}

/**
 * Bounce animation for buttons
 */
function createBounceAnimation(element) {
    gsap.from(element, {
        y: 0,
        yoyo: true,
        repeat: 1,
        duration: 0.3,
        ease: 'power2.out'
    });
}

/**
 * Shimmer animation for loading states
 */
function createShimmerAnimation(element) {
    gsap.timeline({ repeat: -1 })
        .to(element, {
            backgroundPosition: '200% 0',
            duration: 1.5,
            ease: 'linear'
        });
}

/**
 * Pop in animation with scale
 */
function popInAnimation(element, duration = 0.5) {
    gsap.from(element, {
        opacity: 0,
        scale: 0.5,
        duration: duration,
        ease: 'elastic.out(1, 0.5)'
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
 * Flip animation for cards
 */
function flipAnimation(element, duration = 0.6) {
    gsap.timeline()
        .to(element, {
            rotationY: 90,
            duration: duration / 2,
            ease: 'power2.inOut'
        })
        .to(element, {
            rotationY: 180,
            duration: duration / 2,
            ease: 'power2.inOut'
        }, 0);
}

/**
 * Glow effect animation
 */
function glowAnimation(element) {
    gsap.timeline({ repeat: -1 })
        .to(element, {
            boxShadow: '0 0 20px rgba(0, 191, 255, 0.8)',
            duration: 1,
            ease: 'sine.inOut'
        })
        .to(element, {
            boxShadow: '0 0 5px rgba(0, 191, 255, 0.3)',
            duration: 1,
            ease: 'sine.inOut'
        });
}

/**
 * Number counter animation
 */
function animateValue(element, start, end, duration = 2000) {
    const startValue = parseInt(start);
    const endValue = parseInt(end);
    const increment = (endValue - startValue) / (duration / 16);
    let currentValue = startValue;

    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= endValue) {
            element.textContent = endValue;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 16);
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
 * Hover lift animation
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
 * Create text reveal animation (letter by letter)
 */
function revealTextAnimation(element) {
    const text = element.textContent;
    element.textContent = '';
    element.classList.add('text-reveal');

    let delay = 0;
    for (let char of text) {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        element.appendChild(span);

        gsap.to(span, {
            opacity: 1,
            duration: 0.05,
            delay: delay
        });

        delay += 0.05;
    }
}

/**
 * Create progress bar animation
 */
function animateProgressBar(element, targetValue, duration = 2) {
    gsap.to(element, {
        width: targetValue + '%',
        duration: duration,
        ease: 'power2.out'
    });
}

/**
 * Create color transition animation
 */
function animateColorTransition(element, fromColor, toColor, duration = 1) {
    gsap.to(element, {
        backgroundColor: toColor,
        duration: duration,
        ease: 'power2.inOut'
    });
}

/**
 * Scroll parallax effect
 */
function createParallaxEffect(element, speed = 0.5) {
    gsap.to(element, {
        y: () => window.innerHeight * speed,
        scrollTrigger: {
            trigger: element,
            scrub: 1,
            start: 'top center',
            end: 'bottom center'
        }
    });
}

/**
 * Add ripple effect on click
 */
function addRippleEffect(selector) {
    document.querySelectorAll(selector).forEach(element => {
        element.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/**
 * Add scroll-triggered color change to navbar
 */
function animateNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        gsap.set(navbar, { backgroundColor: 'transparent' });

        ScrollTrigger.create({
            onUpdate: (self) => {
                if (self.getVelocity() > 500) {
                    gsap.to(navbar, {
                        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                        duration: 0.3
                    });
                } else if (self.getVelocity() < -500) {
                    gsap.to(navbar, {
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        duration: 0.3
                    });
                }
            }
        });
    }
}

/**
 * Create floating animation
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

// Export animations for use in other modules
window.NileGuardAnimations = {
    staggerAnimation,
    createPulseAnimation,
    createBounceAnimation,
    createShimmerAnimation,
    popInAnimation,
    slideInAnimation,
    flipAnimation,
    glowAnimation,
    animateValue,
    observeElementsOnScroll,
    addHoverLift,
    revealTextAnimation,
    animateProgressBar,
    animateColorTransition,
    createParallaxEffect,
    addRippleEffect,
    animateNavbarOnScroll,
    addFloatingAnimation
};
