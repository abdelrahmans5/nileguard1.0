/**
 * Load Shared Includes (Navbar & Footer)
 * =====================================
 */

function loadFooter() {
    // Create footer directly if fetch fails
    const footerHTML = `<!-- Footer - Professional Design -->
<footer class="footer" id="main-footer">
    <div class="footer-top">
        <div class="container">
            <!-- Main Footer Content - 4 Columns -->
            <div class="footer-main">
                <!-- Column 1: Brand & Social -->
                <div class="footer-section footer-brand">
                    <div class="footer-logo">
                        <span class="logo-icon">💧</span>
                        <span class="logo-text">NileGuard</span>
                    </div>
                    <p class="footer-description">Protecting the Nile River and raising awareness about global water scarcity.</p>
                    <div class="footer-social">
                        <a href="https://facebook.com" class="social-link" title="Facebook" target="_blank">f</a>
                        <a href="https://twitter.com" class="social-link" title="Twitter" target="_blank">𝕏</a>
                        <a href="https://instagram.com" class="social-link" title="Instagram" target="_blank">📷</a>
                        <a href="https://linkedin.com" class="social-link" title="LinkedIn" target="_blank">in</a>
                    </div>
                </div>
                <!-- Column 2: Quick Links -->
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
                <!-- Column 3: Resources -->
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
                <!-- Column 4: Contact Us -->
                <div class="footer-section footer-contact">
                    <h3 class="footer-title">Contact Us</h3>
                    <div class="contact-item">
                        <span class="contact-icon">📍</span>
                        <span>Cairo, Egypt</span>
                    </div>
                    <div class="contact-item">
                        <span class="contact-icon">✉️</span>
                        <a href="mailto:info@nileguard.org">info@nileguard.org</a>
                    </div>
                    <div class="contact-item">
                        <span class="contact-icon">📞</span>
                        <a href="tel:+201234567890">+20 123 456 7890</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer Bottom -->
        <div class="footer-bottom">
            <div class="container">
                <p class="footer-copyright">&copy; <span id="currentYear">2026</span> NileGuard. All rights reserved. Together for a water-secure future.</p>
            </div>
        </div>
    </div>
</footer>`;

    // Remove existing footer if any
    const existingFooter = document.querySelector('footer');
    if (existingFooter) {
        existingFooter.remove();
    }

    // Create a temporary div to hold the footer HTML
    const temp = document.createElement('div');
    temp.innerHTML = footerHTML;

    // Get the footer element
    const footerElement = temp.querySelector('footer');

    if (footerElement) {
        // Append to body
        document.body.appendChild(footerElement);

        // Update year
        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }
}

// Load footer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    loadFooter();
}

