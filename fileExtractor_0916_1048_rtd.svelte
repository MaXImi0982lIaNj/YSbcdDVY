// 代码生成时间: 2025-09-16 10:48:52
 * Features:
 * - File upload via drag and drop or file selector.
 * - Extraction of .zip and .tar.gz files.
 * - Error handling for unsupported file types or extraction issues.
 */

import { onMount, createEventDispatcher } from 'svelte';
import AdmZip from 'adm-zip';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Define the maximum file size to accept
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

// Create an event dispatcher for notifying the parent component
const dispatch = createEventDispatcher();

export default function FileExtractor() {
  let files = [];
  let extractionPromise;

  // Mount the component and initialize the file input element
  onMount(() => {
    // Initialization logic can be added here if needed
  });

  // Function to handle file selection
  function handleFileSelect(event) {
    const files = event.target.files;

    if (files.length === 0) {
      dispatch('error', 'No files selected.');
      return;
    }

    // Clear previous extraction results
    files = [];

    for (let file of files) {
      if (file.size > MAX_FILE_SIZE) {
        dispatch('error', `File size exceeds the limit of ${MAX_FILE_SIZE / 1024 / 1024}MB`);
        return;
      }

      // Check file type and extract contents
      extractFile(file)
        .then(extractedFiles => {
          files = files.concat(extractedFiles);
        })
        .catch(error => {
          dispatch('error', error.message);
        });
    }
  }

  // Function to extract the file content
  async function extractFile(file) {
    try {
      switch (true) {
        case file.name.endsWith('.zip'):
          return extractZip(file);
        case file.name.endsWith('.tar.gz'):
          return extractTarGz(file);
        default:
          throw new Error('Unsupported file type');
      }
    } catch (error) {
      throw error;
    }
  }

  // Extract .zip files
  function extractZip(file) {
    return new Promise((resolve, reject) => {
      const zip = new AdmZip(file);
      zip.extractAllToAsync(file.name.replace('.zip', ''), true, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(getExtractedFiles(file.name.replace('.zip', '') + '/'));
        }
      });
    });
  }

  // Extract .tar.gz files
  function extractTarGz(file) {
    return new Promise((resolve, reject) => {
      const zip = new AdmZip(file);
      zip.extractAllToAsync(file.name.replace('.tar.gz', ''), true, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(getExtractedFiles(file.name.replace('.tar.gz', '') + '/'));
        }
      });
    });
  }

  // Get the list of extracted files
  function getExtractedFiles(directory) {
    // This function should be implemented to list the extracted files
    // and prepare them for download if needed.
    // For demonstration purposes, we'll return an empty array.
    return [];
  }

  // Function to handle drag over event
  function handleDragOver(event) {
    event.preventDefault(); // Necessary to allow dropping
  }

  // Function to handle drop event
  function handleDrop(event) {
    event.preventDefault(); // Prevent the default action
    handleFileSelect(event.dataTransfer.files);
  }

  // Returns the Svelte markup and logic for the component
  return {
    handleFileSelect,
    handleDragOver,
    handleDrop,
    files
  };
}

<script>
  export let onFileExtracted; // Event handler for when a file is extracted
</script>

<style>
  .dropzone {
    border: 2px dashed #ccc;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    margin: 20px;
  }
  .dropzone.over {
    border-color: #000;
  }
</style>

<!-- Svelte Markup for the component -->

<div class="dropzone" on:dragover={handleDragOver} on:drop={handleDrop} on:click={() => fileInput.click()}>
  <input type="file" multiple ref:fileInput on:change={handleFileSelect} style="display: none;"/>
  <div>Drop files here or click to upload</div>
  <div>Supported formats: .zip, .tar.gz</div>
  {#if files.length > 0}
    <ul>
      {#each files as file}
        <li>{file.name}</li>
        <!-- Add logic to handle file download here -->
      {/each}
    </ul>
  {/if}
</div>
