<script lang="ts">
  import GuitarIcon from '$lib/icons/GuitarIcon.svelte';
  import MidiIcon from '$lib/icons/MidiIcon.svelte';
  import AlphaTexIcon from '$lib/icons/AlphaTexIcon.svelte';
  import type { DownloadFormat } from '$lib/types';
  import { onMount } from 'svelte';
  import type { Component } from 'svelte';

  const STORAGE_KEY = 'songsterr-downloader:selected-format';

  const FORMATS: {
    value: DownloadFormat;
    label: string;
    icon: Component<{ class?: string }>;
  }[] = [
    { value: 'guitarpro', label: 'Guitar Pro', icon: GuitarIcon },
    { value: 'midi', label: 'MIDI', icon: MidiIcon },
    { value: 'alphatex', label: 'AlphaTex', icon: AlphaTexIcon }
  ];

  interface Props {
    format: DownloadFormat;
    disabled?: boolean;
  }

  let { format = $bindable(), disabled = false }: Props = $props();

  let isStorageReady = $state(false);

  onMount(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'guitarpro' || stored === 'midi' || stored === 'alphatex') {
        format = stored;
      }
    } catch {
      // Retain default when browser storage is unavailable.
    }

    isStorageReady = true;
  });

  $effect(() => {
    if (isStorageReady) {
      try {
        localStorage.setItem(STORAGE_KEY, format);
      } catch {
        // Continue without persistence when browser storage is unavailable.
      }
    }
  });
</script>

<div class="flex gap-2 w-full" role="radiogroup" aria-label="Download format">
  {#each FORMATS as f (f.value)}
    {@const Icon = f.icon}
    <label
      class="flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded border text-xs font-medium transition-colors
        {disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        {format === f.value
          ? 'border-blue-500 bg-blue-50 text-blue-600'
          : 'border-slate-300 text-slate-500 hover:bg-slate-50'}"
    >
      <input
        type="radio"
        name="download-format"
        value={f.value}
        checked={format === f.value}
        {disabled}
        class="sr-only"
        onchange={() => (format = f.value)}
      />
      <Icon class="text-lg" />
      {f.label}
    </label>
  {/each}
</div>
