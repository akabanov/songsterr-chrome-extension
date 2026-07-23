<script lang="ts">
  import type { MidiDownloadOptions as MidiDownloadOptionsValue } from '$lib/types';
  import { onMount } from 'svelte';

  const STORAGE_KEY = 'songsterr-downloader:midi-download-options';

  interface Props {
    options: MidiDownloadOptionsValue;
    disabled?: boolean;
  }

  let { options = $bindable(), disabled = false }: Props = $props();

  let isStorageReady = $state(false);

  onMount(() => {
    try {
      const storedOptions = localStorage.getItem(STORAGE_KEY);

      if (storedOptions) {
        const parsedOptions: unknown = JSON.parse(storedOptions);

        if (typeof parsedOptions === 'object' && parsedOptions !== null) {
          const { separateTracks } =
            parsedOptions as Partial<MidiDownloadOptionsValue>;
          options = { ...options, separateTracks: separateTracks === true };
        }
      }
    } catch {
      // Retain defaults when browser storage is unavailable or malformed.
    }

    isStorageReady = true;
  });

  $effect(() => {
    if (isStorageReady) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(options));
      } catch {
        // Continue without persistence when browser storage is unavailable.
      }
    }
  });
</script>

<label
  class="flex items-center gap-2 text-sm text-slate-600 {disabled
    ? 'cursor-not-allowed opacity-50'
    : 'cursor-pointer'}"
>
  <input
    type="checkbox"
    bind:checked={options.separateTracks}
    {disabled}
    class="checkbox checkbox-xs"
  />
  Export separate named MIDI tracks
</label>
