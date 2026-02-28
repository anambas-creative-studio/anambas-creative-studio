// JS for the Tab System & Sticky Nav
const stickyWrapper = document.getElementById('stickyNavWrapper');
const inpageToggleBtn = document.getElementById('inpageToggleBtn');
const inpageNavMenu = document.getElementById('inpageNavMenu');

// Tab Script
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Hapus kelas aktif dari semua tab button dan tab pane
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        // Tambahkan kelas aktif ke yang diklik
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');

        // Tutup menu mobile jika dibuka
        if (inpageNavMenu && inpageNavMenu.classList.contains('show')) {
            inpageNavMenu.classList.remove('show');

            if (inpageToggleBtn) {
                const icon = inpageToggleBtn.querySelector('i');

                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
});

// Contact Panel Dropdown Script
const contactTriggerBtn = document.getElementById('contactTriggerBtn');
const contactDropdown = document.getElementById('contactDropdown');

if (contactTriggerBtn && contactDropdown) {
    contactTriggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        contactDropdown.classList.toggle('show');
        contactTriggerBtn.classList.toggle('active');
    });

    // Close contact panel clicking outside
    document.addEventListener('click', (e) => {
        if (!contactDropdown.contains(e.target) && !contactTriggerBtn.contains(e.target)) {
            contactDropdown.classList.remove('show');
            contactTriggerBtn.classList.remove('active');
        }
    });
}

// Toggle mobile menu visibility
if (inpageToggleBtn && inpageNavMenu) {
    inpageToggleBtn.addEventListener('click', () => {
        inpageNavMenu.classList.toggle('show');
        const icon = inpageToggleBtn.querySelector('i');

        if (icon) {
            if (inpageNavMenu.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    });
}
// Intersection Observer to detect when the wrapper sticks to the top
if (stickyWrapper) {
    const observer = new IntersectionObserver(([e]) => {
        e.target.classList.toggle('is-sticky', e.intersectionRatio < 1)
    }

        ,
        {
            threshold: [1]
        });

    observer.observe(stickyWrapper);
}