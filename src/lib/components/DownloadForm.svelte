<script lang="ts">
  import {
    downloadGuitarPro,
    downloadMidi as downloadMidiFile,
    downloadAlphaTex
  } from '$lib/utils/download-tab';
  import SelectedSong from './SongPreview.svelte';
  import { formState } from '$lib/runes/form-state.svelte';
  import type {
    DownloadFormat,
    SongsterrPartialMetadata,
    MidiDownloadOptions as MidiDownloadOptionsValue
  } from '$lib/types';
  import FormatSelector from './FormatSelector.svelte';
  import MidiDownloadOptions from './MidiDownloadOptions.svelte';
  import AlphaTexTrackSelector from './AlphaTexTrackSelector.svelte';

  interface Props {
    selectedSong: SongsterrPartialMetadata;
  }

  let { selectedSong }: Props = $props();

  let format = $state<DownloadFormat>('guitarpro');
  let downloading = $state(false);
  let midiDownloadOptions = $state<MidiDownloadOptionsValue>({
    separateTracks: false
  });
  let selectedTrackPartId = $state<number | null>(null);

  $effect(() => {
    selectedSong;
    selectedTrackPartId = null;
  });

  async function download(): Promise<void> {
    if (downloading) return;
    downloading = true;
    try {
      if (format === 'guitarpro') {
        await downloadGuitarPro(selectedSong);
      } else if (format === 'midi') {
        await downloadMidiFile(selectedSong, {
          separateTracks: midiDownloadOptions.separateTracks
        });
      } else {
        await downloadAlphaTex(selectedSong, {
          trackPartId: selectedTrackPartId ?? undefined
        });
      }
    } finally {
      downloading = false;
    }
  }

  function deselectSong(): void {
    formState.selectedSong = undefined;
  }
</script>

<div class="flex flex-col items-center w-full">
  <div class="mb-4 w-full">
    <SelectedSong {selectedSong} />
  </div>

  <div class="mb-4 w-full">
    <FormatSelector bind:format disabled={downloading} />
  </div>

  <div class="mb-4 flex w-full min-h-8 items-center justify-center">
    {#if format === 'midi'}
      <MidiDownloadOptions
        bind:options={midiDownloadOptions}
        disabled={downloading}
      />
    {:else if format === 'alphatex'}
      <AlphaTexTrackSelector
        {selectedSong}
        bind:selectedTrackPartId
        disabled={downloading}
      />
    {/if}
  </div>

  <button
    class="relative flex items-center px-4 py-1.5 text-sm font-semibold text-white bg-blue-500 border border-blue-600 rounded shadow hover:bg-blue-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
    disabled={downloading}
    onclick={download}
  >
    Download
    {#if downloading}
      <span class="progress-bar"></span>
    {/if}
  </button>

  <div class="my-2"></div>

  {#if !formState.isOnSongsterrPage}
    <button
      class="cursor-pointer text-slate-400 font-light underline hover:text-slate-500 bg-transparent mb-1"
      onclick={deselectSong}>Select another</button
    >
  {/if}
</div>

<style>
  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: rgba(255, 255, 255, 0.7);
    animation: progress-loop 1.2s ease-in-out infinite;
  }

  @keyframes progress-loop {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
</style>
