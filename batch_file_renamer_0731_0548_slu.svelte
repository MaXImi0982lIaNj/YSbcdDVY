// 代码生成时间: 2025-07-31 05:48:20
// batch_file_renamer.svelte
<script lang="module">
  import { onMount, writable } from 'svelte/store';
  import { browser } from '$app/environment';
  import fs from 'fs/promises';
  import path from 'path';

  // Stores the state of the application
  const { subscribe, set } = writable({
    files: [],
    newPrefix: '',
    error: null
  });

  // Function to read the directory and update the files store
  async function readFiles(dir) {
    try {
      const files = await fs.readdir(dir);
      set({ files, newPrefix: '', error: null });
    } catch (err) {
      set({ files: [], newPrefix: '', error: err.message });
    }
  }

  // Function to rename the files
  async function renameFiles() {
    const { files, newPrefix } = subscribe();
    if (!newPrefix) return;

    try {
      for (let file of files) {
        const oldPath = path.join(dir, file);
        const stats = await fs.stat(oldPath);
        if (stats.isFile()) {
          const ext = path.extname(file);
          const newName = `${newPrefix}-${file}${ext}`;
          const newPath = path.join(dir, newName);
          await fs.rename(oldPath, newPath);
        }
      }
      set({ files, newPrefix, error: null });
    } catch (err) {
      set({ files, newPrefix, error: err.message });
    }
  }

  // Mount function to read files on component mount
  onMount(async () => {
    const dir = browser ? '.' : process.cwd();
    await readFiles(dir);
  });
</script>

<!-- UI to interact with the application -->
<div class="renamer-container">
  <h1>Batch File Renamer</h1>
  <div class="error-message" if={error}>Error: {error}</div>
  <input type="text" placeholder="New Prefix" bind:value={newPrefix} />
  <button on:click={renameFiles} disabled={!newPrefix}>Rename</button>
  <ul>
    {#if $files.length > 0}
      {#each $files as file}
        <li>{file}</li>
      {/each}
    {/if}
    {#if $files.length === 0}
      <li>No files to rename</li>
    {/if}
  </ul>
</div>
