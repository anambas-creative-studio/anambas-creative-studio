
// Data for Workflows
const WORKFLOWS = {
    graphic: [
        { title: "Diskusi & Briefing", description: "Memahami kebutuhan dan tujuan visual Anda." },
        { title: "Riset Konsep", description: "Menentukan arah gaya, warna, dan mood." },
        { title: "Proses Desain", description: "Mengubah ide menjadi draft visual nyata." },
        { title: "Pengecekan Kualitas", description: "Memastikan tidak ada typo dan elemen yang salah." },
        { title: "Revisi & Finalisasi", description: "Penyempurnaan detail sesuai masukan Anda." },
        { title: "Serah Terima File", description: "Pengiriman seluruh file master siap pakai." },
    ],
    video: [
        { title: "Seleksi Materi", description: "Memilih footage terbaik untuk dirangkai." },
        { title: "Penyusunan Cerita", description: "Menata alur video agar pesan tersampaikan." },
        { title: "Visual & Warna", description: "Memperindah tampilan agar terlihat sinematik." },
        { title: "Musik & Suara", description: "Menambahkan audio agar suasana lebih hidup." },
        { title: "Teks & Grafis", description: "Menambahkan judul dan elemen pendukung." },
        { title: "Final Rendering", description: "Proses akhir menjadikan video siap tayang." },
    ],
    ai: [
        { title: "Pengembangan Cerita", description: "Merancang naskah dan alur adegan." },
        { title: "Penciptaan Karakter", description: "Mendesain tokoh dan dunia visual 3D." },
        { title: "Produksi Visual", description: "Mewujudkan imajinasi menjadi video nyata." },
        { title: "Pengisian Suara", description: "Menghidupkan karakter dengan suara dan musik." },
        { title: "Penyatuan Elemen", description: "Menggabungkan visual dan audio menjadi utuh." },
        { title: "Hasil Akhir HD", description: "Video resolusi tinggi siap untuk publikasi." },
    ]
};

