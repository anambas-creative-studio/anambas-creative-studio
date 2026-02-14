document.addEventListener("DOMContentLoaded", () => {
  fetch("/data/services.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("services");
      data.services
        .filter(s => s.active)
        .forEach(service => {
          const card = document.createElement("div");
          card.className = "service-card";
          card.innerHTML = `
            <h3>${service.title}</h3>
            <p class="subtitle">${service.subtitle}</p>
            <p>${service.description}</p>
            <button class="service-btn">Open Project</button>
          `;
          card.querySelector("button").onclick = () => {
            window.location.href = `/service.html?id=${service.id}`;
          };
          container.appendChild(card);
        });
    })
    .catch(err => console.error("services.json error:", err));
});