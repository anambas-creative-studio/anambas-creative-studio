document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const serviceId = params.get("id");

  if (!serviceId) {
    window.location.href = "/"; // Redirect to home if no ID
    return;
  }

  fetch("/data/services.json")
    .then(res => res.json())
    .then(data => {
      const service = data.services.find(s => s.id === serviceId);
      if (!service) {
        window.location.href = "/"; // Redirect if service not found
        return;
      }

      // Inject Title and Meta
      document.title = `${service.title} | ${data.studio}`;
      document.querySelector('meta[name="description"]').setAttribute("content", service.description);

      // Inject Thumbnail
      const thumbnailContent = document.getElementById("product-thumbnail-content");
      if (service.details && service.details.thumbnail) {
        thumbnailContent.innerHTML = `
          <div style="font-size:3rem; margin-bottom:10px;">${service.details.thumbnail.icon}</div>
          ${service.details.thumbnail.title}
        `;
      }

      // Inject Header
      document.getElementById("product-title").textContent = service.title;
      document.getElementById("product-summary").textContent = service.details?.summary || service.subtitle;
      if (service.details?.tag) {
        document.querySelector(".product-tag").textContent = service.details.tag;
      }

      // Inject Body
      const productBody = document.getElementById("product-body");
      if (service.details) {
        let bodyHtml = '<div class="section-title">📦 Opsi Paket Tersedia</div>';
        
        // Packages
        if (service.details.packages) {
          bodyHtml += '<div class="packages-grid">';
          service.details.packages.forEach(pkg => {
            bodyHtml += `
              <div class="package-card ${pkg.pro ? 'pro' : ''}">
                ${pkg.pro ? '<div class="pro-badge">REKOMENDASI</div>' : ''}
                <span class="pkg-icon">${pkg.icon}</span> <h3 class="pkg-title">${pkg.title}</h3>
                <ul class="pkg-list">
                  ${pkg.features.map(f => `<li>${f}</li>`).join("")}
                </ul>
              </div>
            `;
          });
          bodyHtml += '</div>';
        }

        // Note
        if (service.details.note) {
          bodyHtml += `<div class="box-guarantee"><strong>ℹ️ Catatan Penting:</strong> ${service.details.note}</div>`;
        }

        // FAQs
        if (service.details.faqs) {
          bodyHtml += '<div class="section-title">❓ FAQ (Pertanyaan Umum)</div>';
          service.details.faqs.forEach(faq => {
            bodyHtml += `
              <div class="faq-item">
                <div class="faq-question">${faq.question}</div>
                <div class="faq-answer">${faq.answer}</div>
              </div>
            `;
          });
        }
        productBody.innerHTML = bodyHtml;
      } else {
         productBody.innerHTML = `<p>${service.description}</p>`;
      }


      // Setup CTA Button
      const btn = document.getElementById("contact-wa");
      if (btn) {
        const phone = data.contact.whatsapp;
        const message = encodeURIComponent(service.ctaMessage);
        btn.addEventListener("click", () => {
          window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
        });
      }

    })
    .catch(err => {
      console.error("Error fetching service data:", err);
      // Optional: show an error message to the user
    });
});
