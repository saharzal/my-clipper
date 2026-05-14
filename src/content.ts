interface TooltipState {
  selectedText: string;
  range: Range | null;
}

const tooltipState: TooltipState = { selectedText: "", range: null };

chrome.runtime.onMessage.addListener(
  (
    request: { action: string; message?: string },
    _: chrome.runtime.MessageSender,
    sendResponse: (response: { success: boolean }) => void
  ) => {
    if (request.action === "sendToBale") {
      sendToBale(request.message || "");
      sendResponse({ success: true });
    }
  }
);

function sendToBale(text: string): void {
  const url = window.location.href;
  const title = document.title;

  let message = `*${title}*\n\n${text}`;
  if (url) {
    message += `\n\n_${url}_`;
  }

  chrome.runtime.sendMessage({ action: "sendToBale", message, text });
}

export {};