// Data for SOP
const SOP_ITEMS = [
    {
        title: "Sistem Pembayaran",
        content: "Satuan: Full Payment di awal (< Rp 500rb) atau DP 50% (> Rp 500rb). Paket Bulanan: Lunas di awal kontrak."
    },
    {
        title: "Kebijakan Revisi",
        content: "Maksimal revisi minor sesuai paket. Ganti konsep total dihitung sebagai project baru (Charge 50-100%)."
    },
    {
        title: "Waktu Pengerjaan",
        content: "Standar 1-2 hari kerja. Urgent (Express < 24 jam) dikenakan biaya tambahan +50%."
    },
    {
        title: "File Mentah (Source File)",
        content: "Harga tidak termasuk file mentah (.PSD/.AI/Project File). Biaya tebus file mentah: Rp 100.000 - Rp 200.000 per file. File disimpan di server ACS maksimal 7 hari."
    }
];

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Populate Workflows ---
    function renderWorkflow(type, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const steps = WORKFLOWS[type];
        const total = steps.length;

        container.innerHTML = steps.map((step, index) => `
            <div class="relative flex flex-col items-center text-center p-4">
                <div class="w-10 h-10 rounded-full bg-slate-800 border border-brand-blue text-brand-blue flex items-center justify-center font-bold mb-3 shadow-[0_0_15px_rgba(59,130,246,0.3)] z-10 relative">
                  ${index + 1}
                </div>
                <!-- Connector Line (Desktop) -->
                ${index < total - 1 ? `<div class="hidden md:block absolute top-[2.25rem] left-1/2 w-full h-[2px] bg-slate-800 -z-0"></div>` : ''}
                <!-- Connector Line (Mobile) -->
                ${index < total - 1 ? `<div class="md:hidden absolute top-10 left-1/2 h-full w-[2px] bg-slate-800 -z-0"></div>` : ''}

                <h4 class="text-white font-bold mb-1">${step.title}</h4>
                <p class="text-sm text-slate-400 leading-relaxed">${step.description}</p>
            </div>
        `).join('');
    }

    renderWorkflow('graphic', 'workflow-graphic');
    renderWorkflow('video', 'workflow-video');
    renderWorkflow('ai', 'workflow-ai');


    // --- 2. Populate SOP ---
    const sopContainer = document.getElementById('sop-container');
    if (sopContainer) {
        sopContainer.innerHTML = SOP_ITEMS.map((item, index) => `
            <div class="border border-slate-800 rounded-lg bg-slate-900/50 overflow-hidden sop-item">
                <button
                  class="w-full flex justify-between items-center p-4 text-left focus:outline-none hover:bg-slate-800/50 transition sop-toggle"
                  data-index="${index}"
                >
                  <span class="font-bold text-white">${item.title}</span>
                  <i class="fa-solid fa-chevron-down transition-transform duration-300 icon-arrow text-slate-500"></i>
                </button>
                <div 
                  class="px-4 text-slate-400 text-sm leading-relaxed overflow-hidden transition-all duration-300 max-h-0 opacity-0 sop-content"
                  id="sop-content-${index}"
                >
                  <div class="pb-4">${item.content}</div>
                </div>
            </div>
        `).join('');

        // SOP Accordion Logic
        document.querySelectorAll('.sop-toggle').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                const content = document.getElementById(`sop-content-${index}`);
                const icon = button.querySelector('.icon-arrow');
                const isOpen = content.classList.contains('max-h-0');

                // Close all others (optional - acts like accordion)
                document.querySelectorAll('.sop-content').forEach(c => {
                    c.classList.add('max-h-0', 'opacity-0');
                });
                document.querySelectorAll('.icon-arrow').forEach(i => {
                    i.classList.remove('rotate-180', 'text-brand-blue');
                    i.classList.add('text-slate-500');
                });

                if (isOpen) {
                    content.classList.remove('max-h-0', 'opacity-0');
                    content.style.maxHeight = content.scrollHeight + "px"; // Dynamic height
                    icon.classList.add('rotate-180', 'text-brand-blue');
                    icon.classList.remove('text-slate-500');
                } else {
                    // Already closed by "Close all others" above
                }
            });
        });
    }

    // --- 3. Pricing Tabs Logic ---
    const pricingTabButtons = document.querySelectorAll('.pricing-tab-btn');
    const pricingTabContents = document.querySelectorAll('.pricing-content');

    pricingTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');

            // Update Buttons
            pricingTabButtons.forEach(b => {
                if (b.getAttribute('data-tab') === target) {
                    b.className = "pricing-tab-btn flex items-center gap-2 px-6 py-3 rounded-full font-bold transition duration-300 bg-brand-blue text-white shadow-lg shadow-brand-blue/30 scale-105";
                } else {
                    b.className = "pricing-tab-btn flex items-center gap-2 px-6 py-3 rounded-full font-bold transition duration-300 bg-slate-800 text-slate-400 hover:bg-slate-700";
                }
            });

            // Update Content
            pricingTabContents.forEach(content => {
                if (content.id === `pricing-${target}`) {
                    content.classList.remove('hidden');
                    // Trigger animation restart
                    content.classList.remove('animate-fade-in');
                    void content.offsetWidth; // trigger reflow
                    content.classList.add('animate-fade-in');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });

    // --- 4. Workflow Tabs Logic ---
    const workflowTabButtons = document.querySelectorAll('.workflow-tab-btn');
    const workflowTabContents = document.querySelectorAll('.workflow-content');

    workflowTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');

            // Update Buttons
            workflowTabButtons.forEach(b => {
                if (b.getAttribute('data-tab') === target) {
                    b.className = "workflow-tab-btn flex items-center gap-2 px-6 py-3 rounded-full font-bold transition duration-300 bg-brand-blue text-white shadow-lg shadow-brand-blue/30 scale-105";
                } else {
                    b.className = "workflow-tab-btn flex items-center gap-2 px-6 py-3 rounded-full font-bold transition duration-300 bg-slate-800 text-slate-400 hover:bg-slate-700";
                }
            });

            // Update Content
            workflowTabContents.forEach(content => {
                if (content.id === `workflow-content-${target}`) {
                    content.classList.remove('hidden');
                    // Trigger animation restart
                    content.classList.remove('animate-fade-in');
                    void content.offsetWidth; // trigger reflow
                    content.classList.add('animate-fade-in');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });

    // --- 5. Service Toggle Logic with Enhanced Animations ---
    const serviceToggleButtons = document.querySelectorAll('.service-toggle-btn');
    const serviceContents = document.querySelectorAll('.service-content');

    serviceToggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-service');
            const targetContent = document.getElementById(`service-${target}`);
            const isVisible = targetContent.style.display === 'block' || targetContent.classList.contains('show');

            // Toggle behavior: if already open, close it. Otherwise, open it.
            if (isVisible) {
                // Close it with animation
                targetContent.classList.remove('show');
                targetContent.classList.add('hide');
                btn.classList.remove('active');

                // Wait for animation to finish before hiding
                setTimeout(() => {
                    targetContent.style.display = 'none';
                    targetContent.classList.remove('hide');
                }, 500); // Match animation duration
            } else {
                // Remove active state from all buttons
                serviceToggleButtons.forEach(b => b.classList.remove('active'));

                // Close all others first with animation
                serviceContents.forEach(content => {
                    if (content.style.display === 'block' || content.classList.contains('show')) {
                        content.classList.remove('show');
                        content.classList.add('hide');
                        setTimeout(() => {
                            content.style.display = 'none';
                            content.classList.remove('hide');
                        }, 500);
                    }
                });

                // Open the clicked one with animation
                setTimeout(() => {
                    targetContent.style.display = 'block';
                    // Force reflow to ensure animation triggers
                    void targetContent.offsetWidth;
                    targetContent.classList.add('show');
                    btn.classList.add('active');

                    // Smooth scroll to the content after animation starts
                    setTimeout(() => {
                        targetContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 200);
                }, 550); // Slight delay to let others close first
            }
        });
    });

    // --- 6. Populate Pricing for Each Service ---
    function renderPricingCards(service, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let html = '';

        if (service === 'graphic') {
            html = `
                <!-- Digital -->
                <div class="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-brand-blue/50 transition duration-300">
                    <h4 class="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Konten Digital</h4>
                    <ul class="space-y-4">
                        <li class="flex justify-between items-start">
                            <span>Desain Feed/Story</span>
                            <span class="font-bold text-brand-blue">Rp 150.000</span>
                        </li>
                        <li class="flex justify-between items-start">
                            <span>Carousel (5 Slide)</span>
                            <span class="font-bold text-brand-blue">Rp 350.000</span>
                        </li>
                        <li class="flex justify-between items-start">
                            <span>Thumbnail Video</span>
                            <span class="font-bold text-brand-blue">Rp 100.000</span>
                        </li>
                    </ul>
                    <p class="mt-4 text-xs text-slate-500">*Output JPG/PNG. Max 3x Revisi.</p>
                </div>

                <!-- Print -->
                <div class="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-brand-blue/50 transition duration-300">
                    <h4 class="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Cetak & Event</h4>
                    <ul class="space-y-4">
                        <li class="flex justify-between items-start">
                            <span>Poster Event</span>
                            <span class="font-bold text-brand-blue">Rp 250.000</span>
                        </li>
                        <li class="flex justify-between items-start">
                            <span>Banner/Spanduk</span>
                            <span class="font-bold text-brand-blue">Rp 300.000</span>
                        </li>
                        <li class="flex justify-between items-start">
                            <span>Merchandise</span>
                            <span class="font-bold text-brand-blue">Rp 200.000</span>
                        </li>
                    </ul>
                    <p class="mt-4 text-xs text-slate-500">*File Siap Cetak (CMYK).</p>
                </div>

                <!-- Monthly -->
                <div class="bg-slate-900/50 backdrop-blur-sm border rounded-2xl p-6 hover:border-brand-blue/50 transition duration-300 border-brand-blue/50 bg-brand-blue/5 relative overflow-hidden">
                    <div class="absolute top-0 right-0 bg-brand-yellow text-black text-xs font-bold px-3 py-1 rounded-bl-lg">⭐ BEST SELLER</div>
                    <h4 class="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Paket Bulanan</h4>

                    <div class="mb-6">
                        <h5 class="font-bold text-brand-blue mb-1">UMKM Starter</h5>
                        <p class="text-2xl font-extrabold text-white">Rp 1.200.000 <span class="text-sm font-normal text-slate-400">/bln</span></p>
                        <p class="text-sm text-slate-400 mt-1">10 Desain (Feed/Story) + Copywriting.</p>
                    </div>

                    <div>
                        <h5 class="font-bold text-brand-purple mb-1">Business Pro</h5>
                        <p class="text-2xl font-extrabold text-white">Rp 3.000.000 <span class="text-sm font-normal text-slate-400">/bln</span></p>
                        <p class="text-sm text-slate-400 mt-1">25 Desain + 1 Spanduk + Riset Hashtag.</p>
                    </div>
                </div>
            `;
        } else if (service === 'video') {
            html = `
                <!-- Shooting -->
                <div class="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-brand-blue/50 transition duration-300">
                    <h4 class="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Jasa Shooting</h4>
                    <p class="text-sm text-slate-400 mb-4">Dokumentasi Mobile (Poco X3 Pro - 1080p 60fps)</p>
                    <div class="space-y-4">
                        <div>
                            <div class="flex justify-between">
                                <span class="font-semibold text-white">Shooting Kegiatan</span>
                                <span class="font-bold text-brand-blue">Rp 350.000</span>
                            </div>
                            <p class="text-xs text-slate-500">Max 6 jam, file mentah jika diminta.</p>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-semibold text-white">Tambahan Waktu</span>
                            <span class="font-bold text-brand-blue">+Rp 50rb/jam</span>
                        </div>
                    </div>
                </div>

                <!-- Editing -->
                <div class="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-brand-blue/50 transition duration-300">
                    <h4 class="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Jasa Editing</h4>
                    <ul class="space-y-4">
                        <li>
                            <div class="flex justify-between">
                                <span class="font-semibold text-white">Lvl 1: Dokumentasi</span>
                                <span class="font-bold text-brand-blue">Rp 150.000</span>
                            </div>
                            <p class="text-xs text-slate-500">Cut-to-cut, Music No-Copyright.</p>
                        </li>
                        <li>
                            <div class="flex justify-between">
                                <span class="font-semibold text-white">Lvl 2: Highlight</span>
                                <span class="font-bold text-brand-blue">Rp 250.000</span>
                            </div>
                            <p class="text-xs text-slate-500">Transisi, Teks, Color Standard.</p>
                        </li>
                        <li>
                            <div class="flex justify-between">
                                <span class="font-semibold text-white">Lvl 3: Cinematic</span>
                                <span class="font-bold text-brand-blue">Rp 500.000</span>
                            </div>
                            <p class="text-xs text-slate-500">Storytelling, Grading Premium, SFX.</p>
                        </li>
                    </ul>
                </div>

                <!-- Bundles -->
                <div class="bg-slate-900/50 backdrop-blur-sm border rounded-2xl p-6 hover:border-brand-blue/50 transition duration-300 border-brand-purple/50 bg-brand-purple/5 relative">
                    <div class="absolute top-0 right-0 bg-brand-yellow text-black text-xs font-bold px-3 py-1 rounded-bl-lg">PALING LARIS</div>
                    <h4 class="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Paket Hemat (All-in)</h4>

                    <div class="space-y-6">
                        <div>
                            <h5 class="font-bold text-white">Konten Sosmed (UMKM)</h5>
                            <p class="text-xl font-extrabold text-brand-blue">Rp 500.000</p>
                            <p class="text-xs text-slate-400">Shooting 2-3 Jam + Edit Highlight.</p>
                        </div>
                        <div>
                            <h5 class="font-bold text-white">Dokumentasi Acara</h5>
                            <p class="text-xl font-extrabold text-brand-blue">Rp 600.000</p>
                            <p class="text-xs text-slate-400">Shooting 6 Jam + Edit Dokumentasi.</p>
                        </div>
                        <div>
                            <h5 class="font-bold text-white">Video Profil</h5>
                            <p class="text-xl font-extrabold text-brand-blue">Rp 1.000.000</p>
                            <p class="text-xs text-slate-400">Shooting Terkonsep + Edit Cinematic.</p>
                        </div>
                    </div>
                </div>
            `;
        } else if (service === 'ai') {
            html = `
                <div class="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-brand-blue/50 transition duration-300">
                    <h4 class="text-2xl font-bold text-white mb-2">Premium Basic</h4>
                    <p class="text-brand-blue font-extrabold text-3xl mb-4">Rp 500.000 <span class="text-sm font-normal text-slate-400">/video</span></p>
                    <p class="text-slate-400 mb-6 text-sm">Satu Harga, Kualitas Terbaik. Cocok untuk Iklan & Personal Branding.</p>

                    <ul class="space-y-3 text-sm mb-6">
                        <li class="flex gap-2"><i class="fa-solid fa-check text-brand-blue"></i> Konsep & Naskah Kreatif</li>
                        <li class="flex gap-2"><i class="fa-solid fa-check text-brand-blue"></i> Visual Sinematik (3-5 Scene)</li>
                        <li class="flex gap-2"><i class="fa-solid fa-check text-brand-blue"></i> Voice Over & Audio Pro</li>
                        <li class="flex gap-2"><i class="fa-solid fa-check text-brand-blue"></i> Full HD 1080p (9:16)</li>
                    </ul>
                    <a href="https://wa.me/6281268918360" class="block text-center bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition">Pesan Sekarang</a>
                </div>

                <div class="bg-slate-900/50 backdrop-blur-sm border rounded-2xl p-6 hover:border-brand-blue/50 transition duration-300 border-brand-blue/50 bg-gradient-to-br from-brand-blue/10 to-brand-purple/10">
                    <div class="flex justify-between items-start">
                        <h4 class="text-2xl font-bold text-white mb-2">Monthly Creator</h4>
                        <span class="inline-block bg-brand-yellow text-brand-darker text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide mb-2">HEMAT 40%</span>
                    </div>

                    <p class="text-brand-purple font-extrabold text-3xl mb-4">Rp 3.000.000 <span class="text-sm font-normal text-slate-400">/bulan</span></p>
                    <p class="text-slate-400 mb-6 text-sm">Solusi konten rutin. 10 Video kualitas Premium.</p>

                    <ul class="space-y-3 text-sm mb-6">
                        <li class="flex gap-2"><i class="fa-solid fa-star text-yellow-400"></i> 10 Video Spesifikasi Premium</li>
                        <li class="flex gap-2"><i class="fa-solid fa-star text-yellow-400"></i> Prioritas Pengerjaan (VVIP)</li>
                        <li class="flex gap-2"><i class="fa-solid fa-star text-yellow-400"></i> Konsistensi Branding Karakter</li>
                        <li class="flex gap-2"><i class="fa-solid fa-star text-yellow-400"></i> Bonus Riset Ide & Kalender</li>
                    </ul>
                    <a href="https://wa.me/6281268918360" class="block text-center bg-brand-blue hover:bg-brand-blue/90 text-white py-2 rounded-lg transition">Langganan Sekarang</a>
                </div>
            `;
        }

        container.innerHTML = html;
    }

    // Populate pricing for all services
    renderPricingCards('graphic', 'pricing-graphic-service');
    renderPricingCards('video', 'pricing-video-service');
    renderPricingCards('ai', 'pricing-ai-service');

    // --- 7. Mobile Menu Logic ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('max-h-0', 'opacity-0', 'border-none');
                mobileMenu.classList.add('max-h-[400px]', 'opacity-100');
                mobileMenuIcon.classList.remove('fa-bars');
                mobileMenuIcon.classList.add('fa-xmark', 'rotate-90');
            } else {
                mobileMenu.classList.add('max-h-0', 'opacity-0', 'border-none');
                mobileMenu.classList.remove('max-h-[400px]', 'opacity-100');
                mobileMenuIcon.classList.add('fa-bars');
                mobileMenuIcon.classList.remove('fa-xmark', 'rotate-90');
            }
        });

        // Close menu when link clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.add('max-h-0', 'opacity-0', 'border-none');
                mobileMenu.classList.remove('max-h-[400px]', 'opacity-100');
                mobileMenuIcon.classList.add('fa-bars');
                mobileMenuIcon.classList.remove('fa-xmark', 'rotate-90');
            });
        });
    }

});
