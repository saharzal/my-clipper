chrome.storage.local.get({ highlights: [] }, (data) => {
    const list = document.getElementById("list");
    const highlights = data.highlights.reverse(); // newest first
  
    if (highlights.length === 0) {
      list.innerHTML = '<p id="empty">No highlights yet. Select text on any page!</p>';
      return;
    }
  
    highlights.forEach((h, i) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <span class="delete" data-index="${i}">✕</span>
        <p>"${h.text}"</p>
        <small>${h.date}</small><br>
        <a href="${h.url}" target="_blank">${h.title || h.url}</a>
      `;
      list.appendChild(div);
    });
  
    // Delete individual highlight
    document.querySelectorAll(".delete").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = highlights.length - 1 - parseInt(e.target.dataset.index);
        chrome.storage.local.get({ highlights: [] }, (data) => {
          data.highlights.splice(index, 1);
          chrome.storage.local.set({ highlights: data.highlights }, () => location.reload());
        });
      });
    });
  });
  
  document.getElementById("clear-all").addEventListener("click", () => {
    chrome.storage.local.set({ highlights: [] }, () => location.reload());
  });