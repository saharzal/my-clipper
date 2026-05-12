document.getElementById("save").addEventListener("click", () => {
  const token = document.getElementById("token").value.trim();
  const chatId = document.getElementById("chatId").value.trim();
  const status = document.getElementById("status");

  if (!token || !chatId) {
    status.textContent = "⚠️ Please fill in all fields";
    status.className = "error";
    return;
  }

  chrome.storage.sync.set({ baleToken: token, baleChatId: chatId }, () => {
    status.textContent = "✅ Settings saved successfully";
    status.className = "success";
    setTimeout(() => {
      status.className = "";
    }, 3000);
  });
});

// Load saved settings
chrome.storage.sync.get(["baleToken", "baleChatId"], (data) => {
  if (data.baleToken) {
    document.getElementById("token").value = data.baleToken;
  }
  if (data.baleChatId) {
    document.getElementById("chatId").value = data.baleChatId;
  }
});
