document.addEventListener('DOMContentLoaded', function () {

    const menuBtn     = document.getElementById('menuBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    const iconsContainer = document.querySelector('.icons-container');
    const profileBtn = document.getElementById('profileBtn');
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');
    const rejectCookiesBtn = document.getElementById('rejectCookiesBtn');

    if (iconsContainer) {
        iconsContainer.style.backgroundColor = '#e8ede8';
    }

    function openMenu() {
        menuOverlay.classList.add('active');
        menuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuOverlay.classList.remove('active');
        menuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }

    function toggleMenu() {
        menuOverlay.classList.contains('active') ? closeMenu() : openMenu();
    }

    // Hamburger button
    if (menuBtn && menuOverlay) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    // Close hamburger menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!menuOverlay || !menuOverlay.classList.contains('active')) return;
        if (menuBtn && (menuBtn === e.target || menuBtn.contains(e.target))) return;
        if (menuOverlay.contains(e.target)) return;
        closeMenu();
    });

    // Close hamburger menu when clicking a nav link
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function (e) {
            const link = e.target && e.target.closest ? e.target.closest('a') : null;
            if (link) closeMenu();
        });
    }

    // Close with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
            closeMenu();
        }
    });

    // Image slider
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        const slideRight = document.querySelector('.right-slide');
        const upButton   = document.querySelector('.up-button');
        const downButton = document.querySelector('.down-button');
        const dots = document.querySelectorAll('.slider-dot');

        if (slideRight && upButton && downButton) {
            const slidesLength = slideRight.querySelectorAll('div').length;
            let activeSlideIndex = 0;

            function updateDots() {
                if (!dots.length) return;
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === activeSlideIndex);
                });
            }

            function changeSlide(direction) {
                const sliderHeight = sliderContainer.clientHeight;
                if (direction === 'up') {
                    activeSlideIndex = (activeSlideIndex + 1) % slidesLength;
                } else {
                    activeSlideIndex = (activeSlideIndex - 1 + slidesLength) % slidesLength;
                }
                slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
                updateDots();
            }

            upButton.addEventListener('click',   () => changeSlide('up'));
            downButton.addEventListener('click', () => changeSlide('down'));
            updateDots();
        }
    }

    // Profile icon navigation
    if (profileBtn) {
        profileBtn.addEventListener('click', function () {
            window.location.href = 'profile.html';
        });
    }

    // Cookie consent
    if (cookieBanner && acceptCookiesBtn && rejectCookiesBtn) {
        const cookieChoiceKey = 'cookieConsentChoice';
        const existingChoice = localStorage.getItem(cookieChoiceKey);

        if (!existingChoice) {
            cookieBanner.classList.add('show');
        }

        function saveCookieChoice(choice) {
            localStorage.setItem(cookieChoiceKey, choice);
            cookieBanner.classList.remove('show');
        }

        acceptCookiesBtn.addEventListener('click', function () {
            saveCookieChoice('accepted');
        });

        rejectCookiesBtn.addEventListener('click', function () {
            saveCookieChoice('rejected');
        });
    }

});
