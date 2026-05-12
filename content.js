let tooltipState = { selectedText: "", range: null };

document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();
  if (!selectedText) {
    console.log("No text selected");
    return;
  }
  console.log("✓ Text selected:", selectedText.substring(0, 50));
  removeTooltip();

  const range = window.getSelection().getRangeAt(0);
  const rect = range.getBoundingClientRect();

  // Create button element
  const button = document.createElement("button");
  button.id = "hl-tooltip";
  button.innerHTML = "📤 Send to Bale";
  button.type = "button";

  // Store tooltip state globally
  tooltipState = { selectedText, range };
  console.log("✓ Tooltip state stored");

  button.style.top = `${rect.top - 40}px`;
  button.style.left = `${rect.left}px`;

  document.body.appendChild(button);
  console.log("✓ Button element added to DOM");

  // Direct inline click handler
  button.onclick = (e) => {
    console.log("🎯 BUTTON CLICKED!");
    e.preventDefault();
    e.stopPropagation();
    console.log("✓ Calling sendToBale...");
    sendToBale(tooltipState.selectedText);
    highlightSelection(tooltipState.range);
    removeTooltip();
  };

  console.log("✓ Click handler attached");
});

// Global click handler as fallback
document.addEventListener("click", (e) => {
  if (e.target.id === "hl-tooltip") {
    console.log("🎯 GLOBAL CLICK DETECTED ON TOOLTIP");
    e.preventDefault();
    e.stopPropagation();
    sendToBale(tooltipState.selectedText);
    highlightSelection(tooltipState.range);
    removeTooltip();
  }
}, true);

// Remove tooltip when clicking elsewhere
document.addEventListener("mousedown", (e) => {
  if (e.target.id !== "hl-tooltip") {
    removeTooltip();
  }
}, true);

function removeTooltip() {
  const existing = document.getElementById("hl-tooltip");
  if (existing) existing.remove();
}

function highlightSelection(range) {
  const mark = document.createElement("mark");
  mark.className = "hl-highlight";
  range.surroundContents(mark);
}

function sendToBale(text) {
  const url = window.location.href;
  const title = document.title;

  let message = `*${title}*\n\n${text}`;
  if (url) {
    message += `\n\n_${url}_`;
  }

  console.log("Sending message to background script...");
  chrome.runtime.sendMessage(
    { action: "sendToBale", message, text },
    (response) => {
      console.log("Background response:", response);
      if (response.success) {
        showNotification("✅ Sent to Bale!");
      } else {
        showNotification(`❌ ${response.error || "Failed to send"}`);
      }
    }
  );
}

function showNotification(message) {
  const notif = document.createElement("div");
  notif.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #1f2937;
    color: white;
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 13px;
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;
  notif.innerText = message;
  document.body.appendChild(notif);

  setTimeout(() => notif.remove(), 3000);
}