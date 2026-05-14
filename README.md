![Send to Bale Logo](./bale_note_saver_logo.png)

# Send to Bale

A Chrome browser extension that makes it easy to quickly share highlighted text and URLs to your Bale Messenger chats.

## About

**Send to Bale** is a lightweight browser extension that integrates with Bale Messenger, allowing you to:
- Highlight any text on a webpage and send it directly to Bale
- Share URLs with one click using the context menu
- Save and manage your Bale Bot API token and Chat ID securely
- Track the last item you sent to Bale

Perfect for saving articles, quick notes, links, and important information to your Bale chats without switching tabs.

## Features

- 🎯 **Quick Send** — Right-click context menu to send text, links, or page URLs
- 💾 **Secure Storage** — Your token and chat ID are stored securely using Chrome's storage API
- 📝 **Last Sent Tracker** — View what you last sent to Bale
- ⚡ **Fast & Lightweight** — No external dependencies, minimal performance impact
- 🔒 **Privacy Focused** — All data stays on your device

## Installation

### Prerequisites
- Node.js 18+ (for development)
- Chrome/Chromium-based browser
- Bale Bot API token (get from [@BotFather](https://web.bale.ai/s/BotFather) on Bale)

### Build & Load Extension

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```
   This compiles TypeScript to JavaScript and outputs to the `dist/` folder.

3. **Load in Chrome:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top-right)
   - Click **Load unpacked**
   - Select the `dist/` folder
   - Done! The extension is now active

## Setup

1. Click the extension icon in Chrome's toolbar
2. Go to the **Settings** tab
3. Enter your:
   - **Bot API Token** — Get from [@BotFather](https://web.bale.ai/s/BotFather)
   - **Chat ID / User ID** — Your numeric Bale user or chat ID
4. Click **Save** for each field
5. Start using!

## Usage

### Send Highlighted Text
1. Select any text on a webpage
2. Right-click and choose **Send to Bale**
3. It's instantly sent to your Bale chat with the page title and URL

### Send a Link
1. Right-click any link or image
2. Choose **Send to Bale**
3. The URL is sent to your chat

### View Last Sent
- Click the extension icon and go to the **Send** tab to see what you last shared

### Build Commands

- **Build:** `npm run build` — Compile TypeScript and prepare extension
- **Watch:** `npm run watch` — Auto-recompile on file changes

### Development Workflow

1. Edit TypeScript files in `src/`
2. Run `npm run watch` for auto-compilation
3. Go to `chrome://extensions/` and click the refresh icon on the Send to Bale extension
4. Test your changes

## How It Works

1. **Background Service Worker** — Listens for context menu clicks and API requests
2. **Content Script** — Runs on every page to listen for send messages
3. **Popup** — Quick access panel to view status and last sent item
4. **Options** — Settings page to save your Bale credentials

The extension communicates with the Bale API at `https://tapi.bale.ai/` to send messages.

## Security & Privacy

- Your Bot API token and Chat ID are stored locally using Chrome's `chrome.storage.sync`
- Messages are sent directly to Bale's API
- No data is collected or transmitted to third parties
- The extension has minimal permissions and only accesses what it needs

## Troubleshooting

**"Please set your Bot API Token and Chat ID"**
- Make sure both fields are filled in the Settings tab
- Click Save after entering each value

**Messages not sending?**
- Verify your Bot token is correct (get from [@BotFather](https://web.bale.ai/s/BotFather))
- Check your Chat ID is numeric and correct
- Ensure you have an internet connection

**Extension not showing?**
- Go to `chrome://extensions/` and check if it's enabled
- Try reloading the page (`Cmd+R` or `Ctrl+R`)

## License

MIT

## Support

For issues or suggestions, please open an issue or contact the author.

---

**Made with ❤️ for Bale users**
