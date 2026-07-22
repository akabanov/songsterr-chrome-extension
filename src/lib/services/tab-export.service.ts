import { logger } from '$lib/logger';
import { SongsterrService } from './songsterr.service';
import { SongsterrRevisionJsonService } from './songsterr-revision-json.service';
import { SongsterrToAlphaTabConverter } from './converter/songsterr-to-alphatab.converter';

export interface TabExportResult {
  data: Uint8Array;
  fileName: string;
  contentType: string;
}

export class TabExportService {
  async exportGp7(
    byLinkUrl: string,
    songTitle?: string
  ): Promise<TabExportResult> {
    const { meta, revisions, warnings } = await this.fetchRevisions(byLinkUrl);
    const { data, warnings: convertWarnings } = this.converter.toGp7({
      meta,
      revisions
    });
    this.logWarnings(meta, [...warnings, ...convertWarnings], 'gp');

    return {
      data,
      fileName: this.buildFileName(
        songTitle || meta.title,
        `${meta.songId}.gp`
      ),
      contentType: 'application/gp'
    };
  }

  async exportMidi(
    byLinkUrl: string,
    songTitle?: string,
    options: { separateTracks?: boolean } = {}
  ): Promise<TabExportResult> {
    const { meta, revisions, warnings } = await this.fetchRevisions(byLinkUrl);
    const { data, warnings: convertWarnings } = this.converter.toMidi(
      { meta, revisions },
      { separateTracks: options.separateTracks === true }
    );
    this.logWarnings(meta, [...warnings, ...convertWarnings], 'midi');

    return {
      data,
      fileName: this.buildFileName(
        songTitle || meta.title,
        `${meta.songId}.mid`
      ),
      contentType: 'audio/midi'
    };
  }

  async exportAlphaTex(
    byLinkUrl: string,
    songTitle?: string
  ): Promise<TabExportResult> {
    const { meta, revisions, warnings } = await this.fetchRevisions(byLinkUrl);
    const { data, warnings: convertWarnings } = this.converter.toAlphaTex({
      meta,
      revisions
    });
    this.logWarnings(meta, [...warnings, ...convertWarnings], 'alphatex');

    return {
      data,
      fileName: this.buildFileName(
        songTitle || meta.title,
        `${meta.songId}.tex`
      ),
      contentType: 'text/plain'
    };
  }

  private async fetchRevisions(byLinkUrl: string) {
    const meta =
      await this.songsterrRevisionJsonService.getStateMetaFromTabUrl(byLinkUrl);

    const { revisions, warnings } =
      await this.songsterrRevisionJsonService.fetchAllPartRevisionsWithFallback(
        meta
      );

    if (revisions.length === 0) {
      throw new Error(
        `Unable to fetch any revision payloads for songId ${meta.songId}`
      );
    }

    return { meta, revisions, warnings };
  }

  private logWarnings(
    meta: { songId: number; revisionId: number },
    warnings: { code: string; message: string; location?: string }[],
    downloadType: string
  ): void {
    if (warnings.length === 0) return;
    logger.warn(
      {
        downloadType,
        songId: meta.songId,
        revisionId: meta.revisionId,
        warningCount: warnings.length,
        warnings: warnings.slice(0, 20)
      },
      'Songsterr conversion warnings'
    );
  }

  private buildFileName(songTitle: string, downloadUrl: string): string {
    return this.songsterrService.buildFileNameFromSongName(
      songTitle,
      downloadUrl
    );
  }

  private readonly songsterrService = new SongsterrService();
  private readonly songsterrRevisionJsonService =
    new SongsterrRevisionJsonService();
  private readonly converter = new SongsterrToAlphaTabConverter();
}
