# Songsterr Downloader (Chrome Extension)

A Chrome extension that converts Songsterr tabs to Guitar Pro (.gp7), MIDI, or AlphaTex files — right from your browser, no server required.

Based on [songsterr-downloader](https://github.com/Metaphysics0/songsterr-downloader), the original web app version. See how that was built [here!](https://www.youtube.com/watch?v=SsIMY8xmDNY)

## How it works

1. Open a Songsterr tab page, then click the extension icon
2. The popup auto-fills the URL from the active tab (or paste one manually)
3. It fetches per-track revision JSON directly from Songsterr's CDN (cross-origin fetch works from the extension without a server, thanks to `host_permissions`)
4. Converts all tracks into an alphaTab score model
5. Exports as GP7, MIDI, or AlphaTex and saves it via `chrome.downloads`

## Conversion features

See [CONVERTER.md](src/lib/services/converter/CONVERTER.md) for full details.

## Deploying locally

1. Clone the repo
2. Install [bun](https://bun.sh/)
3. `bun install`
4. `bun run build` — outputs the unpacked extension to `dist/`
5. In Chrome, go to `chrome://extensions`
6. Enable **Developer mode** (top right)
7. Click **Load unpacked** and select the `dist/` folder
8. Pin the extension and open a Songsterr tab to try it out

While iterating, run `bun run dev` (a watching build) and click the reload icon on the extension's card in `chrome://extensions` after each rebuild.

## Running tests

```
bun run test:unit
```
