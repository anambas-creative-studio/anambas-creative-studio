// Gallery Carousel with Manual Navigation (Prev/Next) and Protection
document.addEventListener('DOMContentLoaded', () => {
    const galleryToggleBtn = document.getElementById('gallery-toggle-btn');
    const galleryPreview = document.getElementById('gallery-preview');
    const carouselTrack = document.getElementById('carousel-track');
    const carouselPrevBtn = document.getElementById('carousel-prev-btn');
    const carouselNextBtn = document.getElementById('carousel-next-btn');
    const carouselIndicatorsContainer = document.getElementById('carousel-indicators');
    const galleryThumbnails = document.querySelectorAll('.gallery-thumbnail');

    let currentIndex = 0;
    const thumbnailsPerView = window.innerWidth >= 1024 ? 6 : window.innerWidth >= 640 ? 4 : 3;
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

    // Update Button States
    function updateButtonStates() {
        if (carouselPrevBtn) {
            carouselPrevBtn.disabled = currentIndex === 0;
        }

        if (carouselNextBtn) {
            carouselNextBtn.disabled = currentIndex === totalSlides - 1;
        }
    }

    // Go to Specific Slide
    function goToSlide(index) {
        if (!carouselTrack) return;

        currentIndex = index;
        const thumbnailWidth = galleryThumbnails[0]?.offsetWidth || 120;
        const gap = window.innerWidth >= 1024 ? 32 : window.innerWidth >= 640 ? 28 : 24;
        const slideWidth = (thumbnailWidth + gap) * thumbnailsPerView;
        const offset = -slideWidth * currentIndex;

        carouselTrack.style.transform = `translateX(${offset}px)`;
        updateIndicators();
        updateButtonStates();
    }

    // Next Slide
    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            goToSlide(currentIndex);
        }
    }

    // Previous Slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            goToSlide(currentIndex);
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

            if (isActive) {
                createIndicators();
                goToSlide(0);

                setTimeout(() => {
                    galleryPreview.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 100);
            }
        });
    }

    // Prev Button Click
    if (carouselPrevBtn) {
        carouselPrevBtn.addEventListener('click', prevSlide);
    }

    // Next Button Click
    if (carouselNextBtn) {
        carouselNextBtn.addEventListener('click', nextSlide);
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

    // Keyboard navigation (Arrow keys)
    document.addEventListener('keydown', (e) => {
        if (galleryPreview.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        }
    });

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
