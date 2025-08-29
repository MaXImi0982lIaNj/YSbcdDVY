// 代码生成时间: 2025-08-30 00:38:50
  import { onMount, writable } from 'svelte/store';
  import JSZip from 'jszip';
  import { saveAs } from 'file-saver';

  // State to hold the file input element
  const fileInput = writable(null);

  // State to hold the files extracted from the zip
  const extractedFiles = writable([]);

  // State to hold any error messages
  const errorMessage = writable('');

  // Function to handle file input change event
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      fileInput.set(file);
      extractZip(file);
    }
  }

  // Function to extract zip file
  async function extractZip(file) {
    try {
      const zip = new JSZip();
      const zipContent = await zip.loadAsync(file);
      const extracted = await zip.generateAsync({ type: 'blob' });
      saveAs(extracted, 'extracted.zip');
      extractedFiles.set([...zipContent.files]);
    } catch (error) {
      errorMessage.set(error.message);
    }
  }

  onMount(() => {
    // Initialize the file input element
    fileInput.set(document.getElementById('file-input'));
  });
</script>

<!-- UI Component for the Unzip Tool -->
<div>
  <h1>Unzip Tool</h1>
  <input type="file" id="file-input" on:change={handleFileChange} />
  {#if $errorMessage}
    <p>Error: {$errorMessage}</p>
  {/if}
  {#each $extractedFiles as file}
    <p>Extracted File: {file.name}</p>
  {/each}
</div>