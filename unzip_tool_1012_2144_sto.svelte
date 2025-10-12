// 代码生成时间: 2025-10-12 21:44:45
  import { onMount, createEventDispatcher } from 'svelte';
  import JSZip from 'jszip';
  import { saveAs } from 'file-saver';

  // Event dispatcher for handling file selection and extraction events
  const dispatch = createEventDispatcher();

  // State to hold the selected file
  let file;

  // Function to handle file input change
  function handleFileChange(event) {
    const files = event.target.files;
    if (files.length > 0) {
      file = files[0];
      dispatch('fileSelected', { file });
    }
  }

  // Function to extract files from the zip archive
  async function extractFiles() {
    if (!file) return;

    try {
      // Read the file as an ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      // Create a JSZip instance and load the ArrayBuffer with the zip file
      const zip = new JSZip();
      await zip.loadAsync(arrayBuffer);

      // Extract each file from the zip archive
      for (let entry of Object.values(zip.files)) {
        const content = await entry.async('blob');
        saveAs(content, entry.name);
      }

      dispatch('filesExtracted');
    } catch (error) {
      console.error('Error extracting files:', error);
      dispatch('extractionFailed', { error });
    }
  }

  // On component mount, set up event listeners if needed
  onMount(() => {
    // Initialization logic (if any)
  });
</script>

<!-- Template for the component UI -->
<div class="unzip-tool">
  <!-- File input for selecting the zip file -->
  <input type="file" on:change={handleFileChange} />

  <!-- Button to trigger file extraction -->
  <button on:click={extractFiles}>Unzip File</button>
</div>

<!-- CSS for the component -->
<style>
  .unzip-tool {
    /* Add styles here */
  }
</style>
