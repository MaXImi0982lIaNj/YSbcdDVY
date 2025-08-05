// 代码生成时间: 2025-08-05 11:16:39
  import { onMount, setContext } from 'svelte';
  import fs from 'fs';  // File system module for Node.js
  import path from 'path';  // Path module for handling file paths

  // Context for error handling
  export let error;
  setContext("error", error);

  // State variables
  let currentPath = '';
  let directoryContents = [];

  // Load the contents of the current directory
  async function loadDirectoryContents(path) {
    try {
      const files = fs.readdirSync(path, { withFileTypes: true });
      directoryContents = files.map(file => (
        {
          name: file.name,
          isDirectory: file.isDirectory(),
          path: file.path
        }
      ));
    } catch (err) {
      throw new Error(`Failed to load directory contents: ${err.message}`);
    }
  }

  // Create a new directory
  function createDirectory(newDirectoryName) {
    try {
      const newDirectoryPath = path.join(currentPath, newDirectoryName);
      fs.mkdirSync(newDirectoryPath, { recursive: true });
      loadDirectoryContents(currentPath);
    } catch (err) {
      throw new Error(`Failed to create directory: ${err.message}`);
    }
  }

  // Delete a directory or file
  function deleteItem(itemPath) {
    try {
      fs.rmSync(itemPath, { recursive: true, force: true });
      loadDirectoryContents(currentPath);
    } catch (err) {
      throw new Error(`Failed to delete item: ${err.message}`);
    }
  }

  onMount(() => {
    loadDirectoryContents(process.cwd()); // Load the contents of the current working directory
  });

  // Context to pass the current path to child components
  export let currentPathContext;
  setContext("currentPathContext", currentPath);
</script>

<!-- Folder Structure Manager UI -->
<div class="folder-structure-manager">
  <input type="text" bind:value={currentPath} placeholder="Enter a path..."/>
  <button on:click={() => loadDirectoryContents(currentPath)}>Load Directory</button>

  <div class="directory-contents">
    {#each directoryContents as item}
      <div class="directory-item">
        <span>{item.isDirectory ? "[DIR]" : "[FILE]"} {item.name}</span>
        {#if item.isDirectory}
          <button on:click={() => loadDirectoryContents(item.path)}>Enter</button>
        {/if}
        <button on:click={() => createDirectory(item.name)}>Create</button>
        <button on:click={() => deleteItem(item.path)}>Delete</button>
      </div>
    {/each}
  </div>
</div>

<style>
  .directory-contents {
    margin-top: 20px;
  }
  .directory-item {
    margin-bottom: 10px;
  }
</style>