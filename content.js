// Listen for text selection on the page
document.addEventListener("mouseup", () => {
    const selectedText = window.getSelection().toString().trim();
    if (!selectedText) return;
  
    // Show a small "Save" tooltip near the selection
    removeTooltip();
    const tooltip = document.createElement("div");
    tooltip.id = "hl-tooltip";
    tooltip.innerText = "💾 Save";
  
    const range = window.getSelection().getRangeAt(0);
    const rect = range.getBoundingClientRect();
  
    tooltip.style.top = `${window.scrollY + rect.top - 40}px`;
    tooltip.style.left = `${window.scrollX + rect.left}px`;
  
    document.body.appendChild(tooltip);
  
    tooltip.addEventListener("click", () => {
      saveHighlight(selectedText);
      highlightSelection(range);
      removeTooltip();
    });
  });
  
  // Remove tooltip if user clicks elsewhere
  document.addEventListener("mousedown", (e) => {
    if (e.target.id !== "hl-tooltip") removeTooltip();
  });
  
  function removeTooltip() {
    const existing = document.getElementById("hl-tooltip");
    if (existing) existing.remove();
  }
  
  function highlightSelection(range) {
    const mark = document.createElement("mark");
    mark.className = "hl-highlight";
    range.surroundContents(mark);
  }
  
  function saveHighlight(text) {
    const url = window.location.href;
    const title = document.title;
  
    chrome.storage.local.get({ highlights: [] }, (data) => {
      const highlights = data.highlights;
      highlights.push({
        text,
        url,
        title,
        date: new Date().toLocaleString()
      });
      chrome.storage.local.set({ highlights });
    });
  }