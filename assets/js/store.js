/**
 * Shop/Store Page Script
 * ======================
 */

let cart = [];
let productsData = [];

/**
 * Load product data from JSON (fallback to dummy data)
 */
async function loadProductsData() {
    if (Array.isArray(window.storeProducts) && window.storeProducts.length) {
        productsData = window.storeProducts;
        console.log('✅ Loaded products from inline data', productsData);
        return productsData;
    }

    try {
        const response = await fetch('assets/data/store-products.json', { cache: 'no-cache' });
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Invalid product payload');
        productsData = data;
        console.log('✅ Loaded products from JSON', productsData);
        return productsData;
    } catch (error) {
        console.warn('⚠️ Using fallback dummy products:', error);
        productsData = window.dummyData?.products || [];
        return productsData;
    }
}

/**
 * Initialize product grid
 */
function initializeProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    const featuredSlider = document.getElementById('featuredSlider');

    if (!productsGrid) return;

    products = products || window.dummyData.products;

    // Create product cards
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);

        productCard.innerHTML = `
            <div class="product-image" style="font-size: 3rem;">
                ${product.icon}
            </div>
            <div class="product-content">
                <div class="product-title">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-water-savings">
                    <p>💧 Saves <span class="water-saved-amount">${formatNumber(product.waterSaved)}</span> L/year</p>
                    ${product.source ? `<p class="product-source">Source: ${product.source}</p>` : ''}
                </div>
                <div class="product-footer">
                    <div class="product-price">$${product.price}</div>
                    <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;

        productsGrid.appendChild(productCard);

        // Add to cart functionality
        productCard.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(product, e.currentTarget);
        });
    });

    // Create featured slider
    if (featuredSlider) {
        const featured = products.slice(0, 4);
        featured.forEach(product => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="product-card">
                    <div class="product-image" style="font-size: 3rem;">
                        ${product.icon}
                    </div>
                    <div class="product-content">
                        <div class="product-title">${product.name}</div>
                        <div class="product-description">${product.description}</div>
                        <div class="product-water-savings">
                            <p>💧 Saves <span class="water-saved-amount">${formatNumber(product.waterSaved)}</span> L/year</p>
                            ${product.source ? `<p class="product-source">Source: ${product.source}</p>` : ''}
                        </div>
                        <div class="product-footer">
                            <div class="product-price">$${product.price}</div>
                            <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
            featuredSlider.appendChild(slide);

            slide.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
                e.preventDefault();
                addToCart(product, e.currentTarget);
            });
        });

        // Initialize Swiper
        new Swiper('.featured-swiper', {
            slidesPerView: 'auto',
            centeredSlides: false,
            spaceBetween: 20,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                }
            }
        });
    }

    console.log('✅ Products initialized');
}

/**
 * Add product to cart
 */
function addToCart(product, buttonEl) {
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    // Save to localStorage
    localStorage.setItem('nileguard_cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();

    // Animate button
    if (buttonEl) {
        buttonEl.style.background = 'var(--success-green)';
        buttonEl.textContent = '✅ Added!';

        setTimeout(() => {
            buttonEl.style.background = 'linear-gradient(135deg, var(--primary-blue), var(--primary-aqua))';
            buttonEl.textContent = 'Add to Cart';
        }, 1000);
    }

    // Show notification
    showNotification(`${product.name} added to cart!`);
}

/**
 * Remove product from cart
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('nileguard_cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
    showNotification('Item removed from cart');
}

/**
 * Update cart item quantity
 */
function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        localStorage.setItem('nileguard_cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay();
    }
}

/**
 * Update cart display in sidebar
 */
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const totalItems = document.getElementById('totalItems');
    const totalWaterSaved = document.getElementById('totalWaterSaved');
    const navCartBadge = document.getElementById('navCartBadge');

    if (!cartItems) return;

    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Your cart is empty 💧</div>';
        totalItems.textContent = '0';
        totalWaterSaved.textContent = '0';
        if (navCartBadge) navCartBadge.textContent = '0';
        return;
    }

    let totalWater = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-icon">${item.icon}</div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="decreaseQty(${item.id})">−</button>
                    <span style="margin: 0 0.5rem;">${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQty(${item.id})">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
        totalWater += item.waterSaved * item.quantity;
    });

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    totalItems.textContent = itemCount;
    totalWaterSaved.textContent = formatNumber(totalWater);
    if (navCartBadge) navCartBadge.textContent = itemCount;
}

/**
 * Increase quantity
 */
function increaseQty(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        updateCartQuantity(productId, item.quantity + 1);
    }
}

/**
 * Decrease quantity
 */
function decreaseQty(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        updateCartQuantity(productId, item.quantity - 1);
    }
}

/**
 * Toggle cart sidebar
 */
function toggleCartSidebar(show) {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');

    if (!cartSidebar) return;

    if (show) {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
    } else {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
    }
}

/**
 * Initialize cart functionality
 */
function initializeCart() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('nileguard_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            console.error('Error loading cart:', e);
        }
    }

    updateCartDisplay();

    // Cart button in navbar
    const navCartBtn = document.getElementById('navCartBtn');
    if (navCartBtn) {
        navCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleCartSidebar(true);
        });
    }

    // Close cart button
    const closeBtn = document.querySelector('.close-cart');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => toggleCartSidebar(false));
    }

    // Cart overlay click to close
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => toggleCartSidebar(false));
    }

    console.log('✅ Cart initialized');
}

/**
 * Initialize product filters
 */
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Filter products
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    gsap.to(card, {
                        opacity: 1,
                        display: 'block',
                        duration: 0.3
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        display: 'none',
                        duration: 0.3
                    });
                }
            });
        });
    });
}

/**
 * Show notification toast
 */
function showNotification(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--success-green), #00cc00);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 600;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    gsap.from(toast, {
        y: 100,
        opacity: 0,
        duration: 0.3,
        ease: 'back.out'
    });

    setTimeout(() => {
        gsap.to(toast, {
            y: 100,
            opacity: 0,
            duration: 0.3,
            ease: 'back.in',
            onComplete: () => toast.remove()
        });
    }, 3000);
}

/**
 * Initialize checkout process
 */
function initializeCheckout() {
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('Your cart is empty!');
                return;
            }

            showNotification(`Proceeding to checkout with ${cart.length} item(s)...`);

            // Simulate checkout process
            setTimeout(() => {
                showNotification('✅ Order placed successfully! Thank you for helping protect our water! 💧');
                cart = [];
                localStorage.setItem('nileguard_cart', JSON.stringify(cart));
                updateCartCount();
                updateCartDisplay();
                toggleCartSidebar(false);
            }, 2000);
        });
    }
}

/**
 * Initialize navbar scroll styling for shop page
 */
function initializeShopNavbarScroll() {
    const navbar = document.getElementById('navbar');

    if (!navbar) return;

    // Handle scroll events to update navbar style
    const handleNavbarScroll = () => {
        if (window.pageYOffset > 50) {
            // Add scrolled class when scrolled down
            if (!navbar.classList.contains('scrolled')) {
                navbar.classList.add('scrolled');
            }
        } else {
            // Remove scrolled class when at top
            if (navbar.classList.contains('scrolled')) {
                navbar.classList.remove('scrolled');
            }
        }
    };

    // Listen to scroll events
    window.addEventListener('scroll', handleNavbarScroll);

    // Initial check in case page loads with scroll position
    handleNavbarScroll();

    console.log('✅ Shop Navbar Scroll Handler Initialized');
}

/**
 * Initialize Store Page
 */
async function initializeStorePage() {
    console.log('🛒 Initializing Store Page...');

    const products = await loadProductsData();
    initializeProducts(products);
    initializeCart();
    initializeFilters();
    initializeCheckout();
    initializeShopNavbarScroll();

    console.log('✅ Store Page Initialized!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeStorePage);
} else {
    initializeStorePage();
}
