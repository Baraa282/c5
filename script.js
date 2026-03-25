// Simple interactivity for header buttons
document.addEventListener('DOMContentLoaded', function() {
    // Cookie consent banner
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');
    const cookieRejectBtn = document.getElementById('cookieRejectBtn');
    const cookieConsentKey = 'cookieConsent';

    function setCookieConsent(value) {
        try {
            localStorage.setItem(cookieConsentKey, value);
        } catch (e) {
            // Ignore storage errors (e.g., private mode restrictions)
        }
    }

    function getCookieConsent() {
        try {
            return localStorage.getItem(cookieConsentKey);
        } catch (e) {
            return null;
        }
    }

    function hideCookieBanner() {
        if (cookieBanner) cookieBanner.classList.remove('is-visible');
    }

    function showCookieBanner() {
        if (cookieBanner) cookieBanner.classList.add('is-visible');
    }

    if (cookieBanner && cookieAcceptBtn && cookieRejectBtn) {
        const existingConsent = getCookieConsent();
        if (!existingConsent) {
            showCookieBanner();
        }

        cookieAcceptBtn.addEventListener('click', function() {
            setCookieConsent('accepted');
            hideCookieBanner();
        });

        cookieRejectBtn.addEventListener('click', function() {
            setCookieConsent('rejected');
            hideCookieBanner();
        });
    }

    const profileBtn = document.getElementById('profileBtn');
    const wishlistBtn = document.getElementById('wishlistBtn');
    const cartBtn = document.getElementById('cartBtn');
    const menuBtn = document.getElementById('menuBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    const iconsContainer = document.querySelector('.icons-container');
    
    // Ensure icons container background color is always correct
    if (iconsContainer) {
        iconsContainer.style.backgroundColor = '#f5f0eb';
    }

    // Ensure menu button styling is always correct
    if (menuBtn) {
        menuBtn.style.border = '1px solid #D9D3C6';
        menuBtn.style.borderRadius = '8px';
        menuBtn.style.backgroundColor = '#f5f0eb';
    }

    // Menu button functionality - open/close menu
    menuBtn.addEventListener('click', function() {
        if (menuOverlay.classList.contains('active')) {
            closeMenu();
        } else {
        menuOverlay.classList.add('active');
            menuBtn.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    });

    // Products link - close menu and scroll to products section
    const productsLink = document.querySelector('a[href="#products"]');
    if (productsLink) {
        productsLink.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
            // Wait for menu to close, then scroll
            setTimeout(() => {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        });
    }

    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            closeMenu();
        }
    });

    // Profile button functionality
    if (profileBtn) {
        profileBtn.addEventListener('click', function() {
            // Redirect to login page
            window.location.href = 'login/index.html';
        });
    }

    // Wishlist button functionality
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            // Add your wishlist functionality here
            console.log('Wishlist clicked');
            // You can add a wishlist modal or redirect to wishlist page
        });
    }

    // Cart button functionality
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            // Add your cart functionality here
            console.log('Cart clicked');
            // You can add a cart modal or redirect to cart page
        });
    }

    // Function to close menu
    function closeMenu() {
        menuOverlay.classList.remove('active');
        menuBtn.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Split Slider functionality
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        const slideRight = document.querySelector('.right-slide');
        const slideLeft = document.querySelector('.left-slide');
        const upButton = document.querySelector('.up-button');
        const downButton = document.querySelector('.down-button');

        if (slideRight && slideLeft && upButton && downButton) {
            const slidesLength = slideRight.querySelectorAll('div').length;
            let activeSlideIndex = 0;

            slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`;

            const changeSlide = (direction) => {
                const sliderHeight = sliderContainer.clientHeight;
                
                if (direction === 'up') {
                    activeSlideIndex++;
                    if (activeSlideIndex > slidesLength - 1) {
                        activeSlideIndex = 0;
                    }
                } else if (direction === 'down') {
                    activeSlideIndex--;
                    if (activeSlideIndex < 0) {
                        activeSlideIndex = slidesLength - 1;
                    }
                }

                slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
                slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
            };

            upButton.addEventListener('click', () => changeSlide('up'));
            downButton.addEventListener('click', () => changeSlide('down'));
        }
    }

    // Initialize products visibility
    const products = document.querySelectorAll('.product');
    if (products.length > 0) {
        products.forEach(product => {
            gsap.set(product, { autoAlpha: 1, scale: 1 });
        });
    }

    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering product hover effects
            this.classList.toggle('active');
            
            // Get product name from the product card
            const productCard = this.closest('.product');
            const productName = productCard.querySelector('h3').textContent;
            
            if (this.classList.contains('active')) {
                console.log(`Added ${productName} to wishlist`);
                // You can add wishlist functionality here (e.g., add to localStorage, send to server, etc.)
            } else {
                console.log(`Removed ${productName} from wishlist`);
                // You can add remove from wishlist functionality here
            }
        });
    });
});

