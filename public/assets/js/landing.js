document.addEventListener('DOMContentLoaded', () => {

    // ========== 1. NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById('navbar');
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();


    // ========== 2. MOBILE MENU ==========
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('max-h-0', 'opacity-0');
                mobileMenu.classList.add('max-h-[500px]', 'opacity-100');
                mobileMenuIcon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                mobileMenu.classList.add('max-h-0', 'opacity-0');
                mobileMenu.classList.remove('max-h-[500px]', 'opacity-100');
                mobileMenuIcon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.add('max-h-0', 'opacity-0');
                mobileMenu.classList.remove('max-h-[500px]', 'opacity-100');
                mobileMenuIcon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }


    // ========== 3. SCROLL REVEAL ==========
    const revealElements = document.querySelectorAll('.reveal-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Respect animation-delay from inline styles
                const delay = entry.target.style.animationDelay || '0s';
                const delayMs = parseFloat(delay) * 1000;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delayMs);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));





    // ========== 5. SMOOTH SCROLL FOR NAV LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
