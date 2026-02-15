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
  const tabs = document.querySelector(".category-tabs");
  const frame = document.getElementById("service-frame");
  if (!tabs || !frame) return;

  const setActiveTab = (button) => {
    tabs.querySelectorAll(".category-tab").forEach(tab => {
      tab.classList.toggle("active", tab === button);
    });
  };

  const loadService = (url) => {
    if (!url) return;
    frame.setAttribute("src", url);
  };

  frame.addEventListener("load", () => {
    try {
      const doc = frame.contentDocument || frame.contentWindow?.document;
      if (!doc) return;
      const height = Math.max(
        doc.body?.scrollHeight || 0,
        doc.documentElement?.scrollHeight || 0
      );
      if (height) {
        frame.style.height = `${height}px`;
      }
    } catch (err) {
      console.warn("Tidak bisa menyesuaikan tinggi iframe:", err);
    }
  });

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest(".category-tab");
    if (!button) return;
    setActiveTab(button);
    loadService(button.dataset.url);
  });

  const initial = tabs.querySelector(".category-tab.active") || tabs.querySelector(".category-tab");
  if (initial) {
    setActiveTab(initial);
    loadService(initial.dataset.url);
  }
});
