const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    const tabId = (btn as HTMLElement).dataset.tab;
    if (tabId) {
      document.getElementById(tabId)?.classList.add("active");
    }
  });
});

chrome.storage.sync.get(["baleToken", "baleChatId"], (data: { baleToken?: string; baleChatId?: string }) => {
  const tokenInput = document.getElementById("token") as HTMLInputElement | null;
  const chatIdInput = document.getElementById("chatId") as HTMLInputElement | null;

  if (data.baleToken && tokenInput) {
    tokenInput.value = data.baleToken;
  }
  if (data.baleChatId && chatIdInput) {
    chatIdInput.value = data.baleChatId;
  }

  const hasToken = !!data.baleToken;
  const hasChatId = !!data.baleChatId;

  const infoBox = document.getElementById("info-box");
  const warningBox = document.getElementById("warning-box");

  if (hasToken && hasChatId) {
    infoBox?.classList.remove("hide");
    warningBox?.classList.remove("show");
  } else {
    infoBox?.classList.add("hide");
    warningBox?.classList.add("show");
  }
});

const saveTokenBtn = document.getElementById("save-token");
saveTokenBtn?.addEventListener("click", () => {
  const tokenInput = document.getElementById("token") as HTMLInputElement | null;
  const statusEl = document.getElementById("token-status");

  const token = tokenInput?.value.trim() || "";

  if (!token) {
    if (statusEl) {
      statusEl.textContent = "⚠️ Please enter a token";
      statusEl.className = "error";
    }
    return;
  }

  chrome.storage.sync.set({ baleToken: token }, () => {
    if (statusEl) {
      statusEl.textContent = "✅ Token saved";
      statusEl.className = "success";
      setTimeout(() => {
        statusEl.className = "";
      }, 2000);
    }
  });
});

const saveChatIdBtn = document.getElementById("save-chatid");
saveChatIdBtn?.addEventListener("click", () => {
  const chatIdInput = document.getElementById("chatId") as HTMLInputElement | null;
  const statusEl = document.getElementById("chatid-status");

  const chatId = chatIdInput?.value.trim() || "";

  if (!chatId) {
    if (statusEl) {
      statusEl.textContent = "⚠️ Please enter a chat ID";
      statusEl.className = "error";
    }
    return;
  }

  chrome.storage.sync.set({ baleChatId: chatId }, () => {
    if (statusEl) {
      statusEl.textContent = "✅ Chat ID saved";
      statusEl.className = "success";
      setTimeout(() => {
        statusEl.className = "";
      }, 2000);
    }
  });
});

chrome.storage.local.get(["lastSent"], (data: { lastSent?: { text: string; date: string } }) => {
  const container = document.getElementById("last-sent");
  if (data.lastSent && container) {
    const item = data.lastSent;
    container.innerHTML = `
      <div class="highlight-item">
        <div class="highlight-text">✅ Last sent:</div>
        <div style="color: #374151; font-size: 12px; margin: 4px 0;">"${item.text.substring(0, 100)}${item.text.length > 100 ? "..." : ""}"</div>
        <div class="highlight-meta">${item.date}</div>
      </div>
    `;
  } else if (container) {
    container.innerHTML = '<p id="empty">Highlight text on any page and click "Send" to share it to Bale!</p>';
  }
});

export {};
