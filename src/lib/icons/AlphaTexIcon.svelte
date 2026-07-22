<script lang="ts">
  let { class: className = '' }: { class?: string } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1em"
  height="1em"
  viewBox="0 0 24 24"
  class={className}
>
  <path d="M0 0h24v24H0z" fill="none" />
  <path
    fill="currentColor"
    d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zm5 18H6V4h6v5h6zM8 13h8v1.5H8zm0 3h8v1.5H8zm0-6h3v1.5H8z"
  />
</svg>
