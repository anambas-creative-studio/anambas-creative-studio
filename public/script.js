
// Data for Workflows
const WORKFLOWS = {
    graphic: [
        { title: "Intake & Briefing", description: "Mengunci spesifikasi teknis dan konten." },
        { title: "Visual Direction", description: "Riset warna, font, dan mood." },
        { title: "Production", description: "Eksekusi layout dan elemen visual." },
        { title: "Quality Control", description: "Cek typo dan kontras mandiri." },
        { title: "Feedback", description: "Revisi ringan & finalisasi." },
        { title: "Archiving", description: "Ekspor file siap pakai." },
    ],
    video: [
        { title: "Ingest", description: "Backup & Sortir footage." },
        { title: "Assembly", description: "Rough cut sesuai alur cerita." },
        { title: "Mixing", description: "Audio treatment & musik." },
        { title: "Grading", description: "Color correction agar seragam." },
        { title: "Graphics", description: "Judul & elemen visual." },
        { title: "QC & Export", description: "Cek final & render." },
    ],
    ai: [
        { title: "Ide & Naskah", description: "Skrip & breakdown scene." },
        { title: "Visual Prompting", description: "Kunci gaya visual 3D." },
        { title: "Motion & Gen", description: "Start/End frame & Generate video." },
        { title: "VO & Audio", description: "Generate suara & musik." },
        { title: "Editing", description: "Assembly & Enhancing." },
        { title: "Final Export", description: "Upscale HD+." },
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
    const tabButtons = document.querySelectorAll('.pricing-tab-btn');
    const tabContents = document.querySelectorAll('.pricing-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');

            // Update Buttons
            tabButtons.forEach(b => {
                if (b.getAttribute('data-tab') === target) {
                    b.className = "pricing-tab-btn flex items-center gap-2 px-6 py-3 rounded-full font-bold transition duration-300 bg-brand-blue text-white shadow-lg shadow-brand-blue/30 scale-105";
                } else {
                    b.className = "pricing-tab-btn flex items-center gap-2 px-6 py-3 rounded-full font-bold transition duration-300 bg-slate-800 text-slate-400 hover:bg-slate-700";
                }
            });

            // Update Content
            tabContents.forEach(content => {
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

    // --- 4. Mobile Menu Logic ---
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
