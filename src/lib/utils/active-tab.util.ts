import { isUrlFromSongsterr } from '$lib/utils/input-validation';

export async function getActiveSongsterrTabUrl(): Promise<string | undefined> {
  try {
    const [activeTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });
    const url = activeTab?.url;
    return url && isUrlFromSongsterr(url) ? url : undefined;
  } catch (error) {
    console.error('Error reading active tab URL', error);
    return undefined;
  }
}
