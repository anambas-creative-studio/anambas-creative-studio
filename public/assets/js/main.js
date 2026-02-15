document.addEventListener("DOMContentLoaded", () => {
  const typeTarget = document.getElementById("type-target");
  if (typeTarget) {
    const fullText = typeTarget.getAttribute("data-text") || typeTarget.textContent || "";
    const cursor = document.querySelector(".type-cursor");
    let idx = 0;
    const speed = 60;
    typeTarget.textContent = "";
    const tick = () => {
      typeTarget.textContent = fullText.slice(0, idx);
      idx += 1;
      if (idx <= fullText.length) {
        setTimeout(tick, speed);
      }
    };
    setTimeout(tick, 200);
  }
  const container = document.getElementById("services");
  if (!container) return;
  const tabs = document.querySelector(".category-tabs");
  let allServices = [];

  const renderServices = (dataArray) => {
    container.textContent = "";
    const items = dataArray.filter(service => service.active);
    if (items.length === 0) {
      const emptyCard = document.createElement("div");
      emptyCard.className = "service-card";

      const h3 = document.createElement("h3");
      h3.textContent = "Belum ada layanan";

      const subtitle = document.createElement("p");
      subtitle.className = "subtitle";
      subtitle.textContent = "Coba kategori lain";

      const description = document.createElement("p");
      description.className = "description";
      description.textContent = "Tidak ada layanan aktif untuk kategori ini saat ini.";

      emptyCard.appendChild(h3);
      emptyCard.appendChild(subtitle);
      emptyCard.appendChild(description);
      container.appendChild(emptyCard);
      return;
    }

    items.forEach(service => {
      const card = document.createElement("div");
      card.className = "service-card";

      // Create elements safely to prevent XSS
      const h3 = document.createElement("h3");
      h3.textContent = service.title;

      const subtitle = document.createElement("p");
      subtitle.className = "subtitle";
      subtitle.textContent = service.subtitle;

      const description = document.createElement("p");
      description.className = "description";
      description.textContent = service.description;

      const button = document.createElement("button");
      button.className = "service-btn";
      button.textContent = "Lihat Detail";
      button.onclick = () => {
        const slug = service.slug || service.id;
        window.location.href = `/services/${slug}.html`;
      };

      card.appendChild(h3);
      card.appendChild(subtitle);
      card.appendChild(description);
      card.appendChild(button);
      container.appendChild(card);
    });
  };

  if (tabs) {
    tabs.addEventListener("click", (event) => {
      const button = event.target.closest(".category-tab");
      if (!button) return;
      tabs.querySelectorAll(".category-tab").forEach(tab => {
        tab.classList.toggle("active", tab === button);
      });

      const filter = button.dataset.filter || "all";
      const filtered = filter === "all"
        ? allServices
        : allServices.filter(service => service.category === filter);
      renderServices(filtered);
    });
  }

  fetch("/data/services.json")
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      allServices = Array.isArray(data.services) ? data.services : [];
      renderServices(allServices);
    })
    .catch(err => {
      console.error("services.json error:", err);

      const errorCard = document.createElement("div");
      errorCard.className = "service-card";

      const h3 = document.createElement("h3");
      h3.textContent = "Gagal memuat layanan";

      const subtitle = document.createElement("p");
      subtitle.className = "subtitle";
      subtitle.textContent = "Cek cara menjalankan website";

      const description = document.createElement("p");
      description.className = "description";
      description.textContent = "Jika kamu membuka file ini langsung (file://), browser biasanya memblokir fetch(). Jalankan lewat web server (mis. VS Code Live Server) lalu refresh.";

      errorCard.appendChild(h3);
      errorCard.appendChild(subtitle);
      errorCard.appendChild(description);
      container.appendChild(errorCard);
    });
});
