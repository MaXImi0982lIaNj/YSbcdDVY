// 代码生成时间: 2025-09-20 10:42:06
// bulk_file_rename_tool.svelte
// A Svelte component for bulk file renaming

<script lang="ts">
  import { onMount, writable } from 'svelte/store';

  interface FileRenameInfo {
    oldName: string;
    newName: string;
  }

  // Store to hold the list of files to rename
  const filesToRename = writable<FileRenameInfo[]>([]);

  // Store to hold the result messages
  const resultMessages = writable<string[]>([]);

  // Function to rename files in batch
  async function renameFiles() {
    try {
      const files = filesToRename.subscribe()[0];
      for (const file of files) {
        const fs = require('fs');
        const path = require('path');
        fs.renameSync(path.join(process.cwd(), file.oldName), path.join(process.cwd(), file.newName));
        resultMessages.update(messages => [...messages, `Renamed ${file.oldName} to ${file.newName}`]);
      }
    } catch (error) {
      resultMessages.update(messages => [...messages, `Error: ${error.message}`]);
    }
  }

  // Clear the result messages
  function clearResults() {
    resultMessages.set([]);
  }

  onMount(() => {
    // Initialize any needed logic on component mount
  });
</script>

<!-- User interface for adding files to rename -->
<div>
  <h1>Bulk File Rename Tool</h1>
  <input type="file" multiple on:change={e => {
    const files = Array.from(e.target.files).map(file => ({ oldName: file.name, newName: '' }));
    filesToRename.update(list => [...list, ...files]);
  }} />
  <button on:click={renameFiles}>Rename Files</button>
  <button on:click={clearResults}>Clear Results</button>
  <ul>
    {#each filesToRename as file (file.oldName)}
      <li>
        <input type="text" bind:value={file.newName} placeholder="New Name" />
        <span>{file.oldName} -> {file.newName}</span>
      </li>
    {/each}
  </ul>
  <div>
    {#each resultMessages as message (message)}
      <p>{message}</p>
    {/each}
  </div>
</div>
