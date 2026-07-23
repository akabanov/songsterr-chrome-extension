<script lang="ts">
  import { TabExportService } from '$lib/services/tab-export.service';
  import type { SongsterrPartialMetadata } from '$lib/types';

  interface Props {
    selectedSong: SongsterrPartialMetadata;
    selectedTrackPartId: number | null;
    disabled?: boolean;
  }

  let {
    selectedSong,
    selectedTrackPartId = $bindable(),
    disabled = false
  }: Props = $props();

  const tabExportService = new TabExportService();

  let tracks = $state<{ partId: number; name: string }[]>([]);
  let isLoading = $state(false);
  let loadError = $state(false);
  let loadedForUrl: string | undefined;

  $effect(() => {
    const byLinkUrl = selectedSong.byLinkUrl;
    if (!byLinkUrl || byLinkUrl === loadedForUrl) return;

    loadedForUrl = byLinkUrl;
    tracks = [];
    loadError = false;
    isLoading = true;

    tabExportService
      .getTrackList(byLinkUrl)
      .then((trackList) => {
        tracks = trackList.map((track, index) => ({
          partId: track.partId,
          name: track.title || track.name || `Track ${index + 1}`
        }));
      })
      .catch(() => {
        loadError = true;
      })
      .finally(() => {
        isLoading = false;
      });
  });

  function handleChange(event: Event & { currentTarget: HTMLSelectElement }) {
    const value = event.currentTarget.value;
    selectedTrackPartId = value === '' ? null : Number(value);
  }
</script>

<div class="w-full">
  <select
    class="select select-sm select-bordered w-full text-slate-600"
    disabled={disabled || isLoading}
    value={selectedTrackPartId ?? ''}
    onchange={handleChange}
  >
    <option value="" class={tracks.length > 1 ? 'font-bold text-slate-700' : ''}>
      All tracks
    </option>
    {#each tracks as track (track.partId)}
      <option
        value={track.partId}
        class={tracks.length > 1 ? 'text-slate-400' : ''}
      >
        {track.name}
      </option>
    {/each}
  </select>
  {#if isLoading}
    <p class="mt-1 text-xs text-slate-400">Loading tracks…</p>
  {:else if loadError}
    <p class="mt-1 text-xs text-red-500">Couldn't load track list</p>
  {/if}
</div>
