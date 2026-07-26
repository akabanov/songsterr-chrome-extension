# Songsterr Tabs Downloader (Chrome Extension)

A Chrome extension that downloads Songsterr tabs as Guitar Pro, MIDI,
or plain-text [AlphaTex](https://alphatab.net/) files.

Based on a Songsterr tab files converter from the
[original web application](https://github.com/Metaphysics0/songsterr-downloader) built by Ryan Roberts.

Songsterr's Guitar Pro/MIDI export is a **paid feature** that funds the tabs you're downloading.
If you can afford it, please consider a Songsterr subscription instead of using this extension.
This extension is meant for folks who can't YET afford one, not as a permanent substitute for it.

This can't be published on the Chrome Web Store for obvious reasons, so it needs to be installed manually as an "unpacked" extension.

## Installing (no build tools required)

1. Download the **[Latest release](../../releases/latest/download/songsterr-chrome-extension.zip)** (see [releases page](../../releases) for all releases)
2. Unzip the downloaded file into a new directory
3. In Chrome, go to extensions: paste `chrome://extensions` in the address bar
4. Enable **Developer mode** (top right)
5. Click **Load unpacked** and select the unzipped directory
6. Pin the extension and open a Songsterr tab to try it out

**Note:** Chrome doesn't copy the unzipped directory.
You must not move or delete it for as long as you need the extension to work.

## Building from source

1. Clone the repo
2. Install [bun](https://bun.sh/)
3. `bun install`
4. `bun run build` — outputs the unpacked extension to `dist/`
5. Load `dist/` as described above

While iterating, run `bun run dev` (a watching build) and click the reload icon on the extension's card in `chrome://extensions` after each rebuild.
