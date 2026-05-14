interface BaleApiResponse {
  ok: boolean;
  [key: string]: unknown;
}

chrome.contextMenus.create({
  id: "send-to-bale",
  title: "Send to Bale",
  contexts: ["page", "selection", "link"],
});

chrome.contextMenus.onClicked.addListener(
  (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab | undefined) => {
    if (!tab?.id) return;

    let message = "";

    if (info.menuItemId === "send-to-bale") {
      if (info.selectionText) {
        message = info.selectionText;
      } else if (info.linkUrl) {
        message = info.linkUrl;
      } else if (info.srcUrl) {
        message = info.srcUrl;
      } else if (tab.url) {
        message = tab.url;
      }

      chrome.tabs.sendMessage(tab.id, {
        action: "sendToBale",
        message: message,
        text: message,
      });
    }
  }
);

chrome.runtime.onMessage.addListener(
  (
    request: { action: string; message?: string; text?: string },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: { success: boolean; error?: string }) => void
  ) => {
    if (request.action === "sendToBale") {
      chrome.storage.sync.get(
        ["baleToken", "baleChatId"],
        (data: { baleToken?: string; baleChatId?: string }) => {
          if (!data.baleToken || !data.baleChatId) {
            sendResponse({
              success: false,
              error: "Missing configuration",
            });
            return;
          }

          const apiUrl = `https://tapi.bale.ai/bot${data.baleToken}/sendMessage`;

          fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: data.baleChatId,
              text: request.message,
              parse_mode: "Markdown",
            }),
          })
            .then((res) => res.json())
            .then((result: BaleApiResponse) => {
              if (result.ok) {
                chrome.storage.local.set({
                  lastSent: {
                    text: request.text,
                    date: new Date().toLocaleString(),
                  },
                });
                sendResponse({ success: true });
              } else {
                sendResponse({
                  success: false,
                  error: "Bale API error",
                });
              }
            })
            .catch((err: Error) => {
              console.error("Bale API error:", err);
              sendResponse({
                success: false,
                error: err.message,
              });
            });

          return true; // Keep channel open for async response
        }
      );
    }
  }
);

export {};
