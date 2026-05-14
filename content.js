let tooltipState = { selectedText: "", range: null };

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.action === "sendToBale") {
    sendToBale(request.message);
    sendResponse({ success: true });
  }
});

function sendToBale(text) {
  const url = window.location.href;
  const title = document.title;

  let message = `*${title}*\n\n${text}`;
  if (url) {
    message += `\n\n_${url}_`;
  }

  // console.log("Sending message to background script...");
  chrome.runtime.sendMessage({ action: "sendToBale", message, text });
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
