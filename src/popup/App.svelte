<script lang="ts">
  import '../app.css';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import Form from '$lib/components/Form.svelte';
</script>

<main class="w-80 p-4">
  <SvelteToast />
  <Form />
</main>
