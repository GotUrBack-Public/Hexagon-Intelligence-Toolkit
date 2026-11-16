const normalizeTelekom151 = (raw) => {
  let value = raw.trim().replace(/[\\s().-]/g, "");
  if (value.startsWith("+49")) value = "0" + value.slice(3);
  else if (value.startsWith("0049")) value = "0" + value.slice(4);
  return /^0151\\d{7}$/.test(value) ? "49" + value.slice(1) : null;
};

export function initializeMobileNumberIntelligence() {
  const card = document.querySelector("#mobile-tool-card");
  const grid = document.querySelector("#tool-grid");
  const view = document.querySelector("#mobile-tool-view");
  const back = document.querySelector("#mobile-tool-back");
  const note = document.querySelector(".dashboard-note");
  const open = () => { grid.classList.add("hidden"); note?.classList.add("hidden"); view.classList.remove("hidden"); view.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const close = () => { view.classList.add("hidden"); grid.classList.remove("hidden"); note?.classList.remove("hidden"); };
  card?.addEventListener("click", open);
  card?.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } });
  back?.addEventListener("click", close);
  document.querySelector("#mobile-process")?.addEventListener("click", () => {
    const quantity = Number(document.querySelector("#mobile-quantity").value);
    const raw = document.querySelector("#mobile-contacts").value.split(/\\r?\\n/).map(s => s.trim()).filter(Boolean);
    const consent = document.querySelector("#mobile-consent").checked;
    const feedback = document.querySelector("#mobile-feedback");
    const results = document.querySelector("#mobile-results");
    results.replaceChildren();
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 500) { feedback.textContent = "Quantity must be between 1 and 500."; return; }
    if (!raw.length) { feedback.textContent = "Enter your own contact numbers first. Random real phone numbers are not generated."; return; }
    if (raw.length > quantity) { feedback.textContent = "You entered " + raw.length + " contacts; increase the limit or remove entries."; return; }
    if (!consent) { feedback.textContent = "Confirm consent before creating WhatsApp links."; return; }
    let valid = 0;
    raw.forEach((entry, index) => {
      const digits = normalizeTelekom151(entry);
      const row = document.createElement("div"); row.className = "mobile-result";
      const label = document.createElement("span"); label.textContent = "CONTACT " + String(index + 1).padStart(3, "0");
      if (!digits) { row.classList.add("invalid"); const message = document.createElement("span"); message.textContent = "Invalid format — expected German Telekom 0151 + 7 digits."; row.append(label, message); }
      else { valid++; const number = document.createElement("span"); number.textContent = "+" + digits; const link = document.createElement("a"); link.href = "https://wa.me/" + digits; link.target = "_blank"; link.rel = "noopener noreferrer"; link.textContent = "OPEN WHATSAPP CHAT ↗"; row.append(label, number, link); }
      results.append(row);
    });
    feedback.textContent = valid + " valid contact(s) processed; " + (raw.length - valid) + " invalid entr(y/ies). Links were created only for supplied contacts.";
  });
}
