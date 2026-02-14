document.addEventListener("DOMContentLoaded", () => {
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
          card.innerHTML = `
            <h3>${service.title}</h3>
            <p class="subtitle">${service.subtitle}</p>
            <p class="description">${service.description}</p>
            <button class="service-btn">Open Project</button>
          `;
          card.querySelector("button").onclick = () => {
            const slug = service.slug || service.id;
            window.location.href = `/services/${slug}.html`;
          };
          container.appendChild(card);
        });
    })
    .catch(err => {
      console.error("services.json error:", err);
      container.innerHTML = `
        <div class="service-card">
          <h3>Gagal memuat layanan</h3>
          <p class="subtitle">Cek cara menjalankan website</p>
          <p class="description">
            Jika kamu membuka file ini langsung (file://), browser biasanya memblokir <code>fetch()</code>.
            Jalankan lewat web server (mis. VS Code Live Server) lalu refresh.
          </p>
        </div>
      `;
    });
});
