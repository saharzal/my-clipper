const saveTokenBtn = document.getElementById("saveToken");
saveTokenBtn?.addEventListener("click", () => {
  const tokenInput = document.getElementById("token") as HTMLInputElement | null;
  const statusEl = document.getElementById("tokenStatus");

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
      }, 3000);
    }
  });
});

const saveChatIdBtn = document.getElementById("saveChatId");
saveChatIdBtn?.addEventListener("click", () => {
  const chatIdInput = document.getElementById("chatId") as HTMLInputElement | null;
  const statusEl = document.getElementById("chatIdStatus");

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
      }, 3000);
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
});

export {};
