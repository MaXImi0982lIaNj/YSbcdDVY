// 代码生成时间: 2025-09-09 17:38:48
// bulk_file_renamer.svelte - A Svelte component for batch file renaming

<script lang="ts">
  import { onMount, writable } from 'svelte/store';
  import { browser } from '$app/env';
  import { get, post } from 'svelte-reqest';
  import { error } from '@sveltejs/kit';

  const files = writable([]);
  const renamePattern = writable('');
  const result = writable([]);
  const errorMessage = writable('');
  const loading = writable(false);

  async function loadFiles(directory) {
    loading.set(true);
    try {
      const response = await get(`/api/files?directory=${directory}`);
      files.set(response.data);
    } catch (error) {
      errorMessage.set(error.message);
    } finally {
      loading.set(false);
    }
  }

  async function renameFiles(directory) {
    loading.set(true);
    errorMessage.set('');
    result.set([]);
    try {
      const response = await post('/api/rename', { files: files(), pattern: renamePattern() }, { directory });
      result.set(response.data);
    } catch (error) {
      errorMessage.set(error.message);
    } finally {
      loading.set(false);
    }
  }

  onMount(() => {
    loadFiles('default');
  });
</script>

<!-- UI for the Bulk File Renamer -->
<div class="bulk-file-renamer">
  <input type="text" placeholder="Enter a directory path" on:input="loadFiles(event.target.value)" disabled={loading} />
  <input type="text" placeholder="Enter rename pattern" bind:value={renamePattern} disabled={loading} />
  <button on:click={renameFiles} disabled={loading}>Rename Files</button>
  {#if loading}
    <p>Loading...</p>
  {:else if errorMessage}
    <p class="error">Error: {errorMessage}</p>
  {:else if result.size > 0}
    <ul>
      {#each result as file}
        <li>{file}</li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .error {
    color: red;
  }
  .bulk-file-renamer input, .bulk-file-renamer button {
    margin: 5px;
  }
</style>
