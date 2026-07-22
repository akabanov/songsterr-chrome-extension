import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { crx } from '@crxjs/vite-plugin';

const manifest = JSON.parse(readFileSync('./manifest.json', 'utf-8'));

export default defineConfig({
  plugins: [
    tailwindcss(),
    svelte(),
    ...(process.env.VITEST ? [] : [crx({ manifest })])
  ],
  resolve: {
    alias: {
      $lib: fileURLToPath(new URL('./src/lib', import.meta.url))
    }
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
