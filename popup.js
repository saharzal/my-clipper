// Tab switching
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// Load and display settings
chrome.storage.sync.get(["baleToken", "baleChatId"], (data) => {
  if (data.baleToken) {
    document.getElementById("token").value = data.baleToken;
  }
  if (data.baleChatId) {
    document.getElementById("chatId").value = data.baleChatId;
  }
});

// Save token
document.getElementById("save-token").addEventListener("click", () => {
  const token = document.getElementById("token").value.trim();
  const status = document.getElementById("token-status");

  if (!token) {
    status.textContent = "⚠️ Please enter a token";
    status.className = "error";
    return;
  }

  chrome.storage.sync.set({ baleToken: token }, () => {
    status.textContent = "✅ Token saved";
    status.className = "success";
    setTimeout(() => {
      status.className = "";
    }, 2000);
  });
});

// Save chat ID
document.getElementById("save-chatid").addEventListener("click", () => {
  const chatId = document.getElementById("chatId").value.trim();
  const status = document.getElementById("chatid-status");

  if (!chatId) {
    status.textContent = "⚠️ Please enter a chat ID";
    status.className = "error";
    return;
  }

  chrome.storage.sync.set({ baleChatId: chatId }, () => {
    status.textContent = "✅ Chat ID saved";
    status.className = "success";
    setTimeout(() => {
      status.className = "";
    }, 2000);
  });
});

// Show last sent item
chrome.storage.local.get(["lastSent"], (data) => {
  const container = document.getElementById("last-sent");
  if (data.lastSent) {
    const item = data.lastSent;
    container.innerHTML = `
      <div class="highlight-item">
        <div class="highlight-text">✅ Last sent:</div>
        <div style="color: #374151; font-size: 12px; margin: 4px 0;">"${item.text.substring(0, 100)}${item.text.length > 100 ? '...' : ''}"</div>
        <div class="highlight-meta">${item.date}</div>
      </div>
    `;
  } else {
    container.innerHTML = '<p id="empty">Highlight text on any page and click "Send" to share it to Bale!</p>';
  }
});