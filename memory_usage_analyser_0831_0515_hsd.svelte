// 代码生成时间: 2025-08-31 05:15:01
  import { onMount } from 'svelte';

  // Function to get memory usage statistics
  function getMemoryUsage() {
    // Use Node.js process.memoryUsage() to get memory usage statistics
    const memoryUsage = process.memoryUsage();
    return memoryUsage;
  }

  // Function to format memory usage
  function formatMemoryUsage(memoryUsage) {
    return {
      rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
      heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
    };
  }

  // State to hold memory usage data
  let memoryUsageData = null;

  // Error state for handling errors
  let error = null;

  // Function to fetch memory usage on component mount
  async function fetchMemoryUsage() {
    try {
      const memoryUsage = await getMemoryUsage();
      memoryUsageData = formatMemoryUsage(memoryUsage);
    } catch (e) {
      error = e.message;
    }
  }

  // Mount the component and fetch memory usage
  onMount(fetchMemoryUsage);
</script>

{#if memoryUsageData}
  <div>
    <!-- Display memory usage data -->
    <h1>Memory Usage</h1>
    <ul>
      <li>Resident Set Size (RSS): {memoryUsageData.rss}</li>
      <li>Total Heap Size: {memoryUsageData.heapTotal}</li>
      <li>Used Heap Size: {memoryUsageData.heapUsed}</li>
    </ul>
  </div>
{:else if error}
  <div>
    <!-- Display error message if there's an error -->
    <h1>Error fetching memory usage</h1>
    <p>{error}</p>
  </div>
{:else}
  <div>
    <!-- Display loader while fetching data -->
    <p>Loading memory usage...</p>
  </div>
{/if}