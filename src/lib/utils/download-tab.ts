import type { MidiDownloadOptions, SongsterrPartialMetadata } from '$lib/types';
import { TabExportService } from '$lib/services/tab-export.service';
import { triggerFileDownload } from '$lib/utils/trigger-client-side-download';
import { toastError } from '$lib/utils/toast.util';
import { ERROR_DOWNLOADING_TAB_TOAST_MESSAGE } from '$lib/constants/error-downloading-tab-toast-message';

const tabExportService = new TabExportService();

export async function downloadGuitarPro(
  song: SongsterrPartialMetadata
): Promise<void> {
  try {
    if (!song.byLinkUrl) throw new Error('Missing byLinkUrl');
    const result = await tabExportService.exportGp7(song.byLinkUrl, song.title);
    await triggerFileDownload(result);
  } catch (error) {
    console.error('error', error);
    toastError(ERROR_DOWNLOADING_TAB_TOAST_MESSAGE);
  }
}

export async function downloadMidi(
  song: SongsterrPartialMetadata,
  options: Partial<MidiDownloadOptions> = {}
): Promise<void> {
  try {
    if (!song.byLinkUrl) throw new Error('Missing byLinkUrl');
    const result = await tabExportService.exportMidi(
      song.byLinkUrl,
      song.title,
      {
        separateTracks: options.separateTracks
      }
    );
    await triggerFileDownload(result);
  } catch (error) {
    console.error('error', error);
    toastError(ERROR_DOWNLOADING_TAB_TOAST_MESSAGE);
  }
}

export async function downloadAlphaTex(
  song: SongsterrPartialMetadata,
  options: { trackPartId?: number } = {}
): Promise<void> {
  try {
    if (!song.byLinkUrl) throw new Error('Missing byLinkUrl');
    const result = await tabExportService.exportAlphaTex(
      song.byLinkUrl,
      song.title,
      { trackPartId: options.trackPartId }
    );
    await triggerFileDownload(result);
  } catch (error) {
    console.error('error', error);
    toastError(ERROR_DOWNLOADING_TAB_TOAST_MESSAGE);
  }
}
