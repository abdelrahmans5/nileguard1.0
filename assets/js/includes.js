/**
 * Load Shared Includes (Navbar & Footer)
 * =====================================
 */

// Navbar HTML Template
const NAVBAR_HTML = `<nav class="navbar navbar-expand-lg fixed-top" id="navbar">
    <div class="navbar-container">
        <a class="navbar-brand" href="index.html">
            <img src="assets/img/bluefuture-logo.png" alt="Blue Future Logo" 
                style="height: 40px; margin-right: 10px;">
            <span class="brand-text">Blue Future</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="learn.html">Learn</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="community.html">Community</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="schools.html">For Schools</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="store.html">Shop</a>
                </li>
                <li class="nav-item nav-donate-btn">
                    <a class="nav-link" href="risk.html">Donate</a>
                </li>
            </ul>
        </div>
    </div>
</nav>`;

// Footer HTML Template
const FOOTER_HTML = `<footer class="footer" id="main-footer">
    <div class="footer-top">
        <div class="container">
            <div class="footer-main">
                <div class="footer-section footer-brand">
                    <div class="footer-logo">
                        <img src="assets/img/bluefuture-logo.png" alt="Blue Future Logo" class="logo-icon"
                            style="height: 40px; margin-right: 10px;">
                        <span class="logo-text">Blue Future</span>
                    </div>
                    <p class="footer-description">Protecting the Nile River and raising awareness about global water scarcity.</p>
                    <div class="footer-social">
                        <a href="https://facebook.com" class="social-link" title="Facebook" aria-label="Facebook" target="_blank">f</a>
                        <a href="https://twitter.com" class="social-link" title="Twitter" aria-label="Twitter" target="_blank">𝕏</a>
                        <a href="https://instagram.com" class="social-link" title="Instagram" aria-label="Instagram" target="_blank">📷</a>
                        <a href="https://linkedin.com" class="social-link" title="LinkedIn" aria-label="LinkedIn" target="_blank">in</a>
                    </div>
                </div>
                <div class="footer-section">
                    <h3 class="footer-title">Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="learn.html">Learn & Data</a></li>
                        <li><a href="community.html">Community</a></li>
                        <li><a href="store.html">Shop</a></li>
                        <li><a href="risk.html">Donate</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3 class="footer-title">Resources</h3>
                    <ul class="footer-links">
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#research">Research & Reports</a></li>
                        <li><a href="#materials">Educational Materials</a></li>
                        <li><a href="#partner">Partner With Us</a></li>
                        <li><a href="#privacy">Privacy Policy</a></li>
                    </ul>
                </div>
                <div class="footer-section footer-contact">
                    <h3 class="footer-title">Contact Us</h3>
                    <div class="contact-item">
                        <span class="contact-icon">📍</span>
                        <span>Cairo, Egypt</span>
                    </div>
                    <div class="contact-item">
                        <span class="contact-icon">✉️</span>
                        <a href="mailto:info@bluefuture.org">info@bluefuture.org</a>
                    </div>
                    <div class="contact-item">
                        <span class="contact-icon">📞</span>
                        <a href="tel:+201234567890">+20 123 456 7890</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <p class="footer-copyright">&copy; <span id="currentYear">2026</span> Blue Future. All rights reserved. Together for a water-secure future.</p>
            </div>
        </div>
    </div>
</footer>`;

/**
 * Load Navbar from HTML Template
 */
function loadNavbar() {
    try {
        // Remove existing navbar if any
        const existingNav = document.querySelector('nav.navbar');
        if (existingNav) {
            existingNav.remove();
        }

        // Insert navbar at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', NAVBAR_HTML);

        // Initialize navbar behaviors
        initNavbarBehaviors();

        console.log('✅ Navbar loaded successfully');
    } catch (error) {
        console.error('❌ Failed to load navbar:', error);
    }
}

/**
 * Initialize navbar behaviors (scroll effects, active link)
 */
function initNavbarBehaviors() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    if (!navbar) return;

    // Set current page as active
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Handle scroll effect
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Trigger scroll event to set initial state
    handleScroll();

    // Handle mobile menu collapse when link is clicked
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && typeof bootstrap !== 'undefined') {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                bsCollapse.hide();
            });
        });
    }
}

/**
 * Load Footer from HTML Template
 */
function loadFooter() {
    try {
        // Remove existing footer if any
        const existingFooter = document.querySelector('footer');
        if (existingFooter) {
            existingFooter.remove();
        }

        // Insert footer at the end of body
        document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

        // Update year
        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }

        console.log('✅ Footer loaded successfully');
    } catch (error) {
        console.error('❌ Failed to load footer:', error);
    }
}

// Load navbar and footer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadNavbar();
        loadFooter();
    });
} else {
    loadNavbar();
    loadFooter();
}

