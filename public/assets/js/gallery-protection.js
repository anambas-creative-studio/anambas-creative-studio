// Gallery Preview Toggle and Protection
document.addEventListener('DOMContentLoaded', () => {
    const galleryToggleBtn = document.getElementById('gallery-toggle-btn');
    const galleryPreview = document.getElementById('gallery-preview');
    const galleryThumbnails = document.querySelectorAll('.gallery-thumbnail');

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

            // Smooth scroll to gallery if opening
            if (isActive) {
                setTimeout(() => {
                    galleryPreview.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 100);
            }
        });
    }

    // Handle Thumbnail Clicks - Open in New Tab
    galleryThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (e) => {
            e.preventDefault();
            const imageUrl = thumbnail.getAttribute('data-image');

            if (imageUrl) {
                // Open in new tab
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
        // Prevent right-click
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });

        // Prevent drag
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
            return false;
        });

        // Prevent selection
        img.addEventListener('selectstart', (e) => {
            e.preventDefault();
            return false;
        });
    });

    // Keyboard accessibility - Enter/Space to toggle
    if (galleryToggleBtn) {
        galleryToggleBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                galleryToggleBtn.click();
            }
        });
    }

    // Keyboard accessibility for thumbnails
    galleryThumbnails.forEach(thumbnail => {
        thumbnail.setAttribute('tabindex', '0');
        thumbnail.setAttribute('role', 'button');

        thumbnail.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                thumbnail.click();
            }
        });
    });
});
