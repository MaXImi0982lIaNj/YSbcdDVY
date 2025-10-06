// 代码生成时间: 2025-10-07 00:00:15
  // Svelte component for JSON data converter
  import { onMount } from 'svelte';

  // State to store the JSON data
  let jsonData;
  let result;
  let errorMessage = '';

  // Function to convert JSON data
  function convertJsonData() {
    try {
      // Try to parse the JSON string
      const parsedData = JSON.parse(jsonData);
      // Convert the parsed JSON object back to a string
      result = JSON.stringify(parsedData, null, 2);
      errorMessage = '';
    } catch (error) {
      // Handle parsing error
      errorMessage = 'Invalid JSON data';
      result = '';
    }
  }

  // On component mount, convert the JSON data
  onMount(() => {
    convertJsonData();
  });
</script>

<!-- Input field for JSON data -->
<input type="text" bind:value={jsonData} placeholder="Enter JSON data" />

<!-- Button to trigger conversion -->
<button on:click={convertJsonData}>Convert</button>

<!-- Display the result or error message -->
<div>
  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {:else if result}
    <pre>{result}</pre>
  {/if}
</div>