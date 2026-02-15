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

  fetch("/data/services.json")
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      data.services
        .filter(s => s.active)
        .forEach(service => {
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
