// Gallery Carousel with Auto-Scroll and Protection
document.addEventListener('DOMContentLoaded', () => {
    const galleryToggleBtn = document.getElementById('gallery-toggle-btn');
    const galleryPreview = document.getElementById('gallery-preview');
    const carouselTrack = document.getElementById('carousel-track');
    const carouselNextBtn = document.getElementById('carousel-next-btn');
    const carouselIndicatorsContainer = document.getElementById('carousel-indicators');
    const galleryThumbnails = document.querySelectorAll('.gallery-thumbnail');

    let currentIndex = 0;
    let autoScrollInterval = null;
    const autoScrollDelay = 3000; // 3 seconds
    const thumbnailsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const totalThumbnails = galleryThumbnails.length;
    const totalSlides = Math.ceil(totalThumbnails / thumbnailsPerView);

    // Create Carousel Indicators
    function createIndicators() {
        if (!carouselIndicatorsContainer) return;

        carouselIndicatorsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            carouselIndicatorsContainer.appendChild(indicator);
        }
    }

    // Update Indicators
    function updateIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // Go to Specific Slide
    function goToSlide(index) {
        if (!carouselTrack) return;

        currentIndex = index;
        const thumbnailWidth = galleryThumbnails[0]?.offsetWidth || 280;
        const gap = window.innerWidth >= 1024 ? 32 : window.innerWidth >= 640 ? 28 : 24;
        const slideWidth = (thumbnailWidth + gap) * thumbnailsPerView;
        const offset = -slideWidth * currentIndex;

        carouselTrack.style.transform = `translateX(${offset}px)`;
        updateIndicators();
    }

    // Next Slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    }

    // Start Auto-Scroll
    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(nextSlide, autoScrollDelay);
    }

    // Stop Auto-Scroll
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    // Toggle Gallery Visibility
    if (galleryToggleBtn && galleryPreview) {
        galleryToggleBtn.addEventListener('click', () => {
            const isActive = galleryPreview.classList.toggle('active');
            galleryToggleBtn.classList.toggle('active', isActive);

            // Update button text
            const buttonText = galleryToggleBtn.querySelector('span');
            if (buttonText) {
                buttonText.textContent = isActive ? 'Close Gallery' : 'Gallery';
            }

            // Start/Stop auto-scroll
            if (isActive) {
                createIndicators();
                goToSlide(0);
                startAutoScroll();

                setTimeout(() => {
                    galleryPreview.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 100);
            } else {
                stopAutoScroll();
            }
        });
    }

    // Next Button Click
    if (carouselNextBtn) {
        carouselNextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoScroll(); // Stop auto-scroll when user manually navigates
            setTimeout(startAutoScroll, 5000); // Resume after 5 seconds
        });
    }

    // Handle Thumbnail Clicks - Open in New Tab
    galleryThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (e) => {
            e.preventDefault();
            const imageUrl = thumbnail.getAttribute('data-image');

            if (imageUrl) {
                window.open(imageUrl, '_blank', 'noopener,noreferrer');
            }
        });

        // Prevent context menu (right-click)
        thumbnail.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });

        // Prevent drag start
        thumbnail.addEventListener('dragstart', (e) => {
            e.preventDefault();
            return false;
        });

        // Pause auto-scroll on hover
        thumbnail.addEventListener('mouseenter', stopAutoScroll);
        thumbnail.addEventListener('mouseleave', startAutoScroll);
    });

    // Additional anti-download protection for images
    const galleryImages = document.querySelectorAll('.gallery-thumbnail img');
    galleryImages.forEach(img => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });

        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
            return false;
        });

        img.addEventListener('selectstart', (e) => {
            e.preventDefault();
            return false;
        });
    });

    // Keyboard accessibility
    if (galleryToggleBtn) {
        galleryToggleBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                galleryToggleBtn.click();
            }
        });
    }

    // Responsive: Recalculate on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (galleryPreview.classList.contains('active')) {
                createIndicators();
                goToSlide(currentIndex);
            }
        }, 250);
    });
});
