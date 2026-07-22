import type { TabExportResult } from '$lib/services/tab-export.service';

export async function triggerFileDownload({
  data,
  contentType,
  fileName
}: TabExportResult): Promise<void> {
  try {
    const url = `data:${contentType};base64,${toBase64(data)}`;
    await chrome.downloads.download({ url, filename: fileName, saveAs: false });
  } catch (error) {
    console.error('Error triggering download', error);
  }
}

function toBase64(bytes: Uint8Array): string {
  const CHUNK_SIZE = 0x8000;
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += CHUNK_SIZE) {
    const chunk = bytes.subarray(offset, offset + CHUNK_SIZE);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}
