// 代码生成时间: 2025-08-22 10:17:06
import { onMount, writable } from 'svelte/store';
import { browser } from 'svelte';
import { copy, remove } from 'fs/promises';
import { glob } from 'glob/promise';
import { join, relative } from 'path';
import { access } from 'fs/promises';

// File paths for source and destination directories
const sourceDir = writable(join(browser, 'src'));
const destDir = writable(join(browser, 'dest'));

// Function to check if a path exists
async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    return false;
  }
}

// Function to backup and sync files
async function backupAndSyncFiles() {
  if (!(await pathExists($sourceDir))) {
    console.error('Source directory does not exist');
    return;
  }

  if (!(await pathExists($destDir))) {
    console.error('Destination directory does not exist');
    return;
  }

  try {
    // Find all files in the source directory
    const files = await glob('**/*', { cwd: $sourceDir });

    // Iterate over each file and copy to destination directory
    for (const file of files) {
      const srcPath = join($sourceDir, file);
      const destPath = join($destDir, relative($sourceDir, srcPath));
      await copy(srcPath, destPath);
    }

    console.log('Backup and sync completed successfully');
  } catch (error) {
    console.error('Error during backup and sync:', error);
  }
}

// Function to remove files that no longer exist in the source directory
async function cleanUpDestFiles() {
  try {
    // Find all files in the destination directory
    const destFiles = await glob('**/*', { cwd: $destDir });

    // Find all files in the source directory
    const srcFiles = await glob('**/*', { cwd: $sourceDir });

    // Iterate over each file in the destination directory
    for (const file of destFiles) {
      if (!srcFiles.includes(file)) {
        const filePath = join($destDir, file);
        await remove(filePath);
      }
    }

    console.log('Clean up completed successfully');
  } catch (error) {
    console.error('Error during clean up:', error);
  }
}

// On mount, backup and sync files, and clean up destination files
onMount(async () => {
  await backupAndSyncFiles();
  await cleanUpDestFiles();
});

// Svelte component
<script>
  export let srcDir;
  export let destDir;
  $: destDir = srcDir;
</script>

<!-- Svelte component template -->
<main>
  <section>
    <h1>File Backup and Sync Tool</h1>
    <p>Source Directory: {$sourceDir}</p>
    <p>Destination Directory: {$destDir}</p>
  </section>
  <button on:click={() => backupAndSyncFiles()}>Backup and Sync</button>
  <button on:click={() => cleanUpDestFiles()}>Clean Up</button>
</main>