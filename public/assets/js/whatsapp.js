(() => {
  const DATA_URL = "/data/services.json";
  let phonePromise;

  const normalizePhone = phoneRaw => String(phoneRaw || "").replace(/[^\d]/g, "");

  const getPhone = () => {
    if (!phonePromise) {
      phonePromise = fetch(DATA_URL)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(data => normalizePhone(data?.contact?.whatsapp))
        .catch(err => {
          console.error("whatsapp.js: failed to load phone:", err);
          return "";
        });
    }
    return phonePromise;
  };

  const buildWaUrl = (phone, message) => {
    const text = encodeURIComponent(message || "");
    return `https://wa.me/${phone}?text=${text}`;
  };

  document.addEventListener("DOMContentLoaded", () => {
    // Prefetch so click stays "user-initiated" and avoids popup blockers.
    getPhone();
  });

  document.addEventListener("click", async e => {
    const trigger = e.target?.closest?.("[data-wa-message]");
    if (!trigger) return;

    const message = trigger.getAttribute("data-wa-message") || "";
    if (!message.trim()) return;

    e.preventDefault();

    const popup = window.open("about:blank", "_blank");
    const phone = await getPhone();
    if (!phone) {
      if (popup) popup.close();
      return;
    }

    const url = buildWaUrl(phone, message);
    if (!popup) {
      window.location.href = url;
      return;
    }

    popup.opener = null;
    popup.location = url;
  });
})();

