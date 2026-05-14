document.getElementById("saveToken").addEventListener("click", () => {
  const token = document.getElementById("token").value.trim();
  const status = document.getElementById("tokenStatus");

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
    }, 3000);
  });
});

document.getElementById("saveChatId").addEventListener("click", () => {
  const chatId = document.getElementById("chatId").value.trim();
  const status = document.getElementById("chatIdStatus");

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
    }, 3000);
  });
});

chrome.storage.sync.get(["baleToken", "baleChatId"], (data) => {
  if (data.baleToken) {
    document.getElementById("token").value = data.baleToken;
  }
  if (data.baleChatId) {
    document.getElementById("chatId").value = data.baleChatId;
  }
});
