// 代码生成时间: 2025-09-04 17:15:13
import { onMount, writable } from 'svelte/store';
import { getFolderContents } from './utils';

export default function FolderOrganizer({ path }) {
  const { subscribe, set } = writable(null);
  let folderContents = null;
  let error = null;

  onMount(async () => {
    try {
      folderContents = await getFolderContents(path);
      set(folderContents);
    } catch (err) {
      error = err.message;
      console.error('Error fetching folder contents:', error);
    }
  });

  return {
    folderContents,
    error,
    set
  };
}

/*
 * Utility function to get folder contents
 * @param {string} path - The path to the folder
 * @returns {Promise<Array>} - An array of file and directory names
 */
export async function getFolderContents(path) {
  try {
    const dirContents = await Deno.readDir(path);
    return dirContents.map((entry) => entry.name);
  } catch (err) {
    throw new Error(`Failed to read directory: ${err.message}`);
  }
}

/*
 * Svelte markup for FolderOrganizer component
 * Displays the folder contents and handles errors
 */
<script>
  import FolderOrganizer from './FolderOrganizer.svelte';
</script>

<main>
  <h1>Folder Organizer</h1>
  {#if $error}
    <p>Error: {$error}</p>
  {:else}
    {#if $folderContents}
      <ul>
        {#each $folderContents as content}
          <li>{content}</li>
        {/each}
      </ul>
    {/else}
    <p>No content found.</p>
  {/if}
</main>