# Songsterr Downloader (Chrome Extension)

A Chrome extension that downloads Songsterr tabs as Guitar Pro (.gp7), MIDI, or AlphaTex files.

Based on [songsterr-downloader](https://github.com/Metaphysics0/songsterr-downloader), the original web app version. See how that was built [here!](https://www.youtube.com/watch?v=SsIMY8xmDNY)

This isn't published on the Chrome Web Store, so it needs to be installed manually as an "unpacked" extension. The steps below are the same either way — the only difference is where the `dist/` folder comes from.

## Installing (no build tools required)

1. Download the **[Latest release](../../releases/latest/download/songsterr-chrome-extension.zip)** (see [releases page](../../releases) for all releases).
2. Unzip the downloaded file into a new folder
3. In Chrome, go to `chrome://extensions` (paste this to the URL text field)
4. Enable **Developer mode** (top right)
5. Click **Load unpacked** and select the unzipped folder
6. Pin the extension and open a Songsterr tab to try it out

## Building from source

1. Clone the repo
2. Install [bun](https://bun.sh/)
3. `bun install`
4. `bun run build` — outputs the unpacked extension to `dist/`
5. Load `dist/` as described above

While iterating, run `bun run dev` (a watching build) and click the reload icon on the extension's card in `chrome://extensions` after each rebuild.

## Running tests

```
bun run test:unit
```
